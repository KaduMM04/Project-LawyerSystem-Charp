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
    ///         The task result contains a collection of all users.</returns>
    Task<IEnumerable<User>> GetAllUsersAsync();

    /// <summary>
    /// Adds a new user.
    /// </summary>
    /// <param name="user">The user to add.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<User> AddUserAsync(User user);

    /// <summary>
    /// Updates an existing user.
    /// </summary>
    /// <param name="user">The user with updated information.</param>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<User> UpdateUserAsync(User user);

    /// <summary>
    /// Saves changes to the repository.
    /// </summary>
    /// <returns>A task that represents the asynchronous operation.</returns>
    Task<User> SaveChangesAsync();

    /// <summary>
    /// Gets a lawyer by their OAB (Order of Attorneys of Brazil) number.
    /// </summary>
    /// <param name="oab">The OAB number of the lawyer.</param>
    /// <returns>A task that represents the asynchronous operation.
    /// The task result contains the lawyer with the specified OAB number.</returns>
    Task<Lawyer> GetLawyerByOabAsync(string oab);

    Task<User> GetUserByEmailAsync(string email);
}
