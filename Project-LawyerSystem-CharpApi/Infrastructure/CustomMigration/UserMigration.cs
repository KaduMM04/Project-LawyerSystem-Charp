using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Client;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Application.Services;
using Project_LawyerSystem_CharpApi.Domain.Enums;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Configurations;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;
using System.Numerics;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Project_LawyerSystem_CharpApi.Infrastructure.CustomMigration;

public class UserMigration
{
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _context;
    private readonly AuthService _authService;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserMigration"/> class.
    /// </summary>
    /// <param name="configuration">The configuration instance used to retrieve application settings.</param>
    /// <param name="context">The database context used for accessing and managing data.</param>
    /// <param name="authService">The authentication service used for user-related operations.</param>
    public UserMigration(IConfiguration configuration, AppDbContext context, AuthService authService)
    {
        _configuration = configuration;
        _context = context;
        _authService = authService;
    }

    /// <summary>
    /// Tests the database connection by opening and closing a connection.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation.
    /// The task result contains a string indicating success or an error message.</returns>
    public async Task<bool> TestDb()
    {
        try
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");
            await using var conn = new Npgsql.NpgsqlConnection(connectionString);
            await conn.OpenAsync();
            await conn.CloseAsync();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    /// <summary>
    /// Creates a new lawyer user in the system if no lawyers exist.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation.</returns>
    private async Task Createlawyer()
    {

        if (await _context.Users.AnyAsync(u => u.Role == Role.Advogado))
        {
            return;
        }

        if (await _context.Lawyers.AnyAsync())
        {
            return;
        }

        AddressDto address = new AddressDto
        {
            Street = "Rua Exemplo",
            Number = "1234",
            City = "Cidade Exemplo",
            Neighborhood = "Bairro Exemplo",
            State = "PR",
            ZipCode = "12345-678",
        };

        LawyerCreateDto lawyerCreateDto = new LawyerCreateDto
        {
            OAB = "123456",
            AreaOfExpertise = "Direito Civil",
        };

        UserCreateDto userCreateDto = new UserCreateDto
        {
            Name = "Advogado Exemplo",
            Email = "advogado.exemple@exemple.com",
            Phone = "12345678910",
            Password = "123",
            Role = Role.Advogado,
        };

        await _authService.RegisterFulLawyerlUser(userCreateDto, address, lawyerCreateDto);
    }

    /// <summary>
    /// Creates a new client user in the system if no clients exist.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation.</returns>
    private async Task CreateClient()
    {

        if (await _context.Users.AnyAsync(u => u.Role == Role.Cliente))
        {
            return;
        }

        if (await _context.Clients.AnyAsync())
        {
            return;
        }

        AddressDto address = new AddressDto
        {
            Street = "Rua Cliente",
            Number = "5678",
            City = "Cidade Cliente",
            Neighborhood = "Bairro Cliente",
            State = "PR",
            ZipCode = "87654-321",
        };

        ClientDto clientDto = new ClientDto
        {
            Profission = "Engenheiro",
            Representative = "n/a",
            MaritalStatus = "Solteiro",
            CompanyName = "Empresa Exemplo",
        };

        UserCreateDto userCreateDto = new UserCreateDto
        {
            Name = "Client Exemplo",
            Email = "client.exemplo@example.com",
            Phone = "123456555910",
            Password = "123",
            Role = Role.Cliente,
        };

        await _authService.RegisterFullClientUser(userCreateDto, address, clientDto);
    }

    public async Task CreateMainData()
    {
        await CreateClient();
        await Createlawyer();
    }
}
