using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Project_LawyerSystem_CharpApi.Domain.Models
{
    public class Client
    {
        public Guid? Id { get; set; } 

        public string? Profission { get; set; }

        public string? Representative { get; set; }

        public string marital_status { get; set; } = string.Empty;

        public string? company_name { get; set; }

        public User? User { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;






        

        
    }
}