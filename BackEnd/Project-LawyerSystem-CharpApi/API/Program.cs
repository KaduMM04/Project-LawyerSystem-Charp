using System.Data.Common;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
    "Host=lawyersystem-db;Port=5433;Database=lawyersystem;Username=postgres;Password=postgres";

builder.Services.AddTransient<Npgsql.NpgsqlConnection>(
    _ => new Npgsql.NpgsqlConnection(connectionString));

var app = builder.Build();

app.MapGet("/ping", async () =>
{
    try
    {
        await using var conn = new Npgsql.NpgsqlConnection(connectionString);
        await conn.OpenAsync();
        await conn.CloseAsync();
        return Results.Ok("pong");
    }
    catch (Exception ex)
    {
        return Results.Problem($"Database connection failed: {ex.Message}");
    }
});

app.Map("/", () => "Hello World");

app.Run();