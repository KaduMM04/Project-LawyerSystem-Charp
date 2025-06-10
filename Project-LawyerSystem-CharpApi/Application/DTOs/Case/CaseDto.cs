
using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Case;

public class CaseDto
{
    [Required(ErrorMessage = "Type is required")]
    [JsonPropertyName("Type")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TypeCases Type { get; set; }

    [Required(ErrorMessage = "Description is required")]
    [JsonPropertyName("Description")]
    public string Description { get; set; } = string.Empty;

    [Required(ErrorMessage = "Status is required")]
    [JsonPropertyName("Status")]
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public Status Status { get; set; }

    [Required(ErrorMessage = "Lawyer OAB is required")]
    [JsonPropertyName("LawyerOAB")]
    public string LawyerOAB { get; set; } = string.Empty;

    [Required(ErrorMessage = "Client id is required")]
    [JsonPropertyName("ClientId")]
    public Guid ClientId { get; set; }

}