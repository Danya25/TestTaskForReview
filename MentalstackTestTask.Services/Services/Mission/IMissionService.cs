using MentalstackTestTask.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MentalstackTestTask.Services.Services.Mission
{
    public interface IMissionService
    {
        public Task<bool> Save(MissionDTO task, int id);
        public Task<List<MissionDTO>> GetAllById(int id);
    }
}
