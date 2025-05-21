    namespace Project_LawyerSystem_CharpApi.Application.DTOs.User;

    /// <summary>
    /// Represents the data transfer object for user login.
    /// </summary>
    public class UserLoginDto
    {
        /// <summary>
        /// Gets or sets the email address of the user.
        /// </summary>
        public string Email { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the password of the user.
        /// </summary>
        public string Password { get; set; } = string.Empty;
    }