using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Client;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Services;

/// <summary>
/// Service for managing client-related operations.
/// </summary>
public class ClientService
{
    private readonly IClientRepository _clientRepository;
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of the <see cref="ClientService"/> class.
    /// </summary>
    /// <param name="clientRepository">The client repository instance.</param>
    /// <param name="mapper">The mapper instance for object mapping.</param>
    public ClientService(IClientRepository clientRepository, IMapper mapper)
    {
        _clientRepository = clientRepository;
        _mapper = mapper;
    }

    /// <summary>
    /// Creates a new client asynchronously.
    /// </summary>
    /// <param name="clientDto">The client data transfer object.</param>
    /// <returns>The created client entity.</returns>
    /// <exception cref="Exception">Thrown when the client DTO is null or no changes are made in the database.</exception>
    /// /// <exception cref="Exception">Thrown when there were any changes in database.</exception>
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

    /// <summary>
    /// Retrieves all clients asynchronously.
    /// </summary>
    /// <returns>A collection of client DTOs.</returns>
    public async Task<IEnumerable<Client>> GetAllClient()
    {
        var clients = await _clientRepository.GetAllClient();

        return clients;
    }

    /// <summary>
    /// Retrieves a client by its unique identifier asynchronously.
    /// </summary>
    /// <param name="id">The unique identifier of the client.</param>
    /// <returns>The client DTO.</returns>
    /// <exception cref="Exception">Thrown when the provided ID is an empty GUID.</exception>
    public async Task<ClientDto> GetClientById(Guid id)
    {
        if (id == Guid.Empty)
        {
            throw new Exception("id must not be an empty GUID");
        }

        var result = await _clientRepository.GetClientById(id);
        return _mapper.Map<ClientDto>(result);
    }
}
