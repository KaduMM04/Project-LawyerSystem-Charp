using Project_LawyerSystem_CharpApi.Domain.Enums;

namespace Project_LawyerSystem_CharpApi.Domain.Models;

/// <summary>
/// Represents a user in the system.
/// </summary>
public class User
{
    /// <summary>
    /// Gets or sets the unique identifier for the user.
    /// </summary>
    public Guid Id { get; set; } = Guid.NewGuid();

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
    /// Gets or sets the salt used for hashing the password.
    /// </summary>
    public string Salt { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the role of the user.
    /// </summary>
    public Role Role { get; set; }

    /// <summary>
    /// Gets or sets the Lawyer OAB (Order of Attorneys of Brazil) identifier for the user.
    /// </summary>
    public string? LawyerOAB { get; set; }

    /// <summary>
    /// Gets or sets the lawyer details associated with the user.
    /// </summary>
    public Lawyer? Lawyer { get; set; }

    /// <summary>
    /// Gets or sets the unique identifier for the address associated with the user.
    /// </summary>
    public Guid AddressId { get; set; }

    /// <summary>
    /// Gets or sets the address associated with the user.
    /// </summary>
    required public Address Address { get; set; }

    /// <summary>
    /// Gets or sets the client details associated with the user.
    /// </summary>
    public Client? Client { get; set; }

    /// <summary>
    /// Gets or sets the unique identifier for the client associated with the user.
    /// </summary>
    public Guid? ClientId { get; set; }

    /// <summary>
    /// Gets or sets the date and time when the user was created.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the date and time when the user was last updated.
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
