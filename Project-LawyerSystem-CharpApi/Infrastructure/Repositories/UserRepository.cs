using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetUserByIdAsync(Guid id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<int> AddUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        return await _context.SaveChangesAsync();
    }

    public async Task<int> UpdateUserAsync(User user)
    {
        _context.Users.Update(user); // Removed 'await' as Update is not asynchronous  
        return await _context.SaveChangesAsync();
    }

    public async Task<Lawyer> GetLawyerByOabAsync(string oab)
    {
        return await _context.Lawyers.FindAsync(oab);
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
       return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<Address> GetAddressByIdAsync(Guid AddressId)
    {
        return await _context.Address.FindAsync(AddressId);
    }

    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await _context.Database.BeginTransactionAsync();
    }

    public async Task AddAddressAsync(Address address)
    {
        await _context.Address.AddAsync(address);
        await _context.SaveChangesAsync();
    }

    public async Task AddLawyerAsync(Lawyer lawyer)
    {
        await _context.Lawyers.AddAsync(lawyer);
        await _context.SaveChangesAsync();
    }
}
