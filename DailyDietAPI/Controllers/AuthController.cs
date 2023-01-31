using DailyDietAPI.Data;
using DailyDietAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace DailyDietAPI.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		//public static User user = new User();
		private readonly IConfiguration _configuration;
		private readonly IUserService _userService;
		private readonly DataContext _context;
		
		public AuthController(IConfiguration configuration, IUserService userService, DataContext context)
		{
			_configuration = configuration;
			_userService = userService;
			_context = context;
		}

		[HttpGet, Authorize]
		public ActionResult<object> GetMe()
		{
			var userName = _userService.GetMyName();
			return Ok(userName);
		}

		[HttpPost("register")]
		public async Task<ActionResult<User>> Register(UserDto request)
		{
			CreatePasswordHash(request.Password, out byte[] psswordHash, out byte[] passwordSalt);
			User user = new User();
			//using (_context)
			//{
			//	user = _context.Users
			//		.Where(u => u.Username == request.Username)
			//		.FirstOrDefault<User>();
			//}
			//if (user.Username == request.Username)
			//{
			//	return BadRequest("Username already exists.");
			//}
			user.Username = request.Username; 
			user.PasswordHash = psswordHash;
			user.PasswordSalt = passwordSalt;

			_context.Users.Add(user);
			await _context.SaveChangesAsync();
			//return Ok(user);

			return Ok(await _context.Users.ToListAsync());
		}

		[HttpPost("login")]
		public async Task<ActionResult<string>> Login(UserDto request)
		{
			var user = _context.Users
				.FromSql($"SELECT * FROM dbo.Users")
				.Where(u => u.Username == request.Username)
				.FirstOrDefault();

			if (user == null || user.Username != request.Username)
				return BadRequest("User not found");

			if (!VerifyPasswordHash(request.Password, user.PasswordHash, user.PasswordSalt))
				return BadRequest("Wrong password.");

			string token = CreateToken(user);
			var refreshToken = GenerateRefreshToken();
			SetRefreshToken(refreshToken, user);

			await _context.SaveChangesAsync();

			return Ok(token);
		}

		[HttpPost("refresh-token")]
		public async Task<ActionResult<string>> RefreshToken(User user)
		{
			var refreshToken = Request.Cookies["refreshToken"];

			if(!user.RefreshToken.Equals(refreshToken))
			{
				return Unauthorized("Invalid refresh token.");
			}
			else if(user.TokenExpires < DateTime.Now)
			{
				return Unauthorized("Token expired.");
			}
			string token = CreateToken(user);
			var newRefreshToken = GenerateRefreshToken();
			SetRefreshToken(newRefreshToken, user);

			await _context.SaveChangesAsync();

			return Ok(token);
		}

		private RefreshToken GenerateRefreshToken()
		{
			var refreshToken = new RefreshToken
			{
				Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(64)),
				Expires = DateTime.Now.AddDays(7),
				Created = DateTime.Now
			};
			return refreshToken;
		}

		private void SetRefreshToken(RefreshToken newRefreshToken, User user)
		{
			var cookieOptions = new CookieOptions
			{
				HttpOnly = true,
				Expires = newRefreshToken.Expires
			};
			Response.Cookies.Append("refreshToken", newRefreshToken.Token, cookieOptions);

			user.RefreshToken = newRefreshToken.Token;
			user.TokenCreated = newRefreshToken.Created;
			user.TokenExpires = newRefreshToken.Expires;
		}

		private string CreateToken(User user)
		{
			List<Claim> claims = new List<Claim>
			{
				new Claim(ClaimTypes.Name, user.Username),
				new Claim(ClaimTypes.Role, "Admin")
			};

			var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

			var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

			var token = new JwtSecurityToken(
				claims: claims,
				expires: DateTime.Now.AddDays(1),
				signingCredentials: creds);

			var jwt = new JwtSecurityTokenHandler().WriteToken(token);

			return jwt;
		}

		private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			using (var hmac = new HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
			}
		}

		private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
		{
			using (var hmac = new HMACSHA512(passwordSalt))
			{
				var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
				return computedHash.SequenceEqual(passwordHash);
			}
		}
	}
}
