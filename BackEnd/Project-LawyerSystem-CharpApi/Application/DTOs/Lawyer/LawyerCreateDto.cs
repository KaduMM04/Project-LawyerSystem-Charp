using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
public class LawyerCreateDto
{
    /// <summary>
    /// Gets or sets the OAB (Order of Attorneys of Brazil) number of the lawyer.
    /// </summary>
    [NotNull]
    [Required]
    [JsonPropertyName("OAB")]
    [StringLength(20, ErrorMessage = "OAB must be up to 20 characters")]
    public string OAB { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the area of expertise of the lawyer.
    /// </summary>
    [NotNull]
    [JsonPropertyName("AreaOfExpertise")]
    [Required(ErrorMessage = "Area Of Expertise is required")]
    [StringLength(20, ErrorMessage = "Area Of Expertise must be up to 11")]
    public string AreaOfExpertise { get; set; } = string.Empty;
}
