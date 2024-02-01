import { Button, Descriptions, Space, Tabs, Typography } from "antd";
import { DownloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardContent from "../../components/CardContent";
import PageTitle from "../../components/PagesTitle";

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
                <PageTitle>
                    <Space style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "baseline" }}>
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
                        </div>
                        <Space>
                            <Button type="primary" icon={<DownloadOutlined />}>
                                Baixar CDA
                            </Button>
                            <Button icon={<EditOutlined />}>Editar</Button>
                            <Button danger type="primary" icon={<DeleteOutlined />}>
                                Excluir
                            </Button>
                        </Space>
                    </Space>
                </PageTitle>
                <CardContent>
                    <Descriptions bordered title="Detalhes do Processo" items={items} />
                </CardContent>
                <br />
                <CardContent>
                    <Descriptions title="Contribuinte"></Descriptions>
                </CardContent>
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
