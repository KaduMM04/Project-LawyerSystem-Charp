using Microsoft.EntityFrameworkCore.Storage;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Domain.Interfaces;

/// <summary>
/// Interface for user repository.
/// </summary>
public interface IUserRepository
{
    /// <summary>
    /// Gets a user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <returns>A task that represents the asynchronous operation.
    /// The task result contains the user with the specified identifier.</returns>
    Task<User> GetUserByIdAsync(Guid id);

    /// <summary>
    /// Gets all users.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation.
    /// The task result contains a collection of all users.</returns>
    Task<IEnumerable<User>> GetAllUsersAsync();

    /// <summary>
    /// Adds a new user.
    /// </summary>
    /// <param name="user">The user to add.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<int> AddUserAsync(User user);

    /// <summary>
    /// Updates an existing user.
    /// </summary>
    /// <param name="user">The user with updated information.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<int> UpdateUserAsync(User user);

    /// <summary>
    /// Gets a lawyer by their OAB (Order of Attorneys of Brazil) number.
    /// </summary>
    /// <param name="oab">The OAB number of the lawyer.</param>
    /// <returns>A task that represents the asynchronous operation.
    /// The task result contains the lawyer with the specified OAB number.</returns>
    Task<Lawyer> GetLawyerByOabAsync(string oab);

    /// <summary>
    /// Gets a user by their email address.
    /// </summary>
    /// <param name="email">The email address of the user.</param>
    /// <returns>A task that represents the asynchronous operation.
    /// The task result contains the user with the specified email address.</returns>
    Task<User> GetUserByEmailAsync(string email);

    /// <summary>
    /// Gets an address by its unique identifier.
    /// </summary>
    /// <param name="addressId">The unique identifier of the address.</param>
    /// <returns>A task that represents the asynchronous operation.
    /// The task result contains the address with the specified identifier.</returns>
    Task<Address> GetAddressByIdAsync(Guid addressId);

    /// <summary>
    /// Begins a database transaction.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation.
    /// The task result contains the database transaction object.</returns>
    Task<IDbContextTransaction> BeginTransactionAsync();

    /// <summary>
    /// Adds a new lawyer in database.
    /// </summary>
    /// <param name="lawyer">The lawyer to add.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<int> AddLawyerAsync(Lawyer lawyer);

    /// <summary>
    /// Adds a new client in database.
    /// </summary>
    /// <param name="client">The client to add.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<int> AddClientAsync(Client client);

    /// <summary>
    /// Adds a new address in database.
    /// </summary>
    /// <param name="client">The address to add.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<int> AddAddressAsync(Address client);

    public Task SaveChangesAsync();
}
