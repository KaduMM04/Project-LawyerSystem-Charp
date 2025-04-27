using FluentValidation;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;

namespace Project_LawyerSystem_CharpApi.Application.Validators;

public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
{
    public UserCreateDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotNull().WithMessage("Email must not be null.")
            .NotEmpty().WithMessage("Email must not be empty.")
            .EmailAddress().WithMessage("Invalid email format.");

        RuleFor(x => x.Name)
            .NotNull().WithMessage("Name must not be null.")
            .NotEmpty().WithMessage("Name is required")
            .MaximumLength(100).WithMessage("Name must not exceed 100 characters.");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Phone Number is required")
            .Length(10).WithMessage("Phone number must be 10 numbers.");
    }
}
