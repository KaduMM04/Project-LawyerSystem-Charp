using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project_LawyerSystem_CharpApi.API.Controllers;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Domain.Interfaces
{
    /// <summary>
    /// Interface for managing client repository operations.
    /// </summary>
    public interface IClientRepository
    {
        /// <summary>
        /// Adds a new client asynchronously.
        /// </summary>
        /// <param name="clientEntity">The client entity to add.</param>
        /// <returns>The ID of the newly added client.</returns>
        Task<int> AddClientAsync(Client clientEntity);

        /// <summary>
        /// Retrieves all clients asynchronously.
        /// </summary>
        /// <returns>A collection of all clients.</returns>
        Task<IEnumerable<Client>> GetAllClient();

        /// <summary>
        /// Retrieves a client by their unique identifier asynchronously.
        /// </summary>
        /// <param name="id">The unique identifier of the client.</param>
        /// <returns>The client with the specified ID.</returns>
        Task<Client> GetClientById(Guid id);
    }
}