using Microsoft.AspNetCore.Mvc;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

[ApiController]
[Route("/dbHealth")]
public class HealthController : Controller
{
    private readonly IConfiguration _configuration;

    public HealthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpGet]
    public async Task<IActionResult> Ping()
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            await using var conn = new Npgsql.NpgsqlConnection(connectionString);
            await conn.OpenAsync();
            await conn.CloseAsync();
        }
        catch(Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }

        return Ok("Database is working");
    }
}
