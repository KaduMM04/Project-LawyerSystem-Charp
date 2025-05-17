using Project_LawyerSystem_CharpApi.Domain.Models;


namespace Project_LawyerSystem_CharpApi.Domain.Interfaces
{
    public interface ILawyerRepository
    {
        // Obter um advogado pelo número da OAB
        Task<Lawyer> GetLawyerByOABAsync(string oab);

        // Obter todos os advogados
        Task<IEnumerable<Lawyer>> GetAllLawyersAsync();

        // Adicionar um novo advogado
        Task AddLawyerAsync(Lawyer lawyer);
    }
}
