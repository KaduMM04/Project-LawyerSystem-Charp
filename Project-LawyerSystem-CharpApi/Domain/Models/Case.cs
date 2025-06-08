using Project_LawyerSystem_CharpApi.Domain.Enums;

namespace Project_LawyerSystem_CharpApi.Domain.Models;

public class Case
{
    public Guid Id { get; set; }

    public int CaseNumber { get; set; }

    public string Description { get; set; }

    public TypeCases TypeCases { get; set; }

    public Status Status { get; set; }

    public string LawyerOAB;

    public Lawyer Lawyer { get; set; }

    public Guid ClientId { get; set; }

    public Client Client { get; set; }

    public ICollection<CaseEvent> CaseEvents { get; set; }

    public DateTime CreateAt { get; set; }

    public DateTime UpdateAt { get; set; }
}