using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Mappers;

public class LawyerProfile : Profile
{
    public LawyerProfile()
    {
        CreateMap<LawyerCreateDto, Lawyer>();
        CreateMap<Lawyer, LawyerCreateDto>();
    }
}
