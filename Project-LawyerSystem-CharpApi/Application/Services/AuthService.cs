using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Configurations;
using System.IdentityModel.Tokens.Jwt;
using System.Security;
using System.Security.Claims;

namespace Project_LawyerSystem_CharpApi.Application.Services;

/// <summary>
/// Provides authentication-related services, including user registration, login, and token generation.
/// </summary>
public class AuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthService"/> class.
    /// </summary>
    /// <param name="userRepository">The user repository for accessing user data.</param>
    /// <param name="mapper">The mapper for object-to-object mapping.</param>
    public AuthService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    /// <summary>
    /// Generates a JWT token for the specified user.
    /// </summary>
    /// <param name="user">The user for whom the token is generated.</param>
    /// <returns>A JWT token as a string.</returns>
    public string GenerateToken(User user)
    {
        var claims = new[]
        {
          new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
          new Claim(ClaimTypes.Email, user.Email.ToString()),
          new Claim(ClaimTypes.Role, user.Role.ToString()),
        };
        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("MyS3cur3K3yThatIsAtLeast32Chars!"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: "http://localhost:5000",
            audience: "http://localhost:5000",
            claims: claims,
            expires: DateTime.UtcNow.AddHours(2),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    private async Task VerifyUser(User user)
    {
        if (user == null)
        {
            throw new NullReferenceException(nameof(user));
        }

        if (await _userRepository.GetUserByEmailAsync(user.Email) != null)
        {
            throw new Exception("This email is already used");
        }
    }

    public async Task<UserReadDto> RegisterFullUser(
                                    UserCreateDto userDto,
                                    AddressDto addressDto,
                                    LawyerCreateDto lawyerDto)
    {
        using var transaction = await _userRepository.BeginTransactionAsync();

        try
        {

            var address = _mapper.Map<Address>(addressDto);
            await _userRepository.AddAddressAsync(address);

            var lawyer = _mapper.Map<Lawyer>(lawyerDto);

            if (await _userRepository.GetLawyerByOabAsync(lawyer.OAB) != null)
            {
                throw new Exception("This OAB is already used");
            }

            await _userRepository.AddLawyerAsync(lawyer);

            var user = _mapper.Map<User>(userDto);

            await VerifyUser(user);

            user.AddressId = address.Id;
            user.LawyerOAB = lawyer.OAB;

            var salt = CryptoHelper.GenerateSalt();

            var hash = CryptoHelper.HashPassword(user.Password, salt);

            user.Salt = salt;
            user.Password = hash;
            user.CreatedAt = DateTime.UtcNow;
            user.UpdatedAt = DateTime.UtcNow;

            if (await _userRepository.AddUserAsync(user) == 0)
            {
                throw new Exception("There were no changes in the database");
            }
            await transaction.CommitAsync();

            return _mapper.Map<UserReadDto>(user);

        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            throw new Exception("Error while registering user", ex);
        }
    }

    /// <summary>
    /// Authenticates a user by validating their credentials and generates a JWT token.
    /// </summary>
    /// <param name="userLoginDto">The login details of the user, including email and password.</param>
    /// <returns>A JWT token if authentication is successful.</returns>
    /// <exception cref="ArgumentException">Thrown when the email is null or empty.</exception>
    /// <exception cref="Exception">Thrown when the email or password is incorrect.</exception>
    public async Task<string> LoginUser(UserLoginDto userLoginDto)
    {
        if (string.IsNullOrEmpty(userLoginDto.Email))
        {
            throw new ArgumentException(
                "Email cannot be null or empty",
                nameof(userLoginDto.Email));
        }

        Console.WriteLine("login: " + userLoginDto.Email);
        Console.WriteLine("Senha: " + userLoginDto.Password);

        var user = await _userRepository.GetUserByEmailAsync(userLoginDto.Email);

        if(user == null)
        {
            throw new Exception("Email Not exist");
        }

        if (user.Email != userLoginDto.Email)
        {
            throw new Exception("Email or Password is incorrect");
        }

        var result = CryptoHelper.VerifyPassword(
                                userLoginDto.Password,
                                user.Password,
                                user.Salt);

        if (!result)
        {
            throw new Exception("Email or Password is incorrect! Try Again");
        }

        return GenerateToken(user);
    }
}
