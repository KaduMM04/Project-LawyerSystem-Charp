using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Domain.Interfaces
{
    /// <summary>
    /// Interface for managing lawyer-related data operations.
    /// </summary>
    public interface ILawyerRepository
    {
        /// <summary>
        /// Retrieves a lawyer by their OAB (Brazilian Bar Association) number.
        /// </summary>
        /// <param name="oab">The OAB number of the lawyer.</param>
        /// <returns>A task that represents the asynchronous operation. The task result contains the lawyer with the specified OAB number.</returns>
        Task<Lawyer> GetLawyerByOABAsync(string oab);

        /// <summary>
        /// Retrieves all lawyers.
        /// </summary>
        /// <returns>A task that represents the asynchronous operation. The task result contains a collection of all lawyers.</returns>
        Task<IEnumerable<Lawyer>> GetAllLawyersAsync();

        /// <summary>
        /// Adds a new lawyer to the repository.
        /// </summary>
        /// <param name="lawyer">The lawyer to add.</param>
        /// <returns>A task that represents the asynchronous operation.</returns>
        Task AddLawyerAsync(Lawyer lawyer);
    }
}
