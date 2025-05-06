using AutoMapper;

namespace Project_LawyerSystem_CharpApi.Application.Mappers;

public class AddressProfile : Profile
{
    public AddressProfile()
    {
        CreateMap<AddressCreateDto, Address>();
    }
}
