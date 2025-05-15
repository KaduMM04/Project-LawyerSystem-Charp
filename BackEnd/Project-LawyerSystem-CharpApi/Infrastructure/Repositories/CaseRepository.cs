using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Repositories
{
    public class CaseRepository : ICaseRepository
    {
        private readonly AppDbContext _context;
        public CaseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> AddCaseAsync(Case c)
        {
            await _context.Cases.AddAsync(c);
            return await _context.SaveChangesAsync();
        }
        public Task<IEnumerable<Case>> GetAllCases()
        {
            throw new NotImplementedException();
        }
    }
}