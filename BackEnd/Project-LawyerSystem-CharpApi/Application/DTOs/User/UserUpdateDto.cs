using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

/// <summary>
/// Represents the data transfer object for updating user information.
/// </summary>
public class UserUpdateDto
{

    /// <summary>
    /// Gets or sets the Name for the user.
    /// </summary>
    [NotNull]
    [Required(ErrorMessage = "Name is required")]
    [JsonPropertyName("name")]
    [StringLength(250, ErrorMessage = "Name must be up to 200 characters")]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the Email of the user.
    /// </summary>
    [NotNull]
    [JsonPropertyName("email")]
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the phone number of the user.
    /// </summary>
    [NotNull]
    [JsonPropertyName("Phone")]
    [Required(ErrorMessage = "Phone is required")]
    [StringLength(11, ErrorMessage = "Phone must be up to 11")]
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the password of the user.
    /// </summary>
    [JsonPropertyName("Password")]
    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, ErrorMessage = "Password must be up to 11")]
    public string Password { get; set; } = string.Empty;
}
