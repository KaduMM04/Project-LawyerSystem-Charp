using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;

    public class LawyerCreateDto
    {
        /// <summary>
        /// Gets or sets the OAB (Order of Attorneys of Brazil) number of the lawyer.
        /// </summary>
        public string OAB { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the area of expertise of the lawyer.
        /// </summary>
        public string AreaOfExpertise { get; set; } = string.Empty;
        
    }
