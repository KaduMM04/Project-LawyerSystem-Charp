using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Domain.Enums;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Mappers;

/// <summary>  
/// Profile for mapping between User domain model and User DTOs.  
/// </summary>  
public class UserProfile : Profile
{
    /// <summary>  
    /// Initializes a new instance of the <see cref="UserProfile"/> class.  
    /// Configures mappings between User domain model and User DTOs.  
    /// </summary>  
    public UserProfile()
    {
        // Maps User domain model to UserReadDto.  
        CreateMap<User, UserReadDto>();

        CreateMap<UserReadDto, User>();
         
        // Maps UserCreateDto to User domain model.  
        CreateMap<UserCreateDto, User>();

        // Maps UserUpdateDto to User domain model.  
        CreateMap<UserUpdateDto, User>();

        // Maps UserCreateDto to UserReadDto.  
        CreateMap<UserCreateDto, UserReadDto>();
    }
}
