using FluentValidation;
using Project_LawyerSystem_CharpApi.Application.DTOs.User;

namespace Project_LawyerSystem_CharpApi.Application.Validators;

public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
{
    public UserCreateDtoValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .EmailAddress()
            .WithMessage("Invalid email format.");
    }
}
