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
    public class ClientRepository : IClientRepository

    {
        private readonly AppDbContext _context;

        public ClientRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddClientAsync(Client clientEntity)

        {
            await _context.Clients.AddAsync(clientEntity);
            return await _context.SaveChangesAsync();

            
        }

        public async Task<IEnumerable<Client>> GetAllClient()
        {
            return await _context.Clients.ToListAsync();
            
        }

        public async Task<Client> GetClientById(Guid id)
        {
            return await _context.Clients.FindAsync(id);
        }
    }
}