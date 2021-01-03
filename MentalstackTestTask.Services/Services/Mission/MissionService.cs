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
        public MissionService(DatabaseContext context)
        {
            _context = context;
        }
        public async Task<List<DAL.Models.Mission>> GetAll()
        {
            var result = await _context.Missions.AsQueryable().ToListAsync();
            return result;
        }

        public async Task<bool> Save(MissionDTO task)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var mission = _mapper.Map<DAL.Models.Mission>(task);
                _context.Missions.Add(mission);
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
