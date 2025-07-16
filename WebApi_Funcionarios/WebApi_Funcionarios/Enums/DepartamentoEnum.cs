using System.Text.Json.Serialization;

namespace WebApi_Funcionarios.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum DepartamentoEnum
    {
        RH,
        Financeiro,
        Compras,
        Atendimento,
        Limpeza,
        Administracao,
        Gerencia,
        Producao,
        Comercial,
        Marketing,
        Estoque

    }
}
