using Microsoft.VisualBasic;
using Project_LawyerSystem_CharpApi.Domain.Enums;

namespace Project_LawyerSystem_CharpApi.Domain.Models;

public class CaseEvent
{
    public Guid Id { get; set; }

    required public string Description { get; set; } = string.Empty;

    required public DateTime EventDate { get; set; }

    required public EventType EventType { get; set; }

    required public EventStatus EventStatus { get; set; }

    public string Notes { get; set; } = string.Empty;

    required public Guid CaseId { get; set; }

    public Case Case { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }

}
