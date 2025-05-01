using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

/// <summary>
/// Controller responsible for handling user authentication-related actions.
/// </summary>
[ApiController]
[Route("/user")]
public class AuthController : Controller
{
    /// <summary>
    /// Service for handling authentication logic.
    /// </summary>
    private readonly AuthService _authService;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthController"/> class.
    /// </summary>
    /// <param name="authService">The authentication service to be used.</param>
    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    /// <summary>
    /// Register a new user.
    /// </summary>
    /// <param name="userDto">The user data transfer object containing user details.</param>
   
    /// <returns>An <see cref="IActionResult"/> indicating the result of the operation.</returns>
    [HttpPost("/create")]
    public async Task<IActionResult> UserPost([FromBody] UserCreateDto userDto)
    {
        try
        {
            await _authService.RegisterUser(userDto);
            return Ok("User created successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Logs in a user and generates a token.
    /// </summary>
    /// <param name="userLoginDto">The user login data transfer object containing login credentials.</param>
    /// <returns>An <see cref="IActionResult"/> containing the generated token or an error message.</returns>
    [HttpPost("/login")]
    public async Task<IActionResult> UserLogin([FromBody] UserLoginDto userLoginDto)
    {
        try
        {
            var token = await _authService.LoginUser(userLoginDto);
            return Ok(new { token });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
