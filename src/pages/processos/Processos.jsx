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
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]); // Dados da tabela
    const [searchParams, setSearchParams] = useState({});
    const [pagination, setPagination] = useState({
        current: 1, // Página atual
        pageSize: 10, // Quantidade de itens por página
        total: 0, // Total de itens (necessário para o componente de paginação do Ant Design)
    });

    const onChange = (key) => {
        console.log(key);
    };

    const fetchData = (searchParams = {}, page = 1, pageSize = 10) => {
        setLoading(true);

        // Construir a query string para a busca
        let queryParts = Object.keys(searchParams)
            .filter((key) => searchParams[key] && searchParams[key].toString().trim() !== "")
            .map((key) => {
                if (Array.isArray(searchParams[key]) && searchParams[key].length > 0) {
                    return `${key}=${encodeURIComponent(searchParams[key][0])}`;
                } else {
                    return `${key}=${encodeURIComponent(searchParams[key])}`;
                }
            });

        let queryString = [`_page=${page}`, `_limit=${pageSize}`, ...queryParts].join("&");

        fetch(`http://localhost:3000/processos?${queryString}`)
            .then((response) => {
                const total = response.headers.get("X-Total-Count");
                setPagination({ ...pagination, total: parseInt(total, 10), current: page, pageSize: pageSize });

                return response.json();
            })
            .then((data) => {
                setData(data.map((item) => ({ ...item, key: item.id })));
                console.log(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const onSearch = (values) => {
        fetchData(values, 1, pagination.pageSize);
    };

    const handleTableChange = (newPagination) => {
        fetchData(form.getFieldsValue(), newPagination.current, newPagination.pageSize);
    };

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
            <Table
                dataSource={data}
                loading={loading}
                pagination={pagination}
                columns={columns}
                onRow={onRow}
                onChange={handleTableChange}
            />
        </>
    );
};

export default SearchPage;
