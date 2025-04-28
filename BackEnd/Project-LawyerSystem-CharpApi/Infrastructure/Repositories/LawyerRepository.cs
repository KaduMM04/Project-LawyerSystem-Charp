using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Repositories;

public class LawyerRepository : ILawyerRepository
{
    private readonly AppDbContext _context;

    public LawyerRepository(AppDbContext context)
    {
        _context = context;
    }


    public async Task<Lawyer> GetLawyerByOABAsync(string oab)
    {
        return await _context.Lawyers.FindAsync(oab);
    }
    // Obter todos os advogados
    public async Task<IEnumerable<Lawyer>> GetAllLawyersAsync()
    {
        return await _context.Lawyers.FirstOrDefaultAsync();
    }

    // Adicionar um novo advogado
    public async Task AddLawyerAsync(Lawyer lawyer)
    {
        await _context.Lawyers.AddAsync(lawyer);
        await _context.SaveChanges();
    }

}
