namespace Project_LawyerSystem_CharpApi.Domain.Models;

public class Address
{
    public Guid Id { get; set; } = Guid.NewGuid();

    public string Street { get; set; } = string.Empty;

    public string Number { get; set; } = string.Empty;

    public string? Complement { get; set; }

    public string Neighborhood { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string State { get; set; } = string.Empty;

    public string ZipCode { get; set; } = string.Empty;

    public User? User { get; set; }

    /// <summary>
    /// Gets or sets the unique identifier for the lawyer. 
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the date and time when the lawyer was last updated.
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

}
