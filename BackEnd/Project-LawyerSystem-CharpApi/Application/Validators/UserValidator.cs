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
            .NotNull().WithMessage("Phone number must not be null.")
            .Length(10).WithMessage("Phone number must be 10 numbers.");

        RuleFor(u => u.LawyerOAB)
            .NotEmpty().WithMessage("LawyerOAB Number is required")
            .NotNull().NotNull().WithMessage("LawyerOAB must not be null.")
            .Length(7, 8).WithMessage("LawyerOAB number must be between 7 and 8 characters.");

        RuleFor(u => u.Role)
            .NotEmpty().WithMessage("Role is required")
            .NotNull().WithMessage("Role must not be null.");

        RuleFor(u => u.Password)
            .NotNull().WithMessage("Password must not be null.")
            .NotEmpty().WithMessage("Password is required");



    }
}
