using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.CaseEvent;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers;

[ApiController]
[Route("/api/caseEvent")]
public class CaseEventController : Controller
{
    private readonly CaseEventService _caseEventService;

    public CaseEventController(CaseEventService caseEventService)
    {
        _caseEventService = caseEventService;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetAllCaseEvents()
    {
        try
        {
            var caseEvents = await _caseEventService.GetAllCaseEvents();
            return Ok(caseEvents);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetCaseEventById(Guid id)
    {
        try
        {
            var caseEvent = await _caseEventService.GetCaseEventById(id);
            return Ok(caseEvent);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> PostCaseEvent([FromBody]CaseEventCreateDto caseEventDto)
    {
        try
        {
            if (caseEventDto == null)
            {
                return BadRequest("Invalid case ID.");
            }

            await _caseEventService.AddCaseEvent(caseEventDto);
            return Ok("Created caseEvent");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
