import { Card, Descriptions, Tabs } from "antd";
import CardContent from "./CardContent";

const prepararItensTabs = (infracoes) => {
    return infracoes.map((infracao, indexInfracao) => {
        let infraçãoItens = [
            { key: "titulo", label: "Título", children: infracao.titulo },
            { key: "descricao", label: "Descrição", children: infracao.descricao },
            { key: "tipoMulta", label: "Tipo de Multa", children: infracao.tipoMulta },
            { key: "codigoExterno", label: "Código externo", children: infracao.codigoExterno },
        ];

        const fatosGeradoresComponentes = infracao.fatoGerador.map((fato, indexFato) => {
            const fatoGeradorItens = [
                { key: `dataFato-${indexFato}`, label: "Data Fato", children: fato.dataFato },
                { key: `dataVencimento-${indexFato}`, label: "Data Vencimento", children: fato.dataVencimento },
                { key: `situacaoFato-${indexFato}`, label: "Situação Fato", children: fato.situacaoFato },
                { key: `valorFato-${indexFato}`, label: "Valor Fato", children: fato.valorFato },
                {
                    key: `unidadeReferencia-${indexFato}`,
                    label: "Unidade de referência do valor",
                    children: fato.unidadeReferenciaValor,
                },
                { key: `tipoValor-${indexFato}`, label: "Tipo do valor", children: fato.tipoValor },
                {
                    key: `valorQuitadoFato-${indexFato}`,
                    label: "Valor quitado do fato",
                    children: fato.valorQuitadoFato,
                },
                {
                    key: `dataConstituicaoCredito-${indexFato}`,
                    label: "Data da constituição do credito",
                    children: fato.dataConstituicaoCredito,
                },
                { key: `dataAceite-${indexFato}`, label: "Data aceite", children: fato.dataAceite },
                {
                    key: `instrumentoConstitutivo-${indexFato}`,
                    label: "Intrumento Constitutivo",
                    children: fato.instrumentoConstitutivo,
                },
                {
                    key: `nmrIntrumentoConstitutivo-${indexFato}`,
                    label: "Número do instrumento Constitutivo",
                    children: fato.nmrIntrumentoConstitutivo,
                },
                {
                    key: `codTributoExterno-${indexFato}`,
                    label: "Código de tributo externo",
                    children: fato.codTributoExterno,
                },
                {
                    key: `valorPenalidade-${indexFato}`,
                    label: "Valor da penalidade",
                    children: fato.valorPenalidade,
                },
            ];

            return (
                <Card title={`Fato Gerador ${indexFato + 1}`} style={{ marginTop: "16px" }} type="inner">
                    <Descriptions key={`fato-${indexFato}`} size="small" items={fatoGeradorItens} />
                </Card>
            );
        });

        return {
            label: `Infração ${indexInfracao + 1}`,
            key: `${infracao.id}`,
            children: (
                <>
                    <Descriptions title={" Detalhes da infração"} column={1} items={infraçãoItens} />
                    {fatosGeradoresComponentes}
                </>
            ),
        };
    });
};

const Infracoes = ({ detalheProcesso }) => {
    const itemsInfracoes = detalheProcesso ? prepararItensTabs(detalheProcesso.infracoes) : [];

    return (
        <CardContent>
            <Tabs items={itemsInfracoes} type="card" />
        </CardContent>
    )
}
export default Infracoes;
