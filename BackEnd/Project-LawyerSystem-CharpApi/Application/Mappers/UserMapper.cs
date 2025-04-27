using AutoMapper;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;
using Project_LawyerSystem_CharpApi.Domain.Models;
namespace Project_LawyerSystem_CharpApi.Application.Mappers;

public class UserProfile : Profile
{
   UserProfile()
    {
        CreateMap<User, UserReadDto>();
        CreateMap<UserCreateDto, User>();
        CreateMap<UserUpdateDto, User>();
        CreateMap<UserCreateDto, UserReadDto>();
    }

}
