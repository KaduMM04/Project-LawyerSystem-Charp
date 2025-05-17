using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

/// <summary>
/// Represents the data transfer object for reading user information.
/// </summary>
public class UserReadDto
{
    /// <summary>
    /// Gets or sets the unique identifier for the user.
    /// </summary>
    public Guid Id { get; set; }

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

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Role Role { get; set; }

    /// <summary>
    /// Gets or sets the LawyerId of the user, if applicable.
    /// </summary>
    public string? LawyerOAB { get; set; }

}
