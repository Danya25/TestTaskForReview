using MentalstackTestTask.Common.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MentalstackTestTask.Domain.DTO
{
    public class MissionDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string EndDate { get; set; }
        public MissionPriority Priority { get; set; }
    }
}
