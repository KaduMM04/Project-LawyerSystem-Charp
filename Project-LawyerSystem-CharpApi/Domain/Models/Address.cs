namespace Project_LawyerSystem_CharpApi.Domain.Models;

/// <summary>
/// Represents an address entity with details such as street, city, state, and associated user.
/// </summary>
public class Address
{

    /// <summary>
    /// Gets or sets the unique identifier for the address.
    /// </summary>
    public Guid Id { get; set; } = Guid.NewGuid();
  
    /// <summary>
    /// Gets or sets the street name of the address.
    /// </summary>
    public string Street { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the number of the address.
    /// </summary>
    public string Number { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the complement of the address, if any.
    /// </summary>
    public string? Complement { get; set; }

    /// <summary>
    /// Gets or sets the neighborhood of the address.
    /// </summary>
    public string Neighborhood { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the city of the address.
    /// </summary>
    public string City { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the state of the address.
    /// </summary>
    public string State { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the zip code of the address.
    /// </summary>
    public string ZipCode { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the user associated with the address.
    /// </summary>
    public User? User { get; set; }

    /// <summary>
    /// Gets or sets the date and time when the address was created.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the date and time when the address was last updated.
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
