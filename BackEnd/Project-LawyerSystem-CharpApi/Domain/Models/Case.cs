
namespace Project_LawyerSystem_CharpApi.Domain.Models
{
    public class Case
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public Lawyer Lawyer { get; set; }
        public string Description { get; set; }

        //public ClientCertificateOption Client { get; set;}
    }
}