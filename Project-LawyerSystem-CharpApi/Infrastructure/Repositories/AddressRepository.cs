using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Repositories;

/// <summary>
/// Repository for managing Address entities in the database.
/// </summary>
public class AddressRepository : IAddressRepository
{
    private readonly AppDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="AddressRepository"/> class.
    /// </summary>
    /// <param name="context">The database context to be used.</param>
    public AddressRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Adds a new address to the database asynchronously.
    /// </summary>
    /// <param name="address">The address entity to add.</param>
    /// <returns>The number of state entries written to the database.</returns>
    public async Task<int> AddAddressAsync(Address address)
    {
        await _context.Address.AddAsync(address);
        return await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Retrieves all addresses from the database asynchronously.
    /// </summary>
    /// <returns>A collection of all address entities.</returns>
    public async Task<IEnumerable<Address>> GetAllAddress() => await _context.Address.ToListAsync();
}
