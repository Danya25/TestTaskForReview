using AutoMapper;
using MentalstackTestTask.DAL.Models;
using MentalstackTestTask.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;

namespace MentalstackTestTask.Common.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserDTO, User>()
                .ForMember(t => t.Email, map => map.MapFrom(src => src.Email))
                .ForMember(t => t.Password, map => map.MapFrom(src => src.Password));
            CreateMap<User, UserDTO>()
                .ForMember(t => t.Email, map => map.MapFrom(src => src.Email))
                .ForMember(t => t.Password, map => map.MapFrom(src => src.Password));
        }
    }
}
