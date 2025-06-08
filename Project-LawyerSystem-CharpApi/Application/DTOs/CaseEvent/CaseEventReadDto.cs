using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.CaseEvent;

public class CaseEventReadDto
{

    public Guid Id { get; set; }

    public string Title { get; set; } 

    public string Description { get; set; } 

    public DateTime EventDate { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public EventType EventType { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public EventStatus EventStatus { get; set; }

    public string Notes { get; set; } = string.Empty;

    public Guid CaseId { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }
}
