using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Project_LawyerSystem_CharpApi.Domain.Enums;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Client;

/// <summary>
/// Represents a Data Transfer Object (DTO) for a client.
/// </summary>
public class ClientDto
{
    /// <summary>
    /// Gets or sets the profession of the client.
    /// </summary>
    [JsonPropertyName("Profission")]
    [StringLength(250, ErrorMessage = "Profission must be up to 200 characters")]
    public string? Profission { get; set; }

    /// <summary>
    /// Gets or sets the representative of the client.
    /// </summary>
    [JsonPropertyName("Representative")]
    [StringLength(250, ErrorMessage = " Representative must be up to 200 characters")]
    public string? Representative { get; set; }

    /// <summary>
    /// Gets or sets the marital status of the client.
    /// </summary>
    [JsonPropertyName("MaritalStatus")]
    [StringLength(250, ErrorMessage = "Marital status must be up to 200 characters")]
    public string? MaritalStatus { get; set; }

    /// <summary>
    /// Gets or sets the company name associated with the client.
    /// </summary>
    [JsonPropertyName("CompanyName")]
    [StringLength(250, ErrorMessage = "Company Name status must be up to 200 characters")]
    public string? CompanyName { get; set; }
}
