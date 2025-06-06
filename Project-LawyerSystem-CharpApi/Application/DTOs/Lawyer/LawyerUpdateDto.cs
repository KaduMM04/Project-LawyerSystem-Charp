﻿using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;

public class LawyerUpdateDto
{
    /// <summary>
    /// Gets or sets the area of expertise of the lawyer.
    /// </summary>
    [JsonPropertyName("AreaOfExpertise")]
    [StringLength(20, ErrorMessage = "Area Of Expertise must be up to 11")]
    public string? AreaOfExpertise { get; set; }
}
