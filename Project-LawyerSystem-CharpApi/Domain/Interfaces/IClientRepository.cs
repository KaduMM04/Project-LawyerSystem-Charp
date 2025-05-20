using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project_LawyerSystem_CharpApi.API.Controllers;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Domain.Interfaces
{
    public interface IClientRepository
    {
        Task<int> AddClientAsync(Client clientEntity);

        Task<IEnumerable<Client>> GetAllClient();
        Task<Client> GetClientById(Guid id);
        
    }
}