using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Services;

public class AddressService
{
    private readonly IAddressRepository _addressRepository;
    private readonly IMapper _mapper;


    public AddressService(IAddressRepository addressRepository, IMapper mapper)
    {
        _addressRepository = addressRepository;
        _mapper = mapper;
    }

    public async Task CreateAddress(AddressDto address)
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
    }

    public async Task<IEnumerable<AddressDto>> GetAllAddress()
    {
        var addresses = await _addressRepository.GetAllAddress();
        var result = _mapper.Map<IEnumerable<AddressDto>>(addresses);
        return result;
    }

}
