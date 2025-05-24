using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.CaseEvent;
using Project_LawyerSystem_CharpApi.Application.Services;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.API.Controllers;


[Route("/api/caseEvent")]
[ApiController]
public class CaseEventController : Controller
{

    private readonly CaseEventService _caseEventService;

    public CaseEventController(CaseEventService caseEventService)
    {
        _caseEventService = caseEventService;
    }

    [HttpGet]
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

    [HttpPost]
    public async Task<IActionResult> PostCaseEvent([FromBody] int caseId, CaseEventCreateDto caseEventDto)
    {
        try
        {
            if (caseId <= 0)
            {
                return BadRequest("Invalid case ID.");
            }

            var caseEvent = await _caseEventService.AddCaseEvent(caseId, caseEventDto);
            return Ok(caseEvent);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
