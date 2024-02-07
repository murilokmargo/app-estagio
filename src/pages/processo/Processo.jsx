import {
    Badge,
    Button,
    Card,
    Col,
    Descriptions,
    Row,
    Space,
    Spin,
    Tabs,
    Timeline,
    Typography,
    Modal,
    notification,
    Result,
} from "antd";
import {
    DownloadOutlined,
    EditOutlined,
    FileExclamationOutlined,
    FileAddOutlined,
    FileDoneOutlined,
    HighlightOutlined,
} from "@ant-design/icons";
import mapeamentoDeSituacao from "../../utils/MapeamentoDeSituacao";
import mapeamentoDeTipos from "../../utils/MapeamentoDeTipos";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardContent from "../../components/CardContent";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const Processo = () => {
    const { id } = useParams();
    const [processo, setProcesso] = useState(null);
    const [detalheProcesso, setDetalheProcesso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [processoResponse, detalheProcessoResponse] = await Promise.all([
                    fetch(`http://localhost:3000/processos/${id}`).then((res) => res.json()),
                    fetch(`http://localhost:3000/detalheProcessos/${id}`).then((res) => res.json()),
                ]);
                setProcesso(processoResponse);
                setDetalheProcesso(detalheProcessoResponse);
            } catch (error) {
                console.error("Erro ao buscar os dados:", error);
                notification.error({
                    message: "Erro na busca dos dados",
                    description: "Não foi possível recuperar os dados. Por favor, tente novamente mais tarde.",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const criarItensContribuinte = (contribuinte, index) => {
        const titulo = `${index === 0 ? "Contribuinte" : "Contribuinte Solidário"}: ${contribuinte.nome}${
            contribuinte.recJudicial ? " - Em Recisão Judicial" : ""
        }`;
        const itens = Object.entries(contribuinte)
            .map(([key, value]) => {
                if (key === "recJudicial" || value === null) return null; // Ignora 'recJudicial' e valores nulos
                return {
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
                    children: value.toString(),
                };
            })
            .filter(Boolean); // Remove itens nulos
        return { titulo, itens };
    };

    if (loading) {
        return <Spin size="large" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }} />;
    }

    const prepararItensTabs = (infracoes) => {
        return infracoes.map((infracao, indexInfracao) => {
            // Preparar itens da infração para o Descriptions
            let infraçãoItens = [
                { key: "titulo", label: "Título", children: infracao.titulo },
                { key: "descricao", label: "Descrição", children: infracao.descricao },
                { key: "tipoMulta", label: "Tipo de Multa", children: infracao.tipoMulta },
                { key: "codigoExterno", label: "Código externo", children: infracao.codigoExterno },
            ];

            // Preparar itens dos fatos geradores como componentes Descriptions separados
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

            // Retorna um objeto para cada tab com os itens preparados
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

    const criarItensDescricao = () => {
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

        // Combinar arrays de objetos de dadosProcesso e dadosDetalheProcesso
        const dadosCombinados = [...dadosProcesso, ...dadosDetalheProcesso];

        // Filtrar campos nulos ou indefinidos e criar itens para o Descriptions
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

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleModalCancel = () => {
        setIsModalOpen(false);
    };

    if (!processo || !detalheProcesso) {
        return (
            <Result
                status="500"
                title="500"
                subTitle="Desculpa, algo deu errado."
                extra={
                    <Button type="primary" onClick={() => navigate(-1)}>
                        Voltar
                    </Button>
                }
                style={{ textAlign: "center" }}
            />
        );
    }

    const itemsDescricao = criarItensDescricao();
    const itemsInfracoes = detalheProcesso ? prepararItensTabs(detalheProcesso.infracoes) : [];

    return (
        <>
            <PageHeader>
                <Space style={{ alignItems: "baseline" }}>
                    <Title
                        level={2}
                        copyable={{
                            text: `${detalheProcesso.nmrProcessoAdm}`,
                            tooltips: ["Copiar", "Copiado!"],
                        }}
                        style={{ margin: "0" }}
                    >
                        Processo Nº{detalheProcesso.nmrProcessoAdm}
                    </Title>
                    <Text type="secondary">ID: ({processo.id})</Text>
                </Space>
                <Space>
                    <Button type="primary" icon={<DownloadOutlined />}>
                        Baixar CDA
                    </Button>
                    <Badge count={detalheProcesso.decisoesAdministrativas.length} showZero>
                        <Button icon={<FileExclamationOutlined />} onClick={showModal}>
                            Decisões Administrativas
                        </Button>
                    </Badge>
                    <Button danger icon={<EditOutlined />}>
                        Editar
                    </Button>
                </Space>
            </PageHeader>
            <Row gutter={16} style={{ display: "flex" }}>
                <Col span={18}>
                    <CardContent style={{ marginBottom: "8px" }}>
                        <Descriptions column={2} title="Detalhes do Processo" items={itemsDescricao} />
                        <Descriptions column={1} layout="vertical" size="small">
                            <Descriptions.Item label="Descricao">{detalheProcesso.descricao}</Descriptions.Item>
                        </Descriptions>
                    </CardContent>
                    <br />

                    {detalheProcesso.contribuinte.map((contribuinte, index) => {
                        const { titulo, itens } = criarItensContribuinte(contribuinte, index);
                        return (
                            <>
                                <CardContent key={index} style={{ marginBottom: "16px" }}>
                                    <Descriptions title={titulo}>
                                        {itens.map((item, itemIndex) => (
                                            <Descriptions.Item key={itemIndex} label={item.label}>
                                                {item.children}
                                            </Descriptions.Item>
                                        ))}
                                    </Descriptions>
                                </CardContent>
                                <br />
                            </>
                        );
                    })}
                </Col>
                <Col span={6}>
                    <CardContent>
                        <Descriptions title="Transições" />
                        <Timeline
                            mode="alternate"
                            items={[
                                {
                                    dot: <FileDoneOutlined />,
                                    color: "green",
                                    children: "Processo Baixado em 12/02/2024",
                                },
                                {
                                    dot: <HighlightOutlined />,
                                    children: "Processo inscrito em 22/06/2023",
                                },
                                {
                                    color: "gray",
                                    children: "Solve initial network problems 2015-09-01",
                                },
                                {
                                    color: "gray",
                                    children: "Technical testing 2015-09-01",
                                },
                                {
                                    dot: <FileAddOutlined />,
                                    color: "green",
                                    children: "Processo inserido em 14/02/2023",
                                },
                            ]}
                        />
                    </CardContent>
                </Col>
            </Row>
            <br />
            <CardContent>
                <Tabs items={itemsInfracoes} type="card" />
            </CardContent>
            <Modal title="Decisões Administrativas" open={isModalOpen} onCancel={handleModalCancel} footer={null}>
                {detalheProcesso.decisoesAdministrativas.map((decisao) => (
                    <Card style={{ marginTop: "16px" }} type="inner" title={decisao.nDa}>
                        <Descriptions key={decisao.id} size="small" column={2}>
                            {/* <Descriptions.Item label="Número DA">{decisao.nDa}</Descriptions.Item> */}
                            <Descriptions.Item label="Criado Por">{decisao.criadoPor}</Descriptions.Item>
                            <Descriptions.Item label="Criado Em">{decisao.criadoEm}</Descriptions.Item>
                            <Descriptions.Item label="Consumido Por">{decisao.consumidoPor}</Descriptions.Item>
                            <Descriptions.Item label="Consumido Em">{decisao.consumidoEm}</Descriptions.Item>
                            {decisao.item ? (
                                <Descriptions.Item label="Item" span={2}>
                                    {decisao.item}
                                </Descriptions.Item>
                            ) : (
                                []
                            )}
                        </Descriptions>
                    </Card>
                ))}
            </Modal>
            {/* <Typography>
                <pre>{JSON.stringify(processo)}</pre>
            </Typography>
            <Typography>
                <pre>{JSON.stringify(detalheProcesso)}</pre>
            </Typography> */}
        </>
    );
};

export default Processo;
