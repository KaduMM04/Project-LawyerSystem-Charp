using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.Controllers
{
    /// <summary>
    /// Controller responsible for managing lawyer-related operations.
    /// </summary>
    [Route("api/Lawyer")]
    [ApiController]
    public class LawyerController : Controller
    {
        private readonly LawyerService _lawyerService;

        /// <summary>
        /// Initializes a new instance of the <see cref="LawyerController"/> class.
        /// </summary>
        /// <param name="lawyerService">The service responsible for lawyer-related operations.</param>
        public LawyerController(LawyerService lawyerService)
        {
            _lawyerService = lawyerService;
        }

        /// <summary>
        /// Creates a new lawyer.
        /// </summary>
        /// <param name="lawyerCreateDto">The data transfer object containing lawyer details.</param>
        /// <returns>An IActionResult indicating the result of the operation.</returns>
        // POST: api/lawyer
        [HttpPost]
        public async Task<IActionResult> CreateLawyer([FromBody] LawyerCreateDto lawyerCreateDto)
        {
            try
            {
                if (lawyerCreateDto == null)
                {
                    return BadRequest("Dados do advogado inválidos.");
                }

                var lawyer = await _lawyerService.CreateLawyerAsync(lawyerCreateDto);
                return Ok(lawyer);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /// <summary>
        /// Retrieves a lawyer by their OAB (Order of Attorneys of Brazil) number.
        /// </summary>
        /// <param name="oab">The OAB number of the lawyer to retrieve.</param>
        /// <returns>An IActionResult containing the lawyer details or a NotFound result if the lawyer does not exist.</returns>
         // GET: api/lawyer/oab/{oab}
        [HttpGet]
        public async Task<IActionResult> GetLawyerByOAB(string oab)
        {
                var lawyerDto = await _lawyerService.GetLawyerByOABAsync(oab);
                return this.Ok(lawyerDto);
        }


    }
}
