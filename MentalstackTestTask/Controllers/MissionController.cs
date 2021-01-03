using AutoMapper;
using MentalstackTestTask.Common;
using MentalstackTestTask.Domain.DTO;
using MentalstackTestTask.Services.Services.Mission;
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
    [Authorize]
    public class MissionController : ControllerBase
    {
        private ILogger<MissionController> _logger;
        private MissionService _missionService;
        public MissionController(ILogger<MissionController> logger, MissionService missionService)
        {
            _logger = logger;
            _missionService = missionService;
        }

        [HttpPost("[action]")]
        public async Task<MethodResult<bool>> Save(MissionDTO task)
        {
            try
            {
                var result = await _missionService.Save(task);
                return result.ToSuccessMethodResult();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ex.ToErrorMethodResult<bool>();
            }
        }

        [HttpGet("[action]")]
        public async Task<MethodResult<List<MissionDTO>>> GetAll()
        {
            try
            {
                var result = await _missionService.GetAll();
                return result.ToSuccessMethodResult();
            }
            catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return ex.ToErrorMethodResult<List<MissionDTO>>();
            }
        }
    }
}
