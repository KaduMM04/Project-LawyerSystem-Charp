using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Mappers;

/// <summary>
/// Profile for mapping between Address and AddressDto objects.
/// </summary>
public class AddressProfile : Profile
{
    /// <summary>
    /// Initializes a new instance of the <see cref="AddressProfile"/> class.
    /// Configures mappings between Address and AddressDto.
    /// </summary>
    public AddressProfile()
    {
        CreateMap<AddressDto, Address>();
        CreateMap<Address, AddressDto>();
    }
}
