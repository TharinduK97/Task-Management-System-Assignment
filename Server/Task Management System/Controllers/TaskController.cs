using Microsoft.AspNetCore.Mvc;
using Task_Management_System.Models;
using Task_Management_System.Models.Dtos;
using Task_Management_System.Services;

namespace Task_Management_System.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {   
        private readonly ITaskService _taskService;
        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<ServiceResponse<List<GetTaskDto>>>> GetAllTask()
        {
            return Ok(await _taskService.GetAllTask());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServiceResponse<GetTaskDto>>> GetSingleTask(Guid id)
        {
            return Ok(await _taskService.GetTaskById(id));
        }

        [HttpPost]
        public async Task<ActionResult<ServiceResponse<List<GetTaskDto>>>> AddTask(AddTaskDto newTask )
        {
            return Ok(await _taskService.AddTask(newTask));
        }

        [HttpPut]
        public async Task<ActionResult<ServiceResponse<List<GetTaskDto>>>> UpdateCharacter(Models.UserTask updatedTask)
        {
            var response = await _taskService.UpdateTask(updatedTask);
            if (response.Data is null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ServiceResponse<List<GetTaskDto>>>> DeleteTask(Guid id)
        {
            var response = await _taskService.DeleteTask(id);
            if (response.Data is null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }
    }
}
