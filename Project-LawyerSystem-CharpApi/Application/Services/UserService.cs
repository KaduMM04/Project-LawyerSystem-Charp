using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Services;

/// <summary>
/// Provides user-related services such as creating, retrieving, and verifying users.
/// </summary>
public class UserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserService"/> class.
    /// </summary>
    /// <param name="userRepository">the user repository to access the database.</param>
    /// <param name="mapper">the mapper for object transformations.</param>
    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
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
}
