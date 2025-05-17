using Project_LawyerSystem_CharpApi.Domain.Models;
using Project_LawyerSystem_CharpApi.Infrastructure.Data;

namespace Project_LawyerSystem_CharpApi.Domain.Interfaces;

public interface IAddressRepository
{
    public Task<int> AddAddressAsync(Address address);
    public Task<IEnumerable<Address>> GetAllAddress();

}
