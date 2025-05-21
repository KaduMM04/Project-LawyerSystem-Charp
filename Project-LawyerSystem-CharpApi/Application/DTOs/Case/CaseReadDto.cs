using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Case
{
    public class CaseReadDto
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

        [Required(ErrorMessage = "Client name is required")]
        [JsonPropertyName("ClientName")]
        public string ClientName { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [JsonPropertyName("Description")]
        public string Description { get; set; }
    }
}