using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

[ApiController]
[Route("api/Address")]
public class AddressController : Controller
{

    public readonly AddressService _addressService;

    public AddressController(AddressService addressService)
    {
        _addressService = addressService;
    }

    [HttpPost]
    public async Task<ActionResult> AddressPost([FromBody] AddressDto addressDto)
    {
        try
        {
            var address = await _addressService.CreateAddress(addressDto);

            return Ok(address);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    [HttpGet]
    public async Task<IActionResult> GetAllAddress()
    {
        try
        {
            var addresses = await _addressService.GetAllAddress();
            return Ok(addresses);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
