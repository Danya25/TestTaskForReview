using AutoMapper;
using MentalstackTestTask.Common.JWT;
using MentalstackTestTask.DAL;
using MentalstackTestTask.DAL.Models;
using MentalstackTestTask.Domain.DTO;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace MentalstackTestTask.Services.Services
{
    public class AuthService : IAuthService
    {
        public DatabaseContext _dbContext;
        public IMapper _mapper;
        private IJwtSigningEncodingKey _signingEncodingKey;

        public AuthService(DatabaseContext dbContext, IMapper mapper, IJwtSigningEncodingKey signEncKey)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _signingEncodingKey = signEncKey;
        }
        public async Task<string> LoginUserAsync(UserDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);
            var userFromDb = await _dbContext.Users.FirstOrDefaultAsync(t => t.Email == user.Email);
            if (userFromDb is null)
                throw new Exception("Cannot find any account with such email");

            var verifiedPass = VerifyPassword(user.Password, userFromDb.Password, userFromDb.Salt);
            if(!verifiedPass)
                throw new Exception("Password incorrect");
              
            var claims = new Claim[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Email),
            };
            var token = new JwtSecurityToken(
                issuer: "MentalstackTestTask",
                audience: "MentalstackFront",
                claims: claims,
                expires: DateTime.Now.AddMinutes(20),
                 signingCredentials: new SigningCredentials(
                    _signingEncodingKey.GetKey(),
                    _signingEncodingKey.SingingAlghorithm
                    )
                );
            string jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
            return jwtToken;
        }

        public async Task<bool> RegistrationUserAsync(UserDTO userDto)
        {
            var user = _mapper.Map<User>(userDto);

            var userExist = await _dbContext.Users.AnyAsync(t => t.Email == user.Email);
            if (userExist)
                throw new NotImplementedException("User already exists");
            using (var transaction = await _dbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    var hashedPassword = GenerateSaltedHash(8, user.Password);
                    user.Password = hashedPassword.Hash;
                    user.Salt = hashedPassword.Salt;
                    var createdUser = await _dbContext.Users.AddAsync(user);
                    transaction.Commit();
                    await _dbContext.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return false;
                }
            }
            return true;
        }
        private HashSalt GenerateSaltedHash(int size, string password)
        {
            var saltBytes = new byte[size];
            var provider = new RNGCryptoServiceProvider();
            provider.GetNonZeroBytes(saltBytes);
            var salt = Convert.ToBase64String(saltBytes);

            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(password, saltBytes, 10000);
            var hashPassword = Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256));

            HashSalt hashSalt = new HashSalt { Hash = hashPassword, Salt = salt };
            return hashSalt;
        }
        private bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);
            var rfc2898DeriveBytes = new Rfc2898DeriveBytes(enteredPassword, saltBytes, 10000);
            return Convert.ToBase64String(rfc2898DeriveBytes.GetBytes(256)) == storedHash;
        }
    }
}
