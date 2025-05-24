using Project_LawyerSystem_CharpApi.Domain.Enums;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.CaseEvent;

public class CaseEventReadDto
{
    public string Description { get; set; }

    public string EventDate { get; set; }

    public EventType EventType { get; set; }

    public EventStatus EventStatus { get; set; }

    public string Notes { get; set; }

    public CaseEventReadDto Case { get; set; }

}
