using AutoMapper;
using MentalstackTestTask.DAL;
using MentalstackTestTask.Domain.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MentalstackTestTask.Services.Services.Mission
{
    public class MissionService : IMissionService
    {
        private DatabaseContext _context;
        private IMapper _mapper;
        public MissionService(DatabaseContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<MissionDTO>> GetCurrentTasksByUserId(int id)
        {
            var dateNow = DateTime.Now;
            var shortDate = new DateTime(dateNow.Year, dateNow.Month, dateNow.Day);

            var missions = await _context.Missions.Where(t=> t.UserId == id && t.EndDate >= shortDate).ToListAsync();
            var missionsDto = _mapper.Map<List<MissionDTO>>(missions);

            return missionsDto;
        }

        public async Task<bool> SaveTask(MissionDTO task, int userId)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    var mission = _mapper.Map<DAL.Models.Mission>(task);

                    mission.UserId = userId;
                    _context.Missions.Add(mission);
                    _context.SaveChanges();
                    await transaction.CommitAsync();

                    return true;
                }
                catch
                {
                    await transaction.RollbackAsync();

                    return false;
                }
            }
        }
        public async Task<string> SaveDescriptionTask(TaskDescriptionInfoDTO taskInfo, int userId)
        {
            var task = await _context.Missions.Where(t => t.Id == taskInfo.TaskId).FirstOrDefaultAsync();

            if (task is null)
                throw new Exception("Task were not found!");
            if (task.UserId != userId)
                throw new Exception("The task is not yours!");

            task.Description = taskInfo.Text;

            await _context.SaveChangesAsync();
            return "Success!";
        }
    }
}
