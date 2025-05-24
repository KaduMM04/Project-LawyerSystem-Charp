using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project_LawyerSystem_CharpApi.Domain.Models;

/// <summary>
/// Represents a client in the lawyer system.
/// </summary>
public class Client
{
    /// <summary>
    /// Gets or sets the unique identifier for the client.
    /// </summary>
    public Guid? Id { get; set; }

    /// <summary>
    /// Gets or sets the profession of the client.
    /// </summary>
    public string? Profission { get; set; }

    /// <summary>
    /// Gets or sets the representative of the client.
    /// </summary>
    public string? Representative { get; set; }

    /// <summary>
    /// Gets or sets the marital status of the client.
    /// </summary>
    [Column("marital_status")]
    public string MaritalStatus { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the company name associated with the client.
    /// </summary>
    [Column("company_name")]
    public string? CompanyName { get; set; }

    /// <summary>
    /// Gets or sets the user associated with the client.
    /// </summary>
    public User? User { get; set; }

    /// <summary>
    /// Gets or sets the date and time when the client was created.
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the date and time when the client was last updated.
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
