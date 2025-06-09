using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.CaseEvent;

public class CaseEventCreateDto
{
    [JsonPropertyName("Title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("Description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("EventDate")]
    public DateTime EventDate { get; set; }

    [JsonPropertyName("EventType")]
    public EventType EventType { get; set; }

    [JsonPropertyName("EventStatus")]
    public EventStatus EventStatus { get; set; }

    [JsonPropertyName("Notes")]
    public string? Notes { get; set; }

    [JsonPropertyName("CaseId")]
    public Guid CaseId { get; set; }
}
