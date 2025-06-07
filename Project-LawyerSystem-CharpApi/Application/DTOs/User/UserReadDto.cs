using System.Text.Json.Serialization;
using Project_LawyerSystem_CharpApi.Domain.Enums;

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

    /// <summary>
    /// Gets or sets the role of the user.
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Role Role { get; set; }

    /// <summary>
    /// Gets or sets the Lawyer OAB (Ordem dos Advogados do Brasil) identifier of the user, if applicable.
    /// </summary>
    public string? LawyerOAB { get; set; }

    public Guid ClientId { get; set; }
}
