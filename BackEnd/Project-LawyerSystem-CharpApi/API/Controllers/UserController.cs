using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Application.Services;


namespace Project_LawyerSystem_CharpApi.API.Controllers;

/// <summary>
/// Controller for managing users.
/// </summary>
[ApiController]
[Route("/user")]
public class UserController : Controller
{
    private readonly UserService _userService;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserController"/> class.
    /// </summary>
    /// <param name="userService">The user service to handle user-related operations.</param>
    public UserController(UserService userService)
    {
        _userService = userService;
    }

    /// <summary>
    /// Retrieves a user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <returns>The user details if found.</returns>
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(Guid id)
    {
        var result = await this._userService.GetUserById(id);
        return this.Ok(result);
    }

    /// <summary>
    /// Retrieves all users.
    /// </summary>
    /// <returns>A list of users.</returns>
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var result = await this._userService.getAllUser();
        return this.Ok(result);
    }

    /// <summary>
    /// Creates a new user.
    /// </summary>
    /// <param name="userCreateDto">The data transfer object containing user creation details.</param>
    /// <returns>The created user details.</returns>
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] UserCreateDto userCreateDto)
    {
        var result = await this._userService.createUser(userCreateDto);
        return this.Ok(result);
    }
}
