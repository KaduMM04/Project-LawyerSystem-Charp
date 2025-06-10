using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.CaseEvent;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Mappers;

public class CaseEventProfile : Profile
{
    public CaseEventProfile()
    {
        CreateMap<CaseEventCreateDto, CaseEvent>()
             .ForMember(dest => dest.Id, opt => opt.MapFrom(_ => Guid.NewGuid()))
             .ForMember(dest => dest.CreateAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
             .ForMember(dest => dest.UpdateAt, opt => opt.MapFrom(_ => DateTime.UtcNow));

        CreateMap<CaseEvent, CaseEventCreateDto>();

    }


}
