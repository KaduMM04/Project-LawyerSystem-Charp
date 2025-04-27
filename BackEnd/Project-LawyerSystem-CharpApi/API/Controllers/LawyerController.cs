using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LawyerController : Controller
    {
        private readonly LawyerService _lawyerService;

        public LawyerController(LawyerService lawyerService)
        {
            _lawyerService = lawyerService;
        }

        // POST: api/lawyer
        [HttpPost]
        public async Task<IActionResult> CreateLawyer([FromBody] LawyerCreateDto lawyerCreateDto)
        {
            if (lawyerCreateDto == null)
            {
                return BadRequest("Dados do advogado inválidos.");
            }

            var lawyerDto = await _lawyerService.CreateLawyerAsync(lawyerCreateDto);
            return CreatedAtAction(nameof(GetLawyerByOAB), new { oab = lawyerDto.OAB }, lawyerDto);
        }

        // GET: api/lawyer/oab/{oab}
        [HttpGet("oab/{oab}")]
        public async Task<IActionResult> GetLawyerByOAB(string oab)
        {
            try
            {
                var lawyerDto = await _lawyerService.GetLawyerByOABAsync(oab);
                return Ok(lawyerDto);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }


    }
}
