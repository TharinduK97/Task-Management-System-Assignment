using Task_Management_System.Models;
using Task_Management_System.Models.Dtos;

namespace Task_Management_System.Services
{
    public interface ITaskService
    {
        Task<ServiceResponse<List<GetTaskDto>>> GetAllTask();
        Task<ServiceResponse<GetTaskDto>> GetTaskById(Guid id);
        Task<ServiceResponse<List<GetTaskDto>>> AddTask(AddTaskDto newTask);
        Task<ServiceResponse<GetTaskDto>> UpdateTask(Models.UserTask updatedTask);
        Task<ServiceResponse<List<GetTaskDto>>> DeleteTask(Guid id);
        
    }
}
