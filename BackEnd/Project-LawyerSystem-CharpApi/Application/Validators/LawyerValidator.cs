using FluentValidation;
using Project_LawyerSystem_CharpApi.Application.DTOs.Lawyer;

namespace Project_LawyerSystem_CharpApi.Application.Validators
{
    public class LawyerCreateDtoValidator : AbstractValidator<LawyerCreateDto>
    {
        public LawyerCreateDtoValidator()
        {
            // Valida a OAB
            RuleFor(x => x.OAB)
                .NotNull().WithMessage("OAB must not be null.")
                .NotEmpty().WithMessage("OAB must not be empty.")
                .Length(7, 8).WithMessage("OAB must be exactly 8 characters long.");

            // Valida a Área de Especialização
            RuleFor(x => x.AreaOfExpertise)
                .NotNull().WithMessage("Area of Expertise must not be null.")
                .NotEmpty().WithMessage("Area of Expertise must not be empty.");
        }
    }
}
