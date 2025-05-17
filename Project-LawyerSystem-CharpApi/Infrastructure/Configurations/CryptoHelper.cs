using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
namespace Project_LawyerSystem_CharpApi.Infrastructure.Configurations;

public static class CryptoHelper
{
    public static string GenerateSalt()
    {
        // Generate a 128-bit salt using a secure PRNG
        byte[] salt = new byte[128 /8];
        using (var rng = RandomNumberGenerator.Create())
        {
            rng.GetBytes(salt);
        }
        return Convert.ToBase64String(salt);
    }

    public static string HashPassword(string password, string salt)
    {
        byte[] saltBytes = Convert.FromBase64String(salt);

        byte[] hash = KeyDerivation.Pbkdf2(
            password: password,
            salt: saltBytes,
            prf: KeyDerivationPrf.HMACSHA256,
            iterationCount: 100000,
            numBytesRequested: 256 / 8);

        return Convert.ToBase64String(hash);

    }

    public static bool VerifyPassword(string password, string storedHash, string storedSalt)
    {
        var hashedPassword = HashPassword(password, storedSalt);
        return hashedPassword == storedHash;
    }
}
