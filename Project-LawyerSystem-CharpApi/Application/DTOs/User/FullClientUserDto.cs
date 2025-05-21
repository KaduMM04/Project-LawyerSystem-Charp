using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Client;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

/// <summary>
/// Represents a full client user data transfer object,
/// containing user, address, and client-specific information.
/// </summary>
public class FullClientUserDto
{
    /// <summary>
    /// Gets or sets the user details.
    /// </summary>
    required public UserCreateDto UserDto { get; set; }

    /// <summary>
    /// Gets or sets the address details.
    /// </summary>
    required public AddressDto AddressDto { get; set; }

    /// <summary>
    /// Gets or sets the client-specific details.
    /// </summary>
    required public ClientDto ClientDto { get; set; }
}
