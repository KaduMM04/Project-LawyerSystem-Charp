using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Client;
using Project_LawyerSystem_CharpApi.Application.Services;

namespace Project_LawyerSystem_CharpApi.API.Controllers
{
    /// <summary>
    /// Controller for managing client-related operations.
    /// </summary>
    [ApiController]
    [Route("/api/Client")]
    public class ClientController : Controller
    {
        private readonly ClientService _clientService;

        /// <summary>
        /// Initializes a new instance of the <see cref="ClientController"/> class.
        /// </summary>
        /// <param name="clientService">The client service to handle business logic.</param>
        public ClientController(ClientService clientService)
        {
            _clientService = clientService;
        }

        /// <summary>
        /// Creates a new client.
        /// </summary>
        /// <param name="clientCreateDto">The client data transfer object containing client details.</param>
        /// <returns>An <see cref="IActionResult"/> indicating the result of the operation.</returns>
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

        /// <summary>
        /// Retrieves a client by their unique identifier.
        /// </summary>
        /// <param name="id">The unique identifier of the client.</param>
        /// <returns>An <see cref="IActionResult"/> containing the client details.</returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientById(Guid id)
        {
            try
            {
                var result = await _clientService.GetClientById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Retrieves all clients.
        /// </summary>
        /// <returns>An <see cref="IActionResult"/> containing a list of all clients.</returns>
        [HttpGet]
        public async Task<IActionResult> GetAllClient()
        {
            try
            {
                var result = await _clientService.GetAllClient();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}