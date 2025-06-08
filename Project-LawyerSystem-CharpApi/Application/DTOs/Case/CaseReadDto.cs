using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Case;

public class CaseReadDto
{
    public Guid Id { get; set; }

    public int CaseNumber { get; set; }

    public string Description { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TypeCases TypeCases { get; set; }

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Status Status { get; set; }

    public string LawyerOAB;

    public Guid ClientId { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }
}
