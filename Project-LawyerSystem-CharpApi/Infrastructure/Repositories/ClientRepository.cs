using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.API.Controllers;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Repositories
{
    /// <summary>
    /// Repository for managing client-related data operations.
    /// </summary>
    public class ClientRepository : IClientRepository
    {
        private readonly AppDbContext _context;

        /// <summary>
        /// Initializes a new instance of the <see cref="ClientRepository"/> class.
        /// </summary>
        /// <param name="context">The database context to be used for data operations.</param>
        public ClientRepository(AppDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Adds a new client to the database asynchronously.
        /// </summary>
        /// <param name="clientEntity">The client entity to be added.</param>
        /// <returns>The number of state entries written to the database.</returns>
        public async Task<int> AddClientAsync(Client clientEntity)
        {
            await _context.Clients.AddAsync(clientEntity);
            return await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Retrieves all clients from the database asynchronously.
        /// </summary>
        /// <returns>A collection of all clients.</returns>
        public async Task<IEnumerable<Client>> GetAllClient()
        {
            return await _context.Clients.ToListAsync();
        }

        /// <summary>
        /// Retrieves a client by their unique identifier asynchronously.
        /// </summary>
        /// <param name="id">The unique identifier of the client.</param>
        /// <returns>The client entity if found; otherwise, null.</returns>
        public async Task<Client> GetClientById(Guid id)
        {
            var client = await _context.Clients.FindAsync(id);

            if (client == null)
            {
                throw new Exception($"Client with ID {id} not found.");
            }

            return client;
        }
    }
}