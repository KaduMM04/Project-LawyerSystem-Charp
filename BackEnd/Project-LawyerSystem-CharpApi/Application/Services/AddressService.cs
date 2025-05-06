using AutoMapper;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;

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
}
