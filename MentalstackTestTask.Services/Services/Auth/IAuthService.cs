using MentalstackTestTask.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MentalstackTestTask.Services.Services
{
   public interface IAuthService
    {
        Task<bool> RegistrationUserAsync(UserDTO user);

        Task<UserInfoDTO> LoginUserAsync(UserDTO user);
    }
}
