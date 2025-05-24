using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Case;
using Project_LawyerSystem_CharpApi.Domain.Models;


namespace Project_LawyerSystem_CharpApi.Application.Mappers
{
    public class CaseProfile : Profile
    {
        public CaseProfile()
        {
            CreateMap<CaseCreateDto, Case>();
            CreateMap<Case, CaseCreateDto>();

            CreateMap<CaseReadDto, Case>();
            CreateMap<Case, CaseReadDto>()
            .ForMember(dest => dest.ClientName, opt => opt.MapFrom(src => src.Client.company_name));
        }
    }
}