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
            CreateMap<UserDTO, User>();
            CreateMap<User, UserDTO>();
        }
    }
}
