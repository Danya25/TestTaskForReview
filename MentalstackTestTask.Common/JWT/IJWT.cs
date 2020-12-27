using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Text;


namespace MentalstackTestTask.Common.JWT
{
    public interface IJwtSigningEncodingKey
    {
        string SingingAlghorithm { get; }
        SecurityKey GetKey();
    }
    public interface IJwtSigningDecodingKey
    {
        SecurityKey GetKey();
    }
}
