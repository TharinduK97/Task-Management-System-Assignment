using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Task_Management_System.Models
{
    public enum PriorityType
    {
        High,
        Medium,
        Low
    }
    public enum StatusType
    {
        Done,
        InProgress,
        ToDo

    }
   
    public class UserTask
    {
        
        public Guid Id { get; set; }
        [Required]
        [StringLength(250, MinimumLength = 2)]
        public string TaskName { get; set; }
        [Required]
        [StringLength(500, MinimumLength = 2)]
        public string Description { get; set; }
        [Required]
        public DateTime? CreatedDate { get; set; }
        [Required]
        public PriorityType Priority { get; set; }
        [Required]
        public StatusType Status { get; set; }
        [Required]
        public DateTime? DeadLine { get; set; }

    }
}
