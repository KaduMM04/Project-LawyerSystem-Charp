using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

public class AddressController : Controller
{

    public readonly AddressService _addressService;
    public AddressController(AddressService addressService)
    {
        _addressService = addressService;
    }

}
