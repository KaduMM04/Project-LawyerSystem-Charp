/*using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project_LawyerSystem_CharpApi.Tests;

class DatabaseTestFixture : IAsyncLifetime
{

    public string ConnectionString { get; private set; } =
                "Host=localhost;Username=postgres;Password=1234;Database=testdb";

    public DbContextOptions<AppContext> DbContextOptions =>
        new DbContextOptionsBuilder<AppDbContext>()
            .UseNpgsql(ConnectionString)
            .Options;

    public async Task InitializeAsync()
    {
        await using var context = new AppDbContext(DbContextOptions);
        await context.Database.EnsureDeletedAsync();
        await context.Database.MigrateAsync();
    }

    public Task DisposeAsync() => Task.CompletedTask;

}
*/