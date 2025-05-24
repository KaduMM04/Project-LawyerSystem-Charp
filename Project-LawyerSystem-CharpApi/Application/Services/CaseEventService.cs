using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.CaseEvent;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Services;

public class CaseEventService
{
    private readonly ICaseEventRepository _caseEventRepository;
    private readonly IMapper _mapper;

    public CaseEventService(ICaseEventRepository caseEventRepository, IMapper mapper)
    {
        _caseEventRepository = caseEventRepository;
        _mapper = mapper;
    }

    public async Task AddCaseEvent(CaseEventCreateDto caseEventDto)
    {
        if (caseEventDto == null)
        {
            throw new Exception("Case event must not be null");
        }

        if (!await _caseEventRepository.GetCaseByCaseIdAsync(caseEventDto.CaseId))
        {
            throw new Exception("Case ID must not be empty");
        }

        var newCaseEvent = _mapper.Map<CaseEvent>(caseEventDto);

        var dbResult = await _caseEventRepository.AddCaseEventAsync(newCaseEvent);

        if (dbResult == 0)
        {
            throw new Exception("There were no changes in database");
        }
    }

    public async Task<IEnumerable<CaseEventReadDto>> GetAllCaseEvents()
    {
        var caseEvents = await _caseEventRepository.GetAllCaseEventsAsync();

        if (caseEvents == null)
        {
            throw new Exception("There Aren't CaseEvents registered");
        }

        return _mapper.Map<IEnumerable<CaseEventReadDto>>(caseEvents);
    }

    public async Task<CaseEventReadDto> GetCaseEventById(Guid id)
    {
        var caseEvent = await _caseEventRepository.GetCaseEventByCaseIdAsync(id);

        if (caseEvent == null)
        {
            throw new Exception("Case event not found");
        }

        return _mapper.Map<CaseEventReadDto>(caseEvent);
    }
}
