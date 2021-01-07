using MentalstackTestTask.Common;
using MentalstackTestTask.Domain.DTO;
using MentalstackTestTask.Services.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MentalstackTestTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthService _authService;
        private ILogger<AuthController> _logger;
        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }
        /// <summary>
        /// Registration an user
        /// </summary>
        /// Sample request: 
        /// POST /registration
        /// {
        ///     "Name": "Vasya",
        ///     "Password": "kek123",
        /// }
        /// <param name="user"></param>
        /// <returns>A newly created TodoItem</returns>
        [ProducesResponseType(typeof(MethodResult<string>), 200)]
        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<MethodResult<string>> Registration(UserDTO user)
        {
            try
            {
                var result = await _authService.RegistrationUserAsync(user);
                if (result)
                    return "Registration succeeded".ToSuccessMethodResult();
                else
                    return "An error occurred during registration.".ToErrorMethodResult<string>();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ex.ToErrorMethodResult<string>();
            }
        }
        /// <summary>
        /// Login an user
        /// </summary>
        /// Sample request: 
        /// POST /login
        /// {
        ///     "Name": "Vasya",
        ///     "Password": "kek123",
        ///     "RePassword": "kek123"
        /// }
        /// <param name="user"></param>
        /// <returns>JWT Token</returns>
        [ProducesResponseType(typeof(MethodResult<string>), 200)]
        [AllowAnonymous]
        [HttpPost("[action]")]
        public async Task<MethodResult<UserInfoDTO>> Login(UserDTO user)
        {
            try
            {
                var userInfo = await _authService.LoginUserAsync(user);
                return userInfo.ToSuccessMethodResult();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ex.ToErrorMethodResult<UserInfoDTO>();
            }

        }
    }
}
