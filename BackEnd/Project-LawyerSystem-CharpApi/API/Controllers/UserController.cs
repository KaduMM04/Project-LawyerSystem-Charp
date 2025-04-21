using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Application.Services;
using Project_LawyerSystem_CharpApi.Infrastructure.Repositories;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

/// <summary>    
/// Controller for managing users.    
/// </summary>    
[ApiController]
[Route("/user")]
public class UserController : Controller
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    public IActionResult GetUserById(Guid id)
    {
        var result = this._userService.GetUserById(id);
        return this.Ok(result);
    }

    /// <summary>  
    /// Retrieves all users.  
    /// </summary>  
    /// <returns>A list of users.</returns>  
    [HttpGet]
    public IActionResult GetAllUsers()
    {
        var result = this._userService.getAllUser();
        return this.Ok(result);
    }

    [HttpPost]
    public IActionResult createUser([FromBody] UserCreateDto userCreateDto)
    {
        var result = this._userService.createUser(userCreateDto);
        return this.Ok(result);
    }
}
