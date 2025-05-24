using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Repositories;

public class CaseEventRepository : ICaseEventRepository
{
    private AppDbContext _context;
    
    public CaseEventRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<int> AddCaseEventAsync(CaseEvent caseEvent)
    {
       await _context.CaseEvents.AddAsync(caseEvent);
       return await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<CaseEvent>> GetAllCaseEventsAsync()
    {
        return await _context.CaseEvents.ToListAsync();
    }

    public async Task<CaseEvent> GetCaseEventByCaseIdAsync(Guid caseId)
    {
        return await _context.CaseEvents.FindAsync(caseId);
    }

    public async Task<bool> GetCaseByCaseIdAsync(Guid caseId)
    {
        var caseEntity = await _context.Cases.FindAsync(caseId);
        return caseEntity != null;
    }
}
