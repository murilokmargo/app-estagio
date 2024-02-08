import { Descriptions } from "antd";
import React from "react";
import CardContent from "./CardContent";
import mapeamentoDeTipos from "../utils/MapeamentoDeTipos";
import mapeamentoDeSituacao from "../utils/MapeamentoDeSituacao";

const criarItensDescricao = ({ detalheProcesso, processo }) => {
    const dadosProcesso = [
        {
            key: "situacao",
            label: "Situação",
            value: processo.situacao ? mapeamentoDeSituacao[processo.situacao] : null,
        },
        { key: "tipo", label: "Tipo", value: processo.tipo ? mapeamentoDeTipos[processo.tipo] : null },
        { key: "n_cda", label: "Nº da CDA", value: processo.n_cda },
        { key: "n_antigo_cda", label: "Nº antigo da CDA", value: processo.n_antigo_cda },
        { key: "n_proc_orgao", label: "Nº do processo no orgão", value: processo.n_proc_orgao },
    ];

    const dadosDetalheProcesso = [
        { key: "codigoExterno", label: "Código Externo", value: detalheProcesso.codigoExterno },
        { key: "nmrProcessoAdm", label: "Nº do processo", value: detalheProcesso.nmrProcessoAdm },
        { key: "dataCadastro", label: "Data do cadastro", value: detalheProcesso.dataCadastro },
        {
            key: "dataConstituicaoJuros",
            label: "Data de constituição de juros",
            value: detalheProcesso.dataConstituicaoJuros,
        },
        {
            key: "dataConstuitcaoProcesso",
            label: "Data de constuitcao do processo",
            value: detalheProcesso.dataConstuitcaoProcesso,
        },
        { key: "dataNegativacao", label: "Data de negativação", value: detalheProcesso.dataNegativacao },
        { key: "nmrLivro", label: "Nº do livro", value: detalheProcesso.nmrLivro },
        { key: "nmrFolha", label: "Nº da folha", value: detalheProcesso.nmrFolha },
        { key: "nmrExecFiscal", label: "Nº da execução fiscal", value: detalheProcesso.nmrExecFiscal },
        {
            key: "unidadeAjuizamento",
            label: "Unidade de Ajuizamento",
            value: detalheProcesso.unidadeAjuizamento,
            span: "2",
        },
        { key: "orgao", label: "Orgão", value: detalheProcesso.orgao },
        { key: "inscEstadual", label: "Incrição estadual", value: detalheProcesso.inscEstadual },
        { key: "processoProtestado", label: "Processo protestado", value: detalheProcesso.processoProtestado },
        {
            key: "situacaoNegativacao",
            label: "Situação de negativação",
            value: detalheProcesso.situacaoNegativacao,
        },
        { key: "tipoCalculo", label: "Tipo de cálculo", value: detalheProcesso.tipoCalculo },
    ];

    const dadosCombinados = [...dadosProcesso, ...dadosDetalheProcesso];

    // Filtrar campos nulos ou indefinidos 
    const items = dadosCombinados.reduce((acc, { key, label, value }) => {
        if (value !== null && value !== undefined) {
            acc.push({
                key,
                label,
                children: <p>{value.toString()}</p>,
            });
        }
        return acc;
    }, []);

    return items;
};

export function DetalhesDoProcesso({ detalheProcesso, processo }) {
    const itemsDescricao = criarItensDescricao({ detalheProcesso, processo });

    return <CardContent style={{ marginBottom: "8px" }}>
        <Descriptions column={2} title="Detalhes do Processo" items={itemsDescricao} />
        <Descriptions column={1} layout="vertical" size="small">
            <Descriptions.Item label="Descrição">{detalheProcesso.descricao}</Descriptions.Item>
        </Descriptions>
    </CardContent>;
}

