using DailyDietAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace DailyDietAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Food> Foods => Set<Food>();
		public DbSet<User> Users => Set<User>();
	}
}
