using System.Text.Json.Serialization;

namespace WebApi_Funcionarios.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum ExercicioEnum
    {
        Pescoco,
        Ombro,
        Braco,
        Costas,
        Mao,
        Pernas,
        Pes,
        Cabeca
    }
}
