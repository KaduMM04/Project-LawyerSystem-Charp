using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

/// <summary>  
/// Represents the data transfer object for updating user information.  
/// </summary>  
public class UserUpdateDto
{
    /// <summary>  
    /// Gets or sets the unique identifier for the user.  
    /// </summary>  
    public Guid Id { get; set; }

    /// <summary>
    /// Gets or sets the Name for the user.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the Email of the user.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the password of the user.
    /// </summary>
    public string Password { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the phone number of the user.
    /// </summary>
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the role of the user.
    /// </summary>
    public Role Role { get; set; }

    /// <summary>
    /// Gets or sets the ClientId of the user.
    /// </summary>
    public string? CPF { get; set; }

    /// <summary>
    /// Gets or sets the LawyerId of the user.
    /// </summary>
    public string? LawyerOAB { get; set; } // PK
}
