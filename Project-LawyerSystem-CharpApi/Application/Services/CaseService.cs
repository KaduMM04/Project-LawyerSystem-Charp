using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Project_LawyerSystem_CharpApi.Application.DTOs.Address;
using Project_LawyerSystem_CharpApi.Application.DTOs.Case;
using Project_LawyerSystem_CharpApi.Domain.Interfaces;
using Project_LawyerSystem_CharpApi.Domain.Models;

namespace Project_LawyerSystem_CharpApi.Application.Services
{
    public class CaseService
    {
        private readonly ILawyerRepository _lawyerRepository;
        private readonly IClientRepository _clientRepository;
        private readonly ICaseRepository _caseRepository;
        private readonly IMapper _mapper;

        public CaseService(ICaseRepository caseRepository, ILawyerRepository lawyerRepository, IClientRepository clientRepository, IMapper mapper)
        {
            _caseRepository = caseRepository;
            _lawyerRepository = lawyerRepository;
            _clientRepository = clientRepository;
            _mapper = mapper;
        } 

        public async Task AddCase(CaseCreateDto caseDto) 
        {
            if (caseDto == null) {
                throw new Exception("Case must not be null");
            }

            var lawyer = await _lawyerRepository.GetLawyerByOABAsync(caseDto.LawyerOAB);
            if (lawyer == null) throw new Exception("Lawyer not found");

            var client = await _clientRepository.GetClientById(caseDto.ClientId);
            if (client == null) throw new Exception("Client not found");

            var newCase = _mapper.Map<Case>(caseDto);
            newCase.LawyerOAB = lawyer.OAB;
            await _caseRepository.AddCaseAsync(newCase);
        }

        public async Task<IEnumerable<CaseReadDto>> GetAllCases()
        {
            var cases = await _caseRepository.GetAllCases();
            return _mapper.Map<IEnumerable<CaseReadDto>>(cases);
        }
    }
}