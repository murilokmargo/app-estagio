import { Badge, Button, Col, Row, Space, Spin, Typography, notification, Result } from "antd";
import {
    DownloadOutlined,
    EditOutlined,
    FileExclamationOutlined,
    LeftOutlined
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import { useNavigate } from "react-router-dom";
import { DetalhesDoProcesso } from "../../components/DetalhesDoProcesso";
import Contribuinte from "../../components/Contribuinte";
import { DecisoesAdministrativasProcesso } from "../../components/DecisoesAdministrativasProcesso";
import Infracoes from "../../components/Infracoes";
import TimeLineProcesso from "../../components/TimeLineProcesso";

const { Text } = Typography;

const Processo = () => {
    const { id } = useParams();
    const [processo, setProcesso] = useState(null);
    const [detalheProcesso, setDetalheProcesso] = useState(null);
    const [contribuintesDetalhados, setContribuintesDetalhados] = useState([]);
    const [infracoesDetalhadas, setInfracoesDetalhadas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Buscar os detalhes do processo
                const processoResponse = await fetch(`http://localhost:3000/processos/${id}`).then((res) => res.json());

                // Buscar os detalhes adicionais do processo
                const detalheProcessoResponse = await fetch(`http://localhost:3000/detalheProcessos/${id}`).then(
                    (res) => res.json()
                );

                // Buscar detalhes dos contribuintes baseado nos IDs
                const contribuintesPromises = detalheProcessoResponse.contribuinte.map((contribuinte) =>
                    fetch(`http://localhost:3000/contribuintes/${contribuinte.id}`).then((res) => res.json())
                );

                // Buscar detalhes das infrações baseado nos IDs
                const infracoesPromises = detalheProcessoResponse.infracoes.map((infracao) =>
                    fetch(`http://localhost:3000/infracoes/${infracao.id}`).then((res) => res.json())
                );

                // Aguarda todas as requisições de contribuintes e infrações
                const contribuintes = await Promise.all(contribuintesPromises);
                const infracoes = await Promise.all(infracoesPromises);

                // Combina os dados obtidos
                const detalhesCompletos = {
                    processo: processoResponse,
                    detalheProcesso: detalheProcessoResponse,
                    contribuintesDetalhados: contribuintes,
                    infracoesDetalhadas: infracoes.map((infracao) => ({
                        ...infracao,
                        fatoGerador: infracao.fatoGerador, // Supondo que já vem embutido no fetch anterior
                    })),
                };

                setProcesso(detalhesCompletos.processo);
                setDetalheProcesso(detalhesCompletos.detalheProcesso);
                setContribuintesDetalhados(contribuintes);
                setInfracoesDetalhadas(
                    infracoes.map((infracao) => ({
                        ...infracao,
                        fatoGerador: infracao.fatoGerador,
                    }))
                );
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

    function handleVoltaIcone() {
        navigate('/processos');
    }

    return (
        <>
            <PageHeader>
                <Space style={{ alignItems: "baseline" }}>
                    <LeftOutlined style={{ fontSize: "24px", fontWeight: "bolder", color: "#1890ff" }} onClick={handleVoltaIcone} />
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
                    <Contribuinte contribuintes={contribuintesDetalhados} />
                </Col>
                <Col span={6}>
                    <TimeLineProcesso detalheProcesso={detalheProcesso} />
                </Col>
            </Row>
            <Infracoes infracoes={infracoesDetalhadas} detalheProcesso={detalheProcesso.infracoes} />
            <DecisoesAdministrativasProcesso
                isModalOpen={isModalOpen}
                handleModalCancel={handleModalCancel}
                detalheProcesso={detalheProcesso}
            />
        </>
    );
};

export default Processo;
