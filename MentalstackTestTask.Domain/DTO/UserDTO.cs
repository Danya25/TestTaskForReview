using System.ComponentModel.DataAnnotations;

namespace MentalstackTestTask.Domain.DTO
{
    public class UserDTO
    {
        [Required(ErrorMessage = "Email required")]
        [EmailAddress(ErrorMessage = "Email incorrect")]
        public string Email { get; set; }

        [RegularExpression("(?=.*[0-9])(?=.*[!@#$%^&*])(?=(?:.*[A-Z]){2,})[0-9a-zA-Z!@#$%^&*]{8,}", ErrorMessage = "Password does not fit the rules")]
        [Required(ErrorMessage = "Please enter your password")]
        public string Password { get; set; }

        [Compare("Password", ErrorMessage = "Passwords aren't equal")]
        [Required(ErrorMessage = "Password confirmation required")]
        public string RePassword { get; set; }
     }
}

