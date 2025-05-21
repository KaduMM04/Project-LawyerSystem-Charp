using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

/// <summary>
/// Represents a complete lawyer user data transfer object,
/// including user details, address, and lawyer-specific information.
/// </summary>
public class FullLawyerUserDto
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
    /// Gets or sets the lawyer-specific details.
    /// </summary>
    required public LawyerCreateDto LawyerCreateDto { get; set; }
}
