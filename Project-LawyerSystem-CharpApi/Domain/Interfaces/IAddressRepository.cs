using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Domain.Interfaces;

/// <summary>
/// Interface for managing address-related data operations.
/// </summary>
public interface IAddressRepository
{
    /// <summary>
    /// Adds a new address asynchronously.
    /// </summary>
    /// <param name="address">The address to add.</param>
    /// <returns>The ID of the newly added address.</returns>
    public Task<int> AddAddressAsync(Address address);

    /// <summary>
    /// Retrieves all addresses asynchronously.
    /// </summary>
    /// <returns>A collection of all addresses.</returns>
    public Task<IEnumerable<Address>> GetAllAddress();
}
