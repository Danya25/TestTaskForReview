using MentalstackTestTask.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MentalstackTestTask.DAL.Models
{
    public class Mission
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime EndTime { get; set; }
        public MissionPriority Priority { get; set; }
    }
}
