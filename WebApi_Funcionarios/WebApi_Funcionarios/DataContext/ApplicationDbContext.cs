using Microsoft.EntityFrameworkCore;
using WebApi_Funcionarios.Models;

namespace WebApi_Funcionarios.DataContext
{
    public class ApplicationDbContext : DbContext
    {

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<FuncionarioModel> Funcionarios { get; set; }
    }
}
