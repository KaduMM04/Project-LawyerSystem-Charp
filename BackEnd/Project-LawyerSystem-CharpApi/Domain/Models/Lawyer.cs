using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_LawyerSystem_CharpApi.Domain.Models;
public class Lawyer
{
    /// <summary>
    /// Gets or sets the OAB (Order of Attorneys of Brazil) number of the lawyer.
    /// </summary>
    public string OAB { get; set; } = string.Empty;

    public User? User { get; set; }

    /// <summary>
    /// Gets or sets the area of expertise of the lawyer.
    /// </summary>
    public string AreaOfExpertise { get; set; } = string.Empty;

    /// <summary>
    /// Gets or sets the unique identifier for the lawyer. 
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Gets or sets the date and time when the lawyer was last updated.
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

}