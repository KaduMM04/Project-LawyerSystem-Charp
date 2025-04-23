using FluentValidation;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;

namespace Project_LawyerSystem_CharpApi.Application.Validators;

public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
{
    public UserCreateDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Invalid email format.");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required")
            .MaximumLength(100).WithMessage("Name must not exceed 100 characters.");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Phone Number is required")
            .Length(10, 15).WithMessage("Phone number must be between 10 and 15 digits.");
    }
}
