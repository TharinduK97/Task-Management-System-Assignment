using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using Task_Management_System.Models;

namespace Task_Management_System.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
       
        public DbSet<UserTask> UserTasks { get; set; }
    }
}
