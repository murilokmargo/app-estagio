import { Button, Col, Descriptions, Row, Space, Spin, Tabs, Timeline, Typography } from "antd";
import {
    DownloadOutlined,
    EditOutlined,
    DeleteOutlined,
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

const { Text } = Typography;

const Processo = () => {
    const { id } = useParams();
    const [processo, setProcesso] = useState(null);
    const [detalheProcesso, setDetalheProcesso] = useState(null);
    const [loading, setLoading] = useState(true);

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
        return <Spin style={{ display: "flex", justifyContent: "center", marginTop: "20px" }} />;
    }

    if (!detalheProcesso || !processo) {
        return <p>Não foi possível carregar os detalhes do processo.</p>;
    }

    const criarItensDescricao = (processo) => {
        return Object.entries(processo).map(([key, value], index) => {
            console.log(key);
            console.log(value);
            if (key == "situacao") {
                return {
                    key: index.toString(),
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "), // Formata o nome do campo
                    children: mapeamentoDeSituacao[value],
                };
            } else if (key == "tipo") {
                return {
                    key: index.toString(),
                    label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "), // Formata o nome do campo
                    children: mapeamentoDeTipos[value],
                };
            }
            return {
                key: index.toString(),
                label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "), // Formata o nome do campo
                children: value || "-",
            };
        });
    };

    const items = criarItensDescricao(processo);

    return (
        <>
            <div>
                <PageHeader>
                    <Space style={{ alignItems: "baseline" }}>
                        <Title
                            level={2}
                            copyable={{
                                text: `${processo.n_proc_orgao}`,
                                tooltips: ["Copiar", "Copiado!"],
                            }}
                            style={{ margin: "0" }}
                        >
                            Processo Nº{processo.n_proc_orgao}
                        </Title>
                        <Text type="secondary">ID: ({processo.id})</Text>
                    </Space>
                    <Space>
                        <Button type="primary" icon={<DownloadOutlined />}>
                            Baixar CDA
                        </Button>
                        <Button icon={<EditOutlined />}>Editar</Button>
                        <Button danger type="primary" icon={<DeleteOutlined />}>
                            Excluir
                        </Button>
                    </Space>
                </PageHeader>
                <Row gutter={16} style={{ display: "flex" }}>
                    <Col span={18}>
                        <CardContent style={{ marginBottom: "8px" }}>
                            <Descriptions title="Detalhes do Processo" items={items} />
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
                    <Descriptions title="Infrações"></Descriptions>{" "}
                    {/* Editar pra se caso ouver apenas uma infração dizer infração no lugar de infrações */}
                    <Tabs></Tabs>
                </CardContent>
            </div>
            <Typography>
                <pre>{JSON.stringify(processo)}</pre>
            </Typography>
            <Typography>
                <pre>{JSON.stringify(detalheProcesso)}</pre>
            </Typography>
        </>
    );
};

export default Processo;
