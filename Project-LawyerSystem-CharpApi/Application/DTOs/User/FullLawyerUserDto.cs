using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;

using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

public class FullLawyerUserDto
{
    public UserCreateDto UserDto { get; set; }

    public AddressDto AddressDto { get; set; }

    public LawyerCreateDto LawyerCreateDto { get; set; }
}
