using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
namespace Project_LawyerSystem_CharpApi.Application.Services;

/// <summary>
/// Provides user-related services such as creating, retrieving, and verifying users.
/// </summary>


public class UserService(IUserRepository userRepository, IMapper mapper)
{
    private readonly IUserRepository _userRepository = userRepository;
    private readonly IMapper _mapper = mapper;

    public async Task<bool> UserExistsById(string Email)
    {
        var userFromDb = await _userRepository.GetUserByEmailAsync(Email);
        return userFromDb == null;
    }

    public async Task<bool> LawyerNotExists(string LawyerOAB)
    {
        var lawyer = await _userRepository.GetLawyerByOabAsync(LawyerOAB);
        return lawyer == null;
    }

    /// <summary>
    /// Retrieves a user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <returns>The user details as a <see cref="UserReadDto"/>.</returns>
    /// <exception cref="Exception">Thrown when the user is not found.</exception>
    public async Task<UserReadDto> GetUserById(Guid id)
    {
        var user = await _userRepository.GetUserByIdAsync(id);
        var result = _mapper.Map<UserReadDto>(user);

        if (result == null)
        {
            throw new Exception("User not found");
        }

        return result;
    }

    /// <summary>
    /// Retrieves all users from the database.
    /// </summary>
    /// <returns>A collection of users as <see cref="IEnumerable{UserReadDto}"/>.</returns>
    public async Task<IEnumerable<UserReadDto>> GetAllUser()
    {
        var users = await this._userRepository.GetAllUsersAsync();
        var result = _mapper.Map<IEnumerable<UserReadDto>>(users);
        return result;
    }

    /// <summary>
    /// Creates a new user in the database.
    /// </summary>
    /// <param name="userCreateDto">The user creation details.</param>
    /// <returns>The created user details as a <see cref="UserReadDto"/>.</returns>
    /// <exception cref="ArgumentNullException">Thrown when the user creation details are null.</exception>
    /// <exception cref="Exception">Thrown when the user already exists.</exception>
    public async Task<UserReadDto> CreateUser(UserCreateDto userCreateDto)
    {
        if (userCreateDto == null)
        {
            throw new ArgumentNullException(nameof(userCreateDto));
        }

        var user = _mapper.Map<User>(userCreateDto);
        if (await UserExistsById(user.Email))
        {
            throw new Exception("User already exists");
        }

        if (await LawyerNotExists(user.LawyerOAB))
        {
            throw new Exception("Lawyer not exists");
        }

        user.CreatedAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;
        try
        {
            int result = await _userRepository.AddUserAsync(user);

            if(result == 0)
            {
                throw new Exception("There is no Changes on the db");
            }

        }catch(Exception e)
        {
            throw new Exception("Error creating user", e);
        }

        var userReadDto = _mapper.Map<UserReadDto>(userCreateDto);

        return userReadDto;
    }
}
