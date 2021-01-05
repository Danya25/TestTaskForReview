using AutoMapper;
using MentalstackTestTask.DAL.Models;
using MentalstackTestTask.Domain.DTO;

namespace MentalstackTestTask.Common.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserDTO, User>();
            CreateMap<User, UserDTO>();

            CreateMap<MissionDTO, Mission>();
            CreateMap<Mission, MissionDTO>();
        }
    }
}
