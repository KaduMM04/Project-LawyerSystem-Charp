using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Repositories;

/// <summary>
/// Repository for managing Lawyer entities.
/// </summary>
public class LawyerRepository : ILawyerRepository
{
    private readonly AppDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="LawyerRepository"/> class.
    /// </summary>
    /// <param name="context">The database context.</param>
    public LawyerRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retrieves a lawyer by their OAB (Order of Attorneys of Brazil) number.
    /// </summary>
    /// <param name="oab">The OAB number of the lawyer.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the lawyer entity.</returns>
    public async Task<Lawyer> GetLawyerByOABAsync(string oab)
    {
        var lawyer = await _context.Lawyers.FindAsync(oab);

        if (lawyer == null)
        {
            throw new Exception($"Lawyer with oab {oab} not found.");
        }

        return lawyer;
    }

    /// <summary>
    /// Retrieves all lawyers from the database.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation. The task result contains a collection of lawyer entities.</returns>
    public async Task<IEnumerable<Lawyer>> GetAllLawyersAsync()
    {
        return await _context.Lawyers.ToListAsync();
    }

    /// <summary>
    /// Adds a new lawyer to the database.
    /// </summary>
    /// <param name="lawyer">The lawyer entity to add.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    public async Task AddLawyerAsync(Lawyer lawyer)
    {
        await _context.Lawyers.AddAsync(lawyer);
        await _context.SaveChangesAsync();
    }
}
