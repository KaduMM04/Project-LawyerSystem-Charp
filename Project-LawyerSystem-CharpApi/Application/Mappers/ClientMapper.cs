using AutoMapper;

using Project_LawyerSystem_CharpApi.Application.DTOs.Client;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Mappers;

/// <summary>
/// Profile configuration for mapping between <see cref="ClientDto"/> and <see cref="Client"/>.
/// </summary>
public class ClientProfile : Profile
{
    /// <summary>
    /// Initializes a new instance of the <see cref="ClientProfile"/> class.
    /// Configures the mappings between <see cref="ClientDto"/> and <see cref="Client"/>.
    /// </summary>
    public ClientProfile()
    {
        CreateMap<ClientDto, Client>();
        CreateMap<Client, ClientDto>();
    }
}
