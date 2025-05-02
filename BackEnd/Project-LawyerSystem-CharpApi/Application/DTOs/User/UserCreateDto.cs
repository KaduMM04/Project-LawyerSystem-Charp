using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.Text.Json.Serialization;
namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

/// <summary>
/// Represents the data transfer object for creating a new user.
/// </summary>
public class UserCreateDto
{
    /// <summary>
    /// Gets or sets the name of the user.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the email address of the user.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the phone number of the user.
    /// </summary>
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the password of the user.
    /// </summary>
    public string Password { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the role of the user.
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Role Role { get; set; }

    /// <summary>
    /// Gets or sets the ClientId of the user.
    /// </summary>
    public Guid? ClientId { get; set; }

    /// <summary>
    /// Gets or sets the LawyerId of the user.
    /// </summary>
    public string? LawyerOAB { get; set; } // FK
}
