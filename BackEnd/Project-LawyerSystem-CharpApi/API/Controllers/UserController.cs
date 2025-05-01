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
        try
        {
            var result = await this._userService.GetUserById(id);
            return this.Ok(result);
        }catch(Exception ex)
        {
            return this.BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Retrieves all users.
    /// </summary>
    /// <returns>A list of users.</returns>
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            var result = await this._userService.GetAllUser();
            return this.Ok(result);
        }
        catch (Exception ex)
        {
            return this.BadRequest(ex.Message);
        }
    }
}
