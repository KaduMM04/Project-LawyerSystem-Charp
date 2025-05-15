using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Project_LawyerSystem_CharpApi.Application.DTOs.Case
{
    public class CaseDto
    {
         public string Type { get; set; }
        public string OABLawyer { get; set; }
        public string Description { get; set; }

    }
}