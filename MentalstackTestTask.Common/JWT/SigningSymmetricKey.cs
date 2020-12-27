using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;

namespace MentalstackTestTask.Common.JWT
{
    public class SigningSymmetricKey : IJwtSigningEncodingKey, IJwtSigningDecodingKey
    {
        private readonly SymmetricSecurityKey _secretKey;
        public string SingingAlghorithm { get; } = SecurityAlgorithms.HmacSha256;

        public SecurityKey GetKey() => this._secretKey;
        public SigningSymmetricKey(string key)
        {
            this._secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        }
    }
}
