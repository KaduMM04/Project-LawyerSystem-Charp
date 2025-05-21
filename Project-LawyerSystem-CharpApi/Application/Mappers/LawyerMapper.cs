using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Mappers;

/// <summary>
/// Profile for mapping between Lawyer-related DTOs and domain models.
/// </summary>
public class LawyerProfile : Profile
{
    /// <summary>
    /// Initializes a new instance of the <see cref="LawyerProfile"/> class.
    /// Configures mappings between <see cref="LawyerCreateDto"/> and <see cref="Lawyer"/>.
    /// </summary>
    public LawyerProfile()
    {
        CreateMap<LawyerCreateDto, Lawyer>();
        CreateMap<Lawyer, LawyerCreateDto>();
    }
}
