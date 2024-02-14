import { Card, Col, Descriptions, Tabs } from "antd";
import CardContent from "./CardContent";

// Supondo que você passe os detalhes das infrações e dos fato geradores separadamente
const prepararItensTabs = (infracoes, fatosGeradores) => {
    console.log("fatos:");
    console.log(fatosGeradores);
    console.log("Infracoes");
    console.log(infracoes);
    return infracoes.map((infracao, indexInfracao) => {
        // Encontra os fato geradores relacionados a esta infração específica
        console.log("Infração");
        console.log(infracao);
        const fatoGeradorRelacionado = fatosGeradores.find((fg) => fg.id.toString() === infracao.id)?.fatoGerador || [];
        console.log("Fato gerador:");
        console.log(fatoGeradorRelacionado);

        let infraçãoItens = [
            { key: "titulo", label: "Título", children: infracao.titulo },
            { key: "descricao", label: "Descrição", children: infracao.descricao },
            { key: "tipoMulta", label: "Tipo de Multa", children: infracao.tipoMulta },
            { key: "codigoExterno", label: "Código externo", children: infracao.codigoExterno },
            {
                key: "valorTotal",
                label: "Valor total da infração",
                children: `${infracao.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`,
            },
        ];

        const fatosGeradoresComponentes = fatoGeradorRelacionado.map((fato, indexFato) => {
            const fatoGeradorItens = [
                { key: `situacaoFato-${indexFato}`, label: "Situação do Fato", children: fato.situacaoFato },
                {
                    key: `codTributoExterno-${indexFato}`,
                    label: "Código de tributo externo",
                    children: fato.codTributoExterno,
                },
                {
                    key: `unidadeReferencia-${indexFato}`,
                    label: "Unidade de referência do valor",
                    children: fato.unidadeReferenciaValor,
                },

                { key: `tipoValor-${indexFato}`, label: "Tipo do valor", children: fato.tipoValor },
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
                { key: `dataFato-${indexFato}`, label: "Data do Fato", children: fato.dataFato },
                { key: `dataVencimento-${indexFato}`, label: "Data de Vencimento", children: fato.dataVencimento },
                {
                    key: `dataConstituicaoCredito-${indexFato}`,
                    label: "Data da constituição do credito",
                    children: fato.dataConstituicaoCredito,
                },
                { key: `dataAceite-${indexFato}`, label: "Data aceite", children: fato.dataAceite },
            ];
            const fatoGeradorValores = [
                {
                    key: `valorFato-${indexFato}`,
                    label: "Valor Fato",
                    children: fato.valorFato,
                },
                {
                    key: `valorQuitadoFato-${indexFato}`,
                    label: "Valor quitado do fato",
                    children: fato.valorQuitadoFato,
                },
                {
                    key: `valorPenalidade-${indexFato}`,
                    label: "Valor da penalidade",
                    children: fato.valorPenalidade,
                },
                {
                    key: `valorTotal-${indexFato}`,
                    label: "Valor total do fato",
                    children: fato.valorTotal,
                },
            ];

            return (
                <Card title={`Fato Gerador ${indexFato + 1}`} style={{ marginTop: "16px" }} type="inner">
                    <div style={{ display: "flex" }}>
                        <Col span={16}>
                            <Descriptions key={`fato-${indexFato}`} size="large" items={fatoGeradorItens} column={2} />
                        </Col>
                        <Col span={8} style={{ alignItems: "flex-end" }}>
                            <Descriptions
                                key={`fato-${indexFato}`}
                                size="small"
                                items={fatoGeradorValores}
                                column={1}
                            />
                        </Col>
                    </div>
                </Card>
            );
        });

        return {
            label: `Infração ${indexInfracao + 1}`,
            key: infracao.id,
            children: (
                <>
                    <Descriptions title={"Detalhes da infração"} column={1} items={infraçãoItens} />
                    {fatosGeradoresComponentes}
                </>
            ),
        };
    });
};

const Infracoes = ({ infracoes, detalheProcesso }) => {
    const itemsInfracoes = infracoes && detalheProcesso ? prepararItensTabs(infracoes, detalheProcesso) : [];

    return (
        <CardContent>
            <Tabs items={itemsInfracoes} type="card" />
        </CardContent>
    );
};

export default Infracoes;
