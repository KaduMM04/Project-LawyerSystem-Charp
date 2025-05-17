using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Services;

public class LawyerService
{
    private readonly ILawyerRepository _lawyerRepository;
    private readonly IMapper _mapper;

    public LawyerService(ILawyerRepository lawyerRepository, IMapper mapper)
    {
        _lawyerRepository = lawyerRepository;
        _mapper = mapper;
    }

    // Criação de um novo advogado
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

    // Obter um advogado por OAB
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

    public async Task<IEnumerable<LawyerCreateDto>> GetAllLawyersAsync()
    {
        var lawyers = await _lawyerRepository.GetAllLawyersAsync();
        return _mapper.Map<IEnumerable<LawyerCreateDto>>(lawyers);
    }

}
