using System.Text.Json.Serialization;

namespace Project_LawyerSystem_CharpApi.Domain.Enums;

/// <summary>
/// Enumeration representing user roles.
/// </summary>
[JsonConverter(typeof(JsonStringEnumConverter))]
public enum Role
{
    /// <summary>
    /// Represents a lawyer role.
    /// </summary>
    Advogado = 1,

    /// <summary>
    /// Represents a client role.
    /// </summary>
    Cliente = 2,
}