import {
    Badge,
    Button,
    Col,
    Descriptions,
    Row,
    Space,
    Spin,
    Timeline,
    Typography,
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
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardContent from "../../components/CardContent";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { DetalhesDoProcesso } from "../../components/DetalhesDoProcesso";
import Contribuinte from "../../components/Contribuinte";
import { DecisoesAdministrativasProcesso } from "../../components/DecisoesAdministrativasProcesso";
import Infracoes from "../../components/Infracoes";

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

    if (loading) {
        return <Spin size="large" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }} />;
    }

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
                    <DetalhesDoProcesso detalheProcesso={detalheProcesso} processo={processo} />
                    <br />
                    <Contribuinte detalheProcesso={detalheProcesso} />
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
            <Infracoes detalheProcesso={detalheProcesso} />
            <DecisoesAdministrativasProcesso isModalOpen={isModalOpen} handleModalCancel={handleModalCancel} detalheProcesso={detalheProcesso} />

        </>
    );
};

export default Processo;


