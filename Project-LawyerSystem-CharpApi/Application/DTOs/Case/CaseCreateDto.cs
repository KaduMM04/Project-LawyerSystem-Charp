
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Case
{
    public class CaseCreateDto
    {
        [Required(ErrorMessage = "Type is required")]
        [JsonPropertyName("Type")]
        public string Type { get; set; }

        [Required(ErrorMessage = "Lawyer OAB is required")]
        [JsonPropertyName("LawyerOAB")]
        public string LawyerOAB { get; set; }

        [Required(ErrorMessage = "Client id is required")]
        [JsonPropertyName("ClientId")]
        public Guid ClientId { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [JsonPropertyName("Description")]
        public string Description { get; set; }

    }
}