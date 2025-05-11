namespace Project_LawyerSystem_CharpApi.Application.DTOs.Address;

public class AddressDto
{
    public string Street { get; set; } = string.Empty;

    public string Number { get; set; } = string.Empty;

    public string? Complement { get; set; }

    public string Neighborhood { get; set; } = string.Empty;

    public string City { get; set; } = string.Empty;

    public string State { get; set; } = string.Empty;

    public string ZipCode { get; set; } = string.Empty;

}
