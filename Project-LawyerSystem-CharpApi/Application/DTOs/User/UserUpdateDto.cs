using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;
using Project_LawyerSystem_CharpApi.Domain.Enums;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

/// <summary>
/// Represents the data transfer object for updating user information.
/// </summary>
public class UserUpdateDto
{
    /// <summary>
    /// Gets or sets the Name for the user.
    /// </summary>
    [JsonPropertyName("name")]
    [StringLength(250, ErrorMessage = "Name must be up to 200 characters")]
    public string? Name { get; set; }

    /// <summary>
    /// Gets or sets the Email of the user.
    /// </summary>
    [JsonPropertyName("email")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string? Email { get; set; }

    /// <summary>
    /// Gets or sets the phone number of the user.
    /// </summary>
    [JsonPropertyName("Phone")]
    [StringLength(11, ErrorMessage = "Phone must not be up to 11")]
    public string? Phone { get; set; }

    /// <summary>
    /// Gets or sets the password of the user.
    /// </summary>
    [JsonPropertyName("Password")]
    [StringLength(100, ErrorMessage = "Password must not be up to 100")]
    public string? Password { get; set; }
}
