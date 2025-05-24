using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Domain.Interfaces;

public interface ICaseEventRepository
{
    Task<int> AddCaseEventAsync(CaseEvent caseEvent);

    Task<IEnumerable<CaseEvent>> GetAllCaseEventsAsync();
    Task<bool> GetCaseByCaseIdAsync(Guid caseId);
    Task<CaseEvent> GetCaseEventByCaseIdAsync(Guid caseId);
}
