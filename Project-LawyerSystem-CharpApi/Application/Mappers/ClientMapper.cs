using AutoMapper;

using Project_LawyerSystem_CharpApi.Application.DTOs.Client;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Mappers;

public class ClientProfile : Profile
{
    public ClientProfile()
    {
        CreateMap<ClientDto, Client>();
        CreateMap<Client, ClientDto>();
   }
}
