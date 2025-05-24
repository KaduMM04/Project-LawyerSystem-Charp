using Project_LawyerSystem_CharpApi.Domain.Enums;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.CaseEvent;

public class CaseEventCreateDto
{
    public string Description { get; set; } = string.Empty;

    public string EventDate { get; set; } = string.Empty;

    public EventType EventType { get; set; }

    public EventStatus EventStatus { get; set; }

    public string? Notes { get; set; }

    public Guid CaseId { get; set; }
}
