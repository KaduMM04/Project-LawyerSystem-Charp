namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

/// <summary>
/// Represents the data transfer object for reading user information.
/// </summary>
public class UserReadDto
{

    public Guid Id { get; set; }
    /// <summary>
    /// Gets or sets the unique identifier for the user.
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the unique identifier for the user.
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the phone number of the user.
    /// </summary>
    public string Phone { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the ClientId of the user.
    /// </summary>
    public Guid? ClientId { get; set; }

    /// <summary>
    /// Gets or sets the LawyerId of the user.
    /// </summary>
    public Guid? LawyerId { get; set; }
}
