import { Button, Col, Descriptions, Row, Space, Tabs, Timeline, Typography } from "antd";
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

    useEffect(() => {
        // Substitua a URL pela sua API ou método de busca de dados
        fetch(`http://localhost:3000/processos/${id}`)
            .then((response) => response.json())
            .then((data) => setProcesso(data))
            .catch((error) => console.error("Erro ao buscar processo:", error));
    }, [id]);

    if (!processo) {
        return <p>Carregando detalhes do processo...</p>;
    }

    // Função para criar itens dinamicamente
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

                        <CardContent>
                            <Descriptions title="Contribuinte"></Descriptions>
                        </CardContent>
                    </Col>
                    <Col span={6} style={{ display: "flex" }}>
                        <CardContent style={{ height: "auto" }}>
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
        </>
    );
};

export default Processo;
