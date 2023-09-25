using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Task_Management_System.Data;
using Task_Management_System.Models;
using Task_Management_System.Models.Dtos;

namespace Task_Management_System.Services
{
    public class TaskService : ITaskService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public TaskService(IMapper mapper, DataContext context) {

            _context = context;
            _mapper = mapper;
        }    
        public async Task<ServiceResponse<List<GetTaskDto>>> AddTask(AddTaskDto newTask)
        {
            var serviceResponse = new ServiceResponse<List<GetTaskDto>>();
            try
            {
                var userTask = _mapper.Map<UserTask>(newTask);
                userTask.CreatedDate = DateTime.Now;
                _context.UserTasks.Add(userTask);
                await _context.SaveChangesAsync();

                serviceResponse.Data = await _context.UserTasks.Select(c => _mapper.Map<GetTaskDto>(c))
                                        .ToListAsync();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }
            
            return serviceResponse;

        }

        public async Task<ServiceResponse<List<GetTaskDto>>> DeleteTask(Guid id)
        {
            var serviceResponse = new ServiceResponse<List<GetTaskDto>>();

            try
            {
                var userTask = await _context.UserTasks
                    .FirstOrDefaultAsync(c => c.Id == id);
                if (userTask is null)
                    throw new Exception($"Task with Id '{id}' not found.");

                _context.UserTasks.Remove(userTask);

                await _context.SaveChangesAsync();

                var updatedUsertasks = await _context.UserTasks.ToListAsync();
                serviceResponse.Data = updatedUsertasks.Select(c => _mapper.Map<GetTaskDto>(c)).ToList();
                
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<GetTaskDto>>> GetAllTask()
        {
            var serviceResponse = new ServiceResponse<List<GetTaskDto>>();
            try
            {
                var usertasks = await _context.UserTasks.ToListAsync();
                serviceResponse.Data = usertasks.Select(c => _mapper.Map<GetTaskDto>(c)).ToList();
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;    
                serviceResponse.Message = ex.Message;
            }
           
            return serviceResponse;
        }

        public async Task<ServiceResponse<GetTaskDto>> GetTaskById(Guid id)
        {
            var serviceResponse = new ServiceResponse<GetTaskDto>();
            try
            {
                var userTasks = await _context.UserTasks
                            .FirstOrDefaultAsync(c => c.Id == id);
                serviceResponse.Data = _mapper.Map<GetTaskDto>(userTasks);
            }
            catch(Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<GetTaskDto>> UpdateTask(UserTask updatedTask)
        {
            var serviceResponse = new ServiceResponse<GetTaskDto>();

            try
            {
                var task = await _context.UserTasks
                        .FirstOrDefaultAsync(c => c.Id == updatedTask.Id);
                if (task is null )
                    throw new Exception($"Task with Id '{updatedTask.Id}' not found.");

                task.TaskName = updatedTask.TaskName;
                task.Priority = updatedTask.Priority;
                task.Status = updatedTask.Status;
                task.Description = updatedTask.Description;
                task.DeadLine = updatedTask.DeadLine;


                await _context.SaveChangesAsync();
                serviceResponse.Data = _mapper.Map<GetTaskDto>(task);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
            }

            return serviceResponse;
        }
    }
}
