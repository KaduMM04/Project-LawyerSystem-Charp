using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Domain.Interfaces;

public interface ICaseEventsRepository
{
    Task<int> AddCaseEventAsync(int caseId);

    Task<IEnumerable<CaseEvent>> GetAllCaseEvents();

    Task<CaseEvent> GetCaseEventById(Guid id);

    Task<CaseEvent> GetCaseEventByCaseId(Guid caseId);
}
