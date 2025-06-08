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
            CreateMap<CaseDto, Case>();
            CreateMap<Case, CaseDto>();

            CreateMap<CaseReadDto, Case>();
            CreateMap<Case, CaseReadDto>();

            CreateMap<IEnumerable<CaseReadDto>, IEnumerable<Case>>();
        }
    }
}