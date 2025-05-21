using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Project_LawyerSystem_CharpApi.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Client;
public class ClientDto
{

    [Required(ErrorMessage = "Profission is required")]
    [JsonPropertyName("Profission")]
    [StringLength(250, ErrorMessage = "Profission must be up to 200 characters")]
    public string? Profission { get; set; }

    [JsonPropertyName("Representative")]
    [Required(ErrorMessage = "Representative is required")]
    [StringLength(250, ErrorMessage = " Representative must be up to 200 characters")]

    public string? Representative { get; set; }

    [NotNull]
    [JsonPropertyName("MaritalStatus")]
    [Required(ErrorMessage = "Marital status")]
    [StringLength(250, ErrorMessage = "Marital status must be up to 200 characters")]
    public string marital_status { get; set; } = string.Empty;

    [JsonPropertyName("CompanyName")]
    [Required(ErrorMessage = "Company Name")]
    [StringLength(250, ErrorMessage = "Company Name status must be up to 200 characters")]
    public string? company_name { get; set; }
}
