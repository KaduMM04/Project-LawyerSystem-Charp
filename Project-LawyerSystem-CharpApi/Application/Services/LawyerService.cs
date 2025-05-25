using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Services;

/// <summary>
/// Service for managing lawyer-related operations.
/// </summary>
public class LawyerService(ILawyerRepository lawyerRepository, IMapper mapper)
{
    private readonly ILawyerRepository _lawyerRepository = lawyerRepository;
    private readonly IMapper _mapper = mapper;

    /// <summary>
    /// Creates a new lawyer.
    /// </summary>
    /// <param name="lawyerCreateDto">The lawyer creation DTO.</param>
    /// <returns>The created lawyer.</returns>
    /// <exception cref="ArgumentNullException">Thrown when the input DTO is null.</exception>
    /// <exception cref="Exception">Thrown when a lawyer with the same OAB already exists.</exception>
    public async Task<Lawyer> CreateLawyerAsync(LawyerCreateDto lawyerCreateDto)
    {
        if (lawyerCreateDto == null)
        {
            throw new ArgumentNullException(nameof(lawyerCreateDto));
        }

        var lawyer = _mapper.Map<Lawyer>(lawyerCreateDto);

        // Verificar se o advogado já existe, por exemplo, pela OAB
        var existingLawyer = await _lawyerRepository.GetLawyerByOABAsync(lawyer.OAB);
        if (existingLawyer != null)
        {
            throw new Exception("Advogado com a mesma OAB já existe.");
        }

        lawyer.CreatedAt = DateTime.UtcNow;
        lawyer.UpdatedAt = DateTime.UtcNow;

        // Adicionar o advogado no banco de dados
        await _lawyerRepository.AddLawyerAsync(lawyer);

        return lawyer;
    }

    /// <summary>
    /// Retrieves a lawyer by their OAB.
    /// </summary>
    /// <param name="oab">The OAB of the lawyer.</param>
    /// <returns>The lawyer DTO.</returns>
    /// <exception cref="ArgumentException">Thrown when the OAB is null or empty.</exception>
    /// <exception cref="Exception">Thrown when no lawyer is found with the given OAB.</exception>
    public async Task<LawyerCreateDto> GetLawyerByOABAsync(string oab)
    {
        if (string.IsNullOrEmpty(oab))
        {
            throw new ArgumentException("OAB não pode ser nulo ou vazio", nameof(oab));
        }

        var lawyer = await _lawyerRepository.GetLawyerByOABAsync(oab);
        if (lawyer == null)
        {
            throw new Exception("Advogado não encontrado com essa OAB.");
        }

        return _mapper.Map<LawyerCreateDto>(lawyer);
    }

    /// <summary>
    /// Retrieves all lawyers.
    /// </summary>
    /// <returns>A collection of lawyer DTOs.</returns>
    public async Task<IEnumerable<LawyerCreateDto>> GetAllLawyersAsync()
    {
        var lawyers = await _lawyerRepository.GetAllLawyersAsync();

        if (lawyers == null)
        {
            throw new Exception("Nenhum advogado encontrado.");
        }

        return _mapper.Map<IEnumerable<LawyerCreateDto>>(lawyers);
    }
}
