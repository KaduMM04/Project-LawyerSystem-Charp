using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
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
    [NotNull]
    [Required(ErrorMessage = "Name is required")]
    [JsonPropertyName("name")]
    [StringLength(250, ErrorMessage = "Name must be up to 200 characters")]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the email address of the user.
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
    [Required( ErrorMessage = "Phone is required")]
    [StringLength(11, ErrorMessage ="Phone must be up to 11")]
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the password of the user.
    /// </summary>
    [JsonPropertyName("Password")]
    [Required(ErrorMessage = "Password is required")]
    [StringLength(100, ErrorMessage = "Password must be up to 11")]
    public string Password { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the role of the user.
    /// </summary>
    [JsonConverter(typeof(JsonStringEnumConverter))]
    [JsonPropertyName("Role")]
    [Required(ErrorMessage = "Role is required")]
    [EnumDataType(typeof(Role), ErrorMessage = "Invalid role")]
    public Role Role { get; set; }

    /// <summary>
    /// Gets or sets the LawyerId of the user.
    /// </summary>
    [StringLength(8, ErrorMessage = "LawyerOAB must be up to")]
    [JsonPropertyName("LawyerOAB")]
    public string? LawyerOAB { get; set; } // FK


    [JsonPropertyName("AddressId")]
    [Required ( ErrorMessage = "Address must exist")]
    public Guid AddressId { get; set; }
}
