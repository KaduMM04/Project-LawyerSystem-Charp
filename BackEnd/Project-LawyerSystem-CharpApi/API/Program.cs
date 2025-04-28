using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.Application.Services;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;
using System.Data.Common;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

builder.Services.AddScoped<ILawyerRepository>();
builder.Services.AddScoped<LawyerService>();


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}



app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Map("/", () => Results.Content(
    "<h3> Use <a href='/swagger'>Swagger</a> to see all controllers</h3>", "text/html"));
app.Run();