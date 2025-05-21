using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Services;

/// <summary>
/// Service for managing address-related operations.
/// </summary>
public class AddressService
{
    private readonly IAddressRepository _addressRepository;
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of the <see cref="AddressService"/> class.
    /// </summary>
    /// <param name="addressRepository">The address repository for data access.</param>
    /// <param name="mapper">The mapper for object transformations.</param>
    public AddressService(IAddressRepository addressRepository, IMapper mapper)
    {
        _addressRepository = addressRepository;
        _mapper = mapper;
    }

    /// <summary>
    /// Creates a new address in the system.
    /// </summary>
    /// <param name="address">The address data transfer object.</param>
    /// <returns>The created address entity.</returns>
    /// <exception cref="Exception">Thrown when the address is null or database changes fail.</exception>
    public async Task<Address> CreateAddress(AddressDto address)
    {
        if (address == null)
        {
            throw new Exception("Address must not be null");
        }

        var addressEntity = _mapper.Map<Address>(address);
        addressEntity.CreatedAt = DateTime.UtcNow;
        addressEntity.UpdatedAt = DateTime.UtcNow;
        var saveDb = await _addressRepository.AddAddressAsync(addressEntity);

        if (saveDb == 0)
        {
            throw new Exception("There were no changes in the database");
        }

        return addressEntity;
    }

    /// <summary>
    /// Retrieves all addresses from the system.
    /// </summary>
    /// <returns>A collection of address data transfer objects.</returns>
    public async Task<IEnumerable<AddressDto>> GetAllAddress()
    {
        var addresses = await _addressRepository.GetAllAddress();
        var result = _mapper.Map<IEnumerable<AddressDto>>(addresses);
        return result;
    }
}
