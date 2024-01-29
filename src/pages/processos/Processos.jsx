import React, { useState, useEffect } from "react";
import { Form, Input, Select, AutoComplete, Button, Table, Row, Typography, Col, Tag } from "antd";
import { Navigate, useNavigate } from "react-router-dom";

const { Option } = Select;

const estilo = {
    form: {
        maxWidth: "none",
        background: "#fafafa",
        borderRadius: "16px 16px 0 0",
        padding: "24px 24px 0 24px",
        gap: "16px",
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        maxWidth: "100%",
    },
    buttonsRow: {
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        margin: "0 16px 8px 0",
    },
    searchButton: {
        marginLeft: "8px",
    },
};

const onChange = (key) => {
    console.log(key);
};

const situItens = [
    {
        key: "2",
        label: "Inserido",
        value: "2",
    },
    {
        key: "3",
        label: "Pré-validado",
        value: "3",
    },
    {
        key: "4",
        label: "Validado",
        value: "4",
    },
    {
        key: "5",
        label: "Inscrito",
        value: "5",
    },
    {
        key: "6",
        label: "Protestado",
        value: "6",
    },
    {
        key: "7",
        label: "Pré-Ajuizado",
        value: "7",
    },
    {
        key: "8",
        label: "Ajuizado",
        value: "8",
    },
    {
        key: "9",
        label: "Suspenso",
        value: "9",
    },
    {
        key: "10",
        label: "Em garantia de juízo",
        value: "10",
    },
    {
        key: "11",
        label: "Em pagamento",
        value: "11",
    },
    {
        key: "12",
        label: "Quitado",
        value: "12",
    },
    {
        key: "13",
        label: "Baixado",
        value: "13",
    },
    {
        key: "14",
        label: "Cancelado",
        value: "14",
    },
    {
        key: "15",
        label: "Em compensação",
        value: "15",
    },
];

const opcoesTipoProcesso = [
    {
        key: 1,
        label: "Auto de Constatação",
        value: "1",
    },
    {
        key: 2,
        label: "Auto de Infração",
        value: "2",
    },
    {
        key: 3,
        label: "Aviso de Cobrança",
        value: "3",
    },
    {
        key: 4,
        label: "Aviso de Cobrança II",
        value: "4",
    },
    {
        key: 5,
        label: "FUNDEIC",
        value: "5",
    },
    {
        key: 6,
        label: "Inadimplemento Contratual / Ressarcimento ao Erário",
        value: "6",
    },
    {
        key: 8,
        label: "Parcelamento",
        value: "8",
    },
    {
        key: 9,
        label: "PRODEI",
        value: "9",
    },
    {
        key: 10,
        label: "Reclamação",
        value: "10",
    },
    {
        key: 11,
        label: "Termo de Ajustamento de Conduta (TAC)",
        value: "11",
    },
    {
        key: 12,
        label: "Termo de Compromisso de Compensação (TCC)",
        value: "12",
    },
    {
        key: 13,
        label: "Tribunal de Contas",
        value: "13",
    },
    {
        key: 14,
        label: "MPE/MT - TJ/MT",
        value: "14",
    },
    {
        key: 15,
        label: "IPVA",
        value: "15",
    },
    {
        key: 16,
        label: "AIIM / AAIM",
        value: "16",
    },
    {
        key: 17,
        label: "TRFC",
        value: "17",
    },
    {
        key: 18,
        label: "Licenciamento Veículo",
        value: "18",
    },
    {
        key: 19,
        label: "Aviso de Cobrança não tributário",
        value: "19",
    },
];

const mapeamentoTipoProcesso = opcoesTipoProcesso.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
}, {});

const mapeamentoSituacao = situItens.reduce((acc, item) => {
    acc[item.value] = item.label;
    return acc;
}, {});

const SearchPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [data, setData] = useState([]); // Dados da tabela

    // Carregar dados (substitua por uma chamada de API)
    useEffect(() => {
        fetch("http://localhost:3000/processos")
            .then((response) => response.json())
            .then((data) => {
                const dataComChaves = data.map((item) => ({ ...item, key: item.id }));
                setData(dataComChaves);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    }, []);

    // Função para filtrar dados (pode ser substituída por uma chamada de API)
    const onSearch = (values) => {
        let queryParts = Object.keys(values)
            .map((key) => {
                if (Array.isArray(values[key]) && values[key].length > 0) {
                    // Para campos com múltiplas seleções, como 'tipo' ou 'situacao'
                    return `${key}=${values[key][0]}`;
                } else if (values[key]) {
                    // Para campos de texto, como 'nome', 'n_cda', etc.
                    return `${key}=${values[key]}`;
                }
                return "";
            })
            .filter((part) => part !== "");

        let queryString = queryParts.join("&");

        fetch(`http://localhost:3000/processos?${queryString}`)
            .then((response) => response.json())
            .then((data) => {
                const dataComChaves = data.map((item) => ({ ...item, key: item.id }));
                setData(dataComChaves);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    };

    const onChange = (key) => {
        console.log(key);
    };
    // Definição das colunas da tabela
    const columns = [
        //colunas da tabela
        {
            title: "ID",
            dataIndex: "id",
        },
        {
            title: "Nº Proc. Órgão",
            dataIndex: "n_proc_orgao",
        },
        {
            title: "Nº CDA",
            dataIndex: "n_cda",
        },
        {
            title: "Nº antigo CDA",
            dataIndex: "n_antigo_cda",
        },
        {
            title: "CPF/CNPJ",
            dataIndex: "cpf",
        },
        {
            title: "Nome / Razão Social",
            dataIndex: "nome",
        },
        {
            title: "Situação",
            dataIndex: "situacao",
            render: (situacao) => {
                return mapeamentoSituacao[situacao] || situacao;
            },
        },
        {
            title: "Tipo Processo",
            dataIndex: "tipo",
            render: (tipo) => {
                return mapeamentoTipoProcesso[tipo] || tipo;
            },
        },
    ];

    const onRow = (record) => ({
        onClick: () => {
            console.log(`Clickou ${record.id}`);
            navigate(`/processos/${record.id}`);
        },
    });

    return (
        <>
            <Form form={form} onFinish={onSearch} layout="inline" style={estilo.form}>
                <Row gutter={16} style={estilo.row}>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <Form.Item name="nome" style={{ width: "100%" }}>
                            <Input placeholder="Nome ou CPF" style={{ boxSizing: "border-box" }} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <Form.Item name="n_cda" style={{ width: "100%" }}>
                            <Input placeholder="N.º CDA" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <Form.Item name="n_proc_orgao" style={{ width: "100%" }}>
                            <Input placeholder="N.º Proc. Órgão" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6}>
                        <Form.Item name="orgao" style={{ width: "100%" }}>
                            <Select placeholder="Órgão">{/* Opções do select */}</Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16} style={estilo.row}>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item name="situacao" style={{ width: "100%" }}>
                            <Select showSearch mode="multiple" placeholder="Situação do processo" options={situItens} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item name="tipo" style={{ width: "100%" }}>
                            <Select
                                showSearch
                                mode="multiple"
                                placeholder="Tipo de processo"
                                options={opcoesTipoProcesso}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row style={estilo.buttonsRow}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Pesquisar
                        </Button>
                    </Form.Item>
                    <Button
                        style={estilo.searchButton}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Limpar
                    </Button>
                </Row>
                {/* <Form.Item noStyle shouldUpdate>
                    {() => (
                        <Typography>
                            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                        </Typography>
                    )}
                </Form.Item> */}
            </Form>
            <Table dataSource={data} columns={columns} onRow={onRow} />
        </>
    );
};

export default SearchPage;
