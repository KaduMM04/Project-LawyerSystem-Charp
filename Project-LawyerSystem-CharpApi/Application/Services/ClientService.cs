



using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Client;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Services;

public class ClientService
{
    private readonly IClientRepository _clientRepository;
    private readonly IMapper _mapper;

    public ClientService(IClientRepository clientRepository, IMapper mapper)
    {
        _clientRepository = clientRepository;
        _mapper = mapper;
    }

    public async Task<Client> CreateClientAsync([FromBody] ClientDto clientDto)
    {
        if (clientDto == null)
        {
            throw new Exception("Client must not be null");
        }

        var client = _mapper.Map<Client>(clientDto);
        client.CreatedAt = DateTime.UtcNow;
        client.UpdatedAt = DateTime.UtcNow;
        var saveDb = await _clientRepository.AddClientAsync(client);

        if (saveDb == 0)
        {
            throw new Exception("There were no changes in the database");

        }
        return client;
    }

    public async Task<IEnumerable<ClientDto>> GetAllClient()
    {
        var clients = await _clientRepository.GetAllClient();
        var result = _mapper.Map<IEnumerable<ClientDto>>(clients);
        return result;
    }

    public async Task<ClientDto> GetClientById(Guid id)
    {
        if (id == null)
        {
            throw new Exception("id must be not null");
        }

        var result = await _clientRepository.GetClientById(id);
        return _mapper.Map<ClientDto>(result);
    }
}
