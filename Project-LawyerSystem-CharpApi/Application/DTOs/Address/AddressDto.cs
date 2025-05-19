using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Address;

public class AddressDto
{
    [JsonPropertyName("Street")]
    [Required]
    [StringLength(255)]
    public string Street { get; set; } = string.Empty;

    [JsonPropertyName("Number")]
    [Required]
    
    public string Number { get; set; } = string.Empty;

    [JsonPropertyName("Complement")]
    public string? Complement { get; set; }

    [JsonPropertyName("Neighborhood")]
    [Required]
    [StringLength(255)]
    public string Neighborhood { get; set; } = string.Empty;

    [JsonPropertyName("City")]
    [Required]
    [StringLength (255)]
    public string City { get; set; } = string.Empty;


    [JsonPropertyName("State")]
    [Required]
    [StringLength (2)]
    public string State { get; set; } = string.Empty;

    [JsonPropertyName("ZipCode")]
    [Required]
    [StringLength (9)]
    public string ZipCode { get; set; } = string.Empty;

}
