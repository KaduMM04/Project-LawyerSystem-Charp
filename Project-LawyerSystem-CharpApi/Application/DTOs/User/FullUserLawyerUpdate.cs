using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

public class FullUserLawyerUpdate
{
    public UserUpdateDto? UserUpdate { get; set; }

    public AddressDto? Address { get; set; }

    public LawyerUpdateDto? Lawyer { get; set; }

}
