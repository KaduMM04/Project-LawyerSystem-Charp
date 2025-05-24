using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Repositories;

/// <summary>
/// Repository for managing user-related data operations.
/// </summary>
public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserRepository"/> class.
    /// </summary>
    /// <param name="context">The database context.</param>
    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Retrieves a user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the user with the specified identifier.</returns>
    public async Task<User> GetUserByIdAsync(Guid id)
    {
#pragma warning disable CS8603 // Possible null reference return.
        return await _context.Users.FindAsync(id);
#pragma warning restore CS8603 // Possible null reference return.
    }

    /// <summary>
    /// Retrieves all users from the database.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation. The task result contains a collection of all users.</returns>
    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _context.Users.ToListAsync();
    }

    /// <summary>
    /// Adds a new user to the database.
    /// </summary>
    /// <param name="user">The user entity to add.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the number of state entries written to the database.</returns>
    public async Task<int> AddUserAsync(User user)
    {
        await _context.Users.AddAsync(user);
        return await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Updates an existing user in the database.
    /// </summary>
    /// <param name="user">The user entity with updated information.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the number of state entries written to the database.</returns>
    public async Task<int> UpdateUserAsync(User user)
    {
        _context.Users.Update(user);
        return await _context.SaveChangesAsync();
    }

    /// <summary>
    /// Retrieves a lawyer by their OAB (Ordem dos Advogados do Brasil) number.
    /// </summary>
    /// <param name="oab">The OAB number of the lawyer.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the lawyer with the specified OAB number.</returns>
    public async Task<Lawyer> GetLawyerByOabAsync(string oab)
    {
#pragma warning disable CS8603 // Possible null reference return.
        return await _context.Lawyers.FindAsync(oab);
#pragma warning restore CS8603 // Possible null reference return.

    }

    /// <summary>
    /// Retrieves a user by their email address.
    /// </summary>
    /// <param name="email">The email address of the user.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the user with the specified email address, or null if no user is found.</returns>
    public async Task<User> GetUserByEmailAsync(string email)
    {
#pragma warning disable CS8603 // Possible null reference return.
        return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
#pragma warning restore CS8603 // Possible null reference return.
    }

    /// <summary>
    /// Retrieves an address by its unique identifier.
    /// </summary>
    /// <param name="addressId">The unique identifier of the address.</param>
    /// <returns>A task that represents the asynchronous operation. The task result contains the address with the specified identifier.</returns>
    public async Task<Address> GetAddressByIdAsync(Guid addressId)
    {
#pragma warning disable CS8603 // Possible null reference return.
        return await _context.Address.FindAsync(addressId);
#pragma warning restore CS8603 // Possible null reference return.
    }

    /// <inheritdoc />
    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        return await _context.Database.BeginTransactionAsync();
    }

    /// <inheritdoc />
    public async Task<int> AddAddressAsync(Address address)
    {
        await _context.Address.AddAsync(address);
        return await _context.SaveChangesAsync();
    }

    /// <inheritdoc />
    public async Task<int> AddLawyerAsync(Lawyer lawyer)
    {
        await _context.Lawyers.AddAsync(lawyer);
        return await _context.SaveChangesAsync();
    }

    /// <inheritdoc />
    public async Task<int> AddClientAsync(Client client)
    {
        await _context.Clients.AddAsync(client);
        return await _context.SaveChangesAsync();
    }
}
