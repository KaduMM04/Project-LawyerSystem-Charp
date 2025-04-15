using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_LawyerSystem_CharpApi.Tests;

public class ConexaoDiretaTests
{
    [Fact]
    public async Task DirectConnection()
    {
        var connectionString = "Host=localhost;Port=5433;Database=lawyersystem;Username=postgres;Password=root;;";
        await using var conn = new NpgsqlConnection(connectionString);

        await conn.OpenAsync();

        Assert.Equal(System.Data.ConnectionState.Open, conn.State);
    }
}
