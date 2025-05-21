
using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Client;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers
{
    [ApiController]
    [Route("/api/Client")]
    public class ClientController : Controller
    {
        private readonly ClientService _clientService;

        public ClientController(ClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateClient([FromBody] ClientDto clientCreateDto)
        {
            try
            {
                if (clientCreateDto == null)
                {
                    return BadRequest("Dados do Cliente inválidos");
                }

                var client = await _clientService.CreateClientAsync(clientCreateDto);
                return Ok(client);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("{id}")]
    public async Task<IActionResult> GetClientById(Guid id)
    {
        try
        {
            var result = await this._clientService.GetClientById(id);
            return this.Ok(result);
        }catch (Exception ex)
        {
            return this.BadRequest(ex.Message);
        }
    }

        [HttpGet]
        public async Task<IActionResult> GetAllClient()
        {
            try
            {
                var result = await this._clientService.GetAllClient();
                return this.Ok(result);
            }
            catch (Exception ex)
            {
                return this.BadRequest(ex.Message);
            }
        }
    
    
 }
}