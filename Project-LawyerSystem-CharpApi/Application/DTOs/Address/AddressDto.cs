using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Address;

/// <summary>
/// Represents an address with details such as street, number, complement, neighborhood, city, state, and zip code.
/// </summary>
public class AddressDto
{
    /// <summary>
    /// Gets or sets the street name of the address.
    /// </summary>
    [JsonPropertyName("Street")]
    [Required]
    [StringLength(255)]
    public string Street { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the number of the address.
    /// </summary>
    [JsonPropertyName("Number")]
    [Required]
    public string Number { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the complement of the address, if any.
    /// </summary>
    [JsonPropertyName("Complement")]
    public string? Complement { get; set; }

    /// <summary>
    /// Gets or sets the neighborhood of the address.
    /// </summary>
    [JsonPropertyName("Neighborhood")]
    [Required]
    [StringLength(255)]
    public string Neighborhood { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the city of the address.
    /// </summary>
    [JsonPropertyName("City")]
    [Required]
    [StringLength (255)]
    public string City { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the state of the address.
    /// </summary>
    [JsonPropertyName("State")]
    [Required]
    [StringLength (2)]
    public string State { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the zip code of the address.
    /// </summary>
    [JsonPropertyName("ZipCode")]
    [Required]
    [StringLength (9)]
    public string ZipCode { get; set; } = string.Empty;
}
