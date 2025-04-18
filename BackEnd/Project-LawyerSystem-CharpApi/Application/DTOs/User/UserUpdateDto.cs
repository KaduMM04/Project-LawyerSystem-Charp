using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

public class UserUpdateDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; }
    public string Phone { get; set; } = string.Empty;
    public Role Role { get; set; }

    /// <summary>
    /// Gets or sets the ClientId of the user.
    /// </summary>
    public Guid? ClientId { get; set; }

    /// <summary>
    /// Gets or sets the LawyerId of the user.
    /// </summary>
    public Guid? LawyerId { get; set; }
}
