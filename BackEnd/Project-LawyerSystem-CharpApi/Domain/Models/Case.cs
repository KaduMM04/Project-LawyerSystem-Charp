
namespace Project_LawyerSystem_CharpApi.Domain.Models
{
    public class Case
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Type { get; set; }

        public string LawyerOAB { get; set; }
        public Lawyer Lawyer { get; set; }
        public string Description { get; set; }

        //public Client Client { get; set;}
    }
}