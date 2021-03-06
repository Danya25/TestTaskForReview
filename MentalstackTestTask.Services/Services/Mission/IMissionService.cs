using MentalstackTestTask.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace MentalstackTestTask.Services.Services.Mission
{
    public interface IMissionService
    {
        public Task<bool> SaveTask(MissionDTO task, int id);
        public Task<bool> DeleteTask(MissionDTO task, int id);

        public Task<List<MissionDTO>> GetCurrentTasksByUserId(int id);
        public Task<string> SaveDescriptionTask(TaskDescriptionInfoDTO taskInfo, int userId);
    }
}
