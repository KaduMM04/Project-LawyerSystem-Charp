using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Repositories;
namespace Project_LawyerSystem_CharpApi.Application.Services;

public class UserService
{

    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<bool> verifyUser(User user)
    {
        if (user == null)
        {
            throw new ArgumentNullException(nameof(user));
        }

        var userFromDb = await _userRepository.GetUserByIdAsync(user.Id);
        return userFromDb != null;
    }

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

    public async Task<IEnumerable<UserReadDto>> getAllUser()
    {
        var users = await this._userRepository.GetAllUsersAsync();
        var result = _mapper.Map<IEnumerable<UserReadDto>>(users);
        return result;
    }

    public async Task<UserReadDto> createUser(UserCreateDto userCreateDto)
    {
        if (userCreateDto == null)
        {
            throw new ArgumentNullException(nameof(userCreateDto));
        }

        var user = _mapper.Map<User>(userCreateDto);
        if (await verifyUser(user))
        {
            throw new Exception("User already exists");
        }

        user.CreatedAt = DateTime.UtcNow;
        user.UpdatedAt = DateTime.UtcNow;

        var userReadDto = _mapper.Map<UserReadDto>(userCreateDto);

        await this._userRepository.AddUserAsync(user);
        await this._userRepository.SaveChangesAsync();
        return userReadDto;
    }
}