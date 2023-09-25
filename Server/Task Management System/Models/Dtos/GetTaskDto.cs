using System.ComponentModel.DataAnnotations;

namespace Task_Management_System.Models.Dtos
{
    public class GetTaskDto
    {
        public Guid Id { get; set; }
        
        public string? TaskName { get; set; }
        public string? Description { get; set; }

        public DateTime? CreatedDate { get; set; }
        
        public PriorityType? Priority { get; set; }
        
        public StatusType? Status { get; set; }
        public DateTime? DeadLine { get; set; }
    }
}
