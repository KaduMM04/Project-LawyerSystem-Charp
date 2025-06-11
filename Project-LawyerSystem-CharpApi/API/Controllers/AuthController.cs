using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

/// <summary>
/// Controller responsible for handling user authentication-related actions.
/// </summary>
[ApiController]
[Route("api/User")]
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
    /// Creates a new lawyer user with full details.
    /// </summary>
    /// <param name="fullLawyerUserDto">The data transfer object containing user, address, and lawyer details.</param>
    /// <returns>An <see cref="IActionResult"/> indicating the result of the operation.</returns>
    [HttpPost("createFullLawyer")]
    public async Task<IActionResult> UserFullLawyerPost([FromBody] FullLawyerUserDto fullLawyerUserDto)
    {
        try
        {
            await _authService.RegisterFulLawyerlUser(
                fullLawyerUserDto.UserDto,
                fullLawyerUserDto.AddressDto,
                fullLawyerUserDto.LawyerCreateDto);

            return Ok("User created successfully");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    /// <summary>
    /// Creates a new client user with full details.
    /// </summary>
    /// <param name="fullClientUserDto">The data transfer object containing user, address, and client details.</param>
    /// <returns>An <see cref="IActionResult"/> indicating the result of the operation.</returns>
    [HttpPost("createFullClient")]
    public async Task<IActionResult> UserFullClientPost([FromBody] FullClientUserDto fullClientUserDto)
    {
        try
        {

            await _authService.RegisterFullClientUser(
                fullClientUserDto.UserDto,
                fullClientUserDto.AddressDto,
                fullClientUserDto.ClientDto);

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
    [HttpPost("login")]
    public async Task<IActionResult> UserLogin([FromBody] UserLoginDto userLoginDto)
    {
        try
        {
            var (token, user) = await _authService.LoginUser(userLoginDto);
            return Ok(new { token, user });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPatch("patch/lawyer")]
    public async Task<IActionResult> PatchUserLawyer([FromBody] FullUserLawyerUpdate userLawyerUpdate)
    {
        try
        {
            if (userLawyerUpdate == null)
            {
                return BadRequest("Dados do usuário inválidos.");
            }

            await _authService.UpdateUserLawyerAsync(userLawyerUpdate.UserUpdate,
                    userLawyerUpdate.Lawyer,
                    userLawyerUpdate.Address);

            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPatch("patch/client")]
    public async Task<IActionResult> PatchUserClient([FromBody] FullUserClientUpdate userClientUpdate)
    {
        try
        {
            if (userClientUpdate == null)
            {
                return BadRequest("Dados do usuário inválidos.");
            }
            await _authService.UpdateUserClientAsync(userClientUpdate.UserUpdate,
                    userClientUpdate.AddressDto,
                    userClientUpdate.ClientDto);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

}
