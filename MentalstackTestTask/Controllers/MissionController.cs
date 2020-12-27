using MentalstackTestTask.Common;
using MentalstackTestTask.Domain.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

/*        [HttpGet("[action]")]
        public async Task<MethodResult<List<MissionDTO>>> GetMissions()
        {

        }*/
    }
}
