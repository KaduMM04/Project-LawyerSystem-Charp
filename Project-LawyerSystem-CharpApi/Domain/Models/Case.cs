using Project_LawyerSystem_CharpApi.Domain.Enums;

namespace Project_LawyerSystem_CharpApi.Domain.Models;

public class Case
{
    public Guid Id { get; set; }

    public string Type { get; set; }

    public string LawyerOAB;

    public Situation Situation { get; set; }

    public Lawyer Lawyer { get; set; }

    public ICollection<CaseEvent> CaseEvents { get; set; } = new List<CaseEvent>();

    public Guid ClientId { get; set; }

    public Client Client { get; set; }

    public string Description { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }

}