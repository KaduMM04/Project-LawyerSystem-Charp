using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Case;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers
{
    [ApiController]
    [Route("/api/case")]
    public class CaseController : Controller
    {
        private readonly CaseService _caseService;

        public CaseController(CaseService caseService)
        {
            _caseService = caseService;
        }

        [HttpPost("create")]
        public async Task<ActionResult> CreateCase([FromBody] CaseDto caseDto)
        {
            try
        {
            await _caseService.AddCase(caseDto);

            return Ok(caseDto);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllCases()
         {
             try {
                var cases = await _caseService.GetAllCases();
                return Ok(cases);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
         }
        
    }
}