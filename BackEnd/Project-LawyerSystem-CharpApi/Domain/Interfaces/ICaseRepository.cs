using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Domain.Interfaces
{
    public interface ICaseRepository
    {
        public Task<int> AddCaseAsync(Case cases);
        public Task<IEnumerable<Case>> GetAllCases();
    }
}