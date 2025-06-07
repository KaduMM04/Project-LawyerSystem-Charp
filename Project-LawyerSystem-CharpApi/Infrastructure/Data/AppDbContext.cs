using Microsoft.EntityFrameworkCore;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Infrastructure.Data;

/// <summary>
/// Database class.
/// </summary>
public class AppDbContext : DbContext
{
    /// <summary>
    /// Initializes a new instance of the <see cref="AppDbContext"/> class.
    /// AppDbContext constructor.
    /// </summary>
    /// <param name="options">The options to configure the database context.</param>
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    /// <summary>
    /// Gets or sets the Users table.
    /// </summary>
    public DbSet<User> Users { get; set; }

    /// <summary>
    /// Gets or sets the Lawyers table.
    /// </summary>
    public DbSet<Lawyer> Lawyers { get; set; }

    /// <summary>
    /// Gets or sets the Address table.
    /// </summary>
    public DbSet<Address> Address { get; set; }

    /// <summary>
    /// Gets or sets the Clients table.
    /// </summary>
    public DbSet<Client> Clients { get; set; }
    
    public DbSet<Case> Cases { get; set; }

    public DbSet<CaseEvent> CaseEvents { get; set; }

    /// <summary>
    /// Configures the model for the database context.
    /// </summary>
    /// <param name="modelBuilder">The builder used to configure the database model.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Users table configuration
        modelBuilder.Entity<User>()
            .ToTable("Users")
            .HasKey(u => u.Id);

        modelBuilder.Entity<User>()
            .Property(u => u.Name)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<User>()
            .Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(100);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<User>()
            .Property(u => u.Phone)
            .IsRequired()
            .HasMaxLength(15);

        modelBuilder.Entity<User>()
            .Property(u => u.Role)
            .HasConversion<string>()
            .IsRequired();

        modelBuilder.Entity<User>()
            .Property(u => u.LawyerOAB)
            .IsRequired(false)
            .HasMaxLength(8);

        modelBuilder.Entity<User>()
            .Property(u => u.Password)
            .IsRequired()
            .HasMaxLength(256);

        modelBuilder.Entity<User>()
            .Property(u => u.Salt)
            .IsRequired()
            .HasMaxLength(256);

        modelBuilder.Entity<User>()
        .Property(u => u.ClientId)
        .IsRequired(false);

        //------------------------------------------------------//
        // Lawyers table configuration
        modelBuilder.Entity<Lawyer>()
            .ToTable("Lawyers")
            .HasKey(l => l.OAB);

        modelBuilder.Entity<Lawyer>()
            .Property(l => l.AreaOfExpertise)
            .HasMaxLength(30)
            .IsRequired();

        //------------------------------------------------------//
        // User Conection with Lawyer
        modelBuilder.Entity<User>()
            .HasOne(u => u.Lawyer)
            .WithOne(l => l.User)
            .HasForeignKey<User>(l => l.LawyerOAB)
            .HasPrincipalKey<Lawyer>(l => l.OAB)
            .IsRequired(false)
            .OnDelete(DeleteBehavior.Cascade);

        //------------------------------------------------------//
        // Address table configuration
        modelBuilder.Entity<Address>()
            .ToTable("Address")
            .HasKey(a => a.Id);

        modelBuilder.Entity<Address>()
            .Property(a => a.Street)
            .HasMaxLength(255)
            .IsRequired();

        modelBuilder.Entity<Address>()
            .Property(a => a.Number)
            .HasMaxLength(10)
            .IsRequired();

        modelBuilder.Entity<Address>()
            .Property(a => a.Complement)
            .HasMaxLength(255);

        modelBuilder.Entity<Address>()
            .Property(a => a.Neighborhood)
            .HasMaxLength(255)
            .IsRequired();

        modelBuilder.Entity<Address>()
            .Property(a => a.City)
            .HasMaxLength(255)
            .IsRequired();

        modelBuilder.Entity<Address>()
            .Property(a => a.State)
            .HasMaxLength(2)
            .IsRequired();

        modelBuilder.Entity<Address>()
            .Property(a => a.ZipCode)
            .HasMaxLength(9)
            .IsRequired();

        //--------------------------------------
        // Conection User to Address
        modelBuilder.Entity<User>()
            .HasOne(u => u.Address)
            .WithOne(a => a.User)
            .HasForeignKey<User>(a => a.AddressId)
            .IsRequired()
            .OnDelete(DeleteBehavior.Cascade);

        // Client DataBase
        modelBuilder.Entity<Client>()
            .ToTable("Clients")
            .HasKey(c => c.Id);

        modelBuilder.Entity<Client>()
   
       .Property(c => c.Id)
       .ValueGeneratedOnAdd();

        modelBuilder.Entity<Client>()
            .Property(c => c.Profission)
            .IsRequired(false)
            .HasMaxLength(255);

        modelBuilder.Entity<Client>()
            .Property(c => c.CompanyName)
            .IsRequired(false)
            .HasMaxLength(255);

        modelBuilder.Entity<Client>()
        .Property(c => c.MaritalStatus)
        .IsRequired()
        .HasMaxLength(255);

        modelBuilder.Entity<Client>()
            .Property(c => c.Representative)
            .IsRequired(false)
            .HasMaxLength(255);

        // Conexion User to Client
        modelBuilder.Entity<User>()
         .HasOne(u => u.Client)
         .WithOne(c => c.User)
         .HasForeignKey<User>(u => u.ClientId)
         .IsRequired(false)
         .OnDelete(DeleteBehavior.Cascade);


        // Case table configuration
        modelBuilder.Entity<Case>()
            .ToTable("Cases")
            .HasKey(c => c.Id);
        modelBuilder.Entity<Case>()
            .Property(c => c.Type)
            .HasMaxLength(20)
            .IsRequired();
        modelBuilder.Entity<Case>()
            .Property(c => c.Description)
            .HasMaxLength(800)
            .IsRequired();

        modelBuilder.Entity<Case>()
            .Property(c => c.Situation)
            .HasConversion<string>()
            .IsRequired();

        // Relationship with Lawyer by OAB
        modelBuilder.Entity<Case>()
            .HasOne(c => c.Lawyer)
            .WithMany()
            .HasForeignKey(c => c.LawyerOAB)
            .HasPrincipalKey(l => l.OAB);

        // Relationship with Client by id
        modelBuilder.Entity<Case>()
            .HasOne(c => c.Client)
            .WithMany()
            .HasForeignKey(c => c.ClientId)
            .HasPrincipalKey(c => c.Id);

        // Case Event
        modelBuilder.Entity<CaseEvent>()
            .ToTable("CaseEvents")
            .HasKey(ce => ce.Id);

        modelBuilder.Entity<CaseEvent>()
            .Property(ce => ce.Id)
            .HasMaxLength(50)
            .IsRequired();
        modelBuilder.Entity<CaseEvent>()
            .Property(ce => ce.EventDate)
            .IsRequired();

        modelBuilder.Entity<CaseEvent>()
            .Property(ce => ce.Description)
            .HasMaxLength(800)
            .IsRequired();

        

        modelBuilder.Entity<CaseEvent>()
            .Property(ce => ce.EventType)
            .HasConversion<string>()
            .IsRequired();

        modelBuilder.Entity<CaseEvent>()
            .Property(ce => ce.EventStatus)
            .HasConversion<string>()
            .IsRequired();

        modelBuilder.Entity<CaseEvent>()
            .HasOne(ce => ce.Case)
            .WithMany(c => c.CaseEvents)
            .HasForeignKey(ce => ce.CaseId)
            .OnDelete(DeleteBehavior.Cascade);

    }
}
