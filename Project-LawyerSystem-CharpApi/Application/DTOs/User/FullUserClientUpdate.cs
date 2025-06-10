using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Client;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

public class FullUserClientUpdate
{
    public UserUpdateDto? UserUpdate { get; set; }

    public AddressDto? AddressDto { get; set; }

    public ClientDto? ClientDto { get; set; }

}
