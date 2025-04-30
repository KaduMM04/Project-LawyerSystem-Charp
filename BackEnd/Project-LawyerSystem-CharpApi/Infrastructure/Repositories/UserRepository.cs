using Microsoft.EntityFrameworkCore;
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
        return (IEnumerable<User>)await _context.Users.FirstOrDefaultAsync();
    }

    public async Task<int> AddUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        return await _context.SaveChangesAsync();
    }

    public async Task<int> UpdateUserAsync(User user)
    {

         _context.Users.Update(user);
       return await _context.SaveChangesAsync();
    }

    public Task<Lawyer> GetLawyerByOabAsync(string oab)
    {
        _context.Lawyers.FindAsync(oab);
        return Task.FromResult(_context.Lawyers.Find(oab));
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
       return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
    }

}
