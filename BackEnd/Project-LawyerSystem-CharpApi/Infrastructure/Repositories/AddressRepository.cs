using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Repositories;

public class AddressRepository : IAddressRepository
{

    private readonly AppDbContext _context;
    public AddressRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<int> AddAddressAsync(Address address)
    {
        await _context.Address.AddAsync(address);
        return await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Address>> GetAllAddress() => await _context.Address.ToListAsync();

}
