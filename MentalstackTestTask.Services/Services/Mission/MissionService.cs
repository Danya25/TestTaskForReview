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
        public async Task<List<MissionDTO>> GetAllById(int id)
        {
            var result = await _context.Missions.Where(t=> t.UserId == id).ToListAsync();
            var missionsDto = _mapper.Map<List<MissionDTO>>(result);
            return missionsDto;
        }

        public async Task<bool> Save(MissionDTO task, int userId)
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

    }
}
