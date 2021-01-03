using MentalstackTestTask.Common.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace MentalstackTestTask.Domain.DTO
{
    public class MissionDTO
    {
        [Required(ErrorMessage = "Title is required!")]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required(ErrorMessage = "Priority is required!")]
        public MissionPriority Priority { get; set; }

        [Required(ErrorMessage = "EndDate is required!")]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "EndTime is required!")]
        public DateTime EndTime { get; set; }
    }
}
