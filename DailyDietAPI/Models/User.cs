using System.ComponentModel.DataAnnotations;

namespace DailyDietAPI.Models
{
    public class User
    {
		[Key]
		public string Username { get; set; } = null!;
		public byte[] PasswordHash { get; set; } = null!;
		public byte[] PasswordSalt { get; set; } = null!;
		public string RefreshToken { get; set; } = string.Empty;
		public DateTime TokenCreated { get; set; }
		public DateTime TokenExpires { get; set; }
	}
}
