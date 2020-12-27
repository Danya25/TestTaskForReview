using MentalstackTestTask.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace MentalstackTestTask.DAL
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Mission> Missions { get; set; }
    }
}
