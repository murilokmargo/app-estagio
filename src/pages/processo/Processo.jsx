import { Card, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    return (
        <div>
            {processo ? (
                // Renderize os detalhes do processo aqui
                <>
                    <div>
                        <Space style={{ display: "flex", bottom: "0" }}>
                            <Title
                                level={2}
                                copyable={{ text: `${processo.n_proc_orgao}`, tooltips: ["Copiar", "Copiado!"] }}
                            >
                                Processo Nº{processo.n_proc_orgao}
                            </Title>
                            <Text type="secondary">ID: ({processo.id})</Text>
                        </Space>
                        <Typography>
                            <pre>{JSON.stringify(processo)}</pre>
                        </Typography>
                    </div>
                    <Card title={`Processo: ${processo.nome}`}>
                        <p>ID:{processo.id}</p>
                        <p>Descrição: {processo.descricao}</p>
                        <p>Data de Início: {processo.dataInicio}</p>
                        <p>Status: {processo.status}</p>
                    </Card>
                </>
            ) : (
                <p>Carregando detalhes do processo...</p>
            )}
        </div>
    );
};

export default Processo;
