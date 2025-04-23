using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Project_LawyerSystem_CharpApi.API.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_LawyerSystem_CharpApi.Tests;

public class PingControllerTest 
{

    private readonly IConfiguration _configuration;

    public PingControllerTest()
    {
        var inMemorySettings = new Dictionary<string, string>
        {
              {"ConnectionStrings:DefaultConnection",
                "Host=localhost;Port=5433;Database=lawyersystem;Username=postgres;Password=root;" }

        };

        _configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(inMemorySettings)
            .Build();   
    }   
    [Fact]
    public async Task InitializeAsync()
    {
        try
        {
            
            var controller = new HealthController(_configuration);

            var result = await controller.Ping();

            var okResult = Assert.IsType<OkObjectResult>(result);
        
            Assert.Equal("Db ok", okResult.Value);
        }
        catch (Exception ex)
        {
            Assert.False(true, $"Test failed with exception: {ex.Message}");
        }
    }
}
