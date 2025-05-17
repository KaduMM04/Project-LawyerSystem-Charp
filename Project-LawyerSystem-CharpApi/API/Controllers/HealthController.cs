using Microsoft.AspNetCore.Mvc;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

/// <summary>
/// Controller to check the health of the database connection.
/// </summary>
[ApiController]
[Route("/dbHealth")]
public class HealthController : Controller
{
    private readonly IConfiguration _configuration;

    /// <summary>
    /// Initializes a new instance of the <see cref="HealthController"/> class.
    /// </summary>
    /// <param name="configuration">The application configuration.</param>
    public HealthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    /// <summary>
    /// Checks the health of the database connection.
    /// </summary>
    /// <returns>An <see cref="IActionResult"/> indicating the status of the database connection.</returns>
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
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }

        return Ok("Database is working");
    }
}
