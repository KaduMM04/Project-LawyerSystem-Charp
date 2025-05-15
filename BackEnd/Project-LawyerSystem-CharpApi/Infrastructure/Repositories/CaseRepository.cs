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

        public async Task AddCaseAsync(Case c)
        {
            await _context.Cases.AddAsync(c);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Case>> GetAllCases()
        {
            return await _context.Cases
            .Include(c => c.Lawyer) // Carregar dados do advogado
            .ToListAsync();
        }
    }
}