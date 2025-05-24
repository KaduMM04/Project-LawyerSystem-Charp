using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

/// <summary>
/// Controller for managing address-related operations.
/// </summary>
[ApiController]
[Route("api/Address")]
public class AddressController : Controller
{
    /// <summary>
    /// Service for handling address operations.
    /// </summary>
    private readonly AddressService _addressService;

    /// <summary>
    /// Initializes a new instance of the <see cref="AddressController"/> class.
    /// </summary>
    /// <param name="addressService">The address service.</param>
    public AddressController(AddressService addressService)
    {
        _addressService = addressService;
    }

    /// <summary>
    /// Creates a new address.
    /// </summary>
    /// <param name="addressDto">The address data transfer object.</param>
    /// <returns>The created address.</returns>
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

    /// <summary>
    /// Retrieves all addresses.
    /// </summary>
    /// <returns>A list of all addresses.</returns>
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
