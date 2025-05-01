using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

[ApiController]
[Route("/user")]
public class AuthController : Controller
{
    public readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("/create")]
    public async Task<IActionResult> UserPost([FromBody] UserCreateDto userDto)
    {
        try
        {
            await _authService.RegisterUser(userDto);
            return Ok("User created successfully");
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

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
