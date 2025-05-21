namespace Project_LawyerSystem_CharpApi.Application.DTOs.Address;

/// <summary>
/// Represents an address with details such as street, number, complement, neighborhood, city, state, and zip code.
/// </summary>
public class AddressDto
{
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
}
