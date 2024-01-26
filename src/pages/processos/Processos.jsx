import React, { useState, useEffect } from "react";
import { Form, Input, Select, AutoComplete, Button, Table, Tabs, Row, Typography, Col, Space, Tag } from "antd";

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
        justifyContent: "space-between",
        maxWidth: "100%",
    },
};

const onChange = (key) => {
    console.log(key);
};

const situItens = [
    {
        key: "1",
        label: "Todos",
        value: "1",
    },
    {
        key: "2",
        label: <Tag color="magenta">Inserido</Tag>,
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
];

const opcoesTipoProcesso = [
    "Auto de Constatação",
    "Auto de Infração",
    "Aviso de Cobrança",
    "Aviso de Cobrança II",
    "FUNDEIC",
    "Inadimplemento Contratual / Ressarcimento ao Erário",
    "NAI / AIIM",
    "Parcelamento",
    "PRODEI",
    "Reclamação",
    "Termo de Ajustamento de Conduta (TAC)",
    "Termo de Compromisso de Compensação (TCC)",
    "Tribunal de Contas",
    "MPE/MT - TJ/MT",
    "IPVA",
    "AIIM / AAIM",
    "TRFC",
    "Licenciamento Veículo",
    "Aviso de Cobrança não tributário",
];
const SearchPage = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState([]); // Dados da tabela
    const [tiposSelecionados, setTiposSelecionados] = useState([]);

    // Carregar dados (substitua por uma chamada de API)
    useEffect(() => {
        // fetchData(); // Função para buscar os dados da API
    }, []);

    // Função para filtrar dados (pode ser substituída por uma chamada de API)
    const onSearch = (values) => {
        // Aqui você faria uma chamada para a API passando 'values' como parâmetros
        // Exemplo: fetchFilteredData(values);
        // Para este exemplo, estamos apenas filtrando no front-end
        const filteredData = data.filter((item) => {
            // Lógica de filtragem baseada em 'values'
        });
        setData(filteredData);
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
            dataIndex: "cpf_cnpj",
        },
        {
            title: "Nome / Razão Social",
            dataIndex: "nome",
        },
        {
            title: "Situação",
            dataIndex: "situacao",
            render: (situacao) => {
                let color = situacao.length > 5 ? "geekblue" : "green";
                if (situacao === "cancelado") {
                    color = "volcano";
                }
                return (
                    <span>
                        <Tag color={color} key={situacao}>
                            {situacao.toUpperCase()}
                        </Tag>
                    </span>
                );
            },
        },
        {
            title: "Tipo Processo",
            dataIndex: "tipo_processo",
        },
    ];

    const opcoesFiltradasTipoProcesso = opcoesTipoProcesso.filter((o) => !tiposSelecionados.includes(o));
    return (
        <>
            <Form form={form} onFinish={onSearch} layout="inline" style={estilo.form}>
                <div style={estilo.row}>
                    <Form.Item name="nameOrCpf" style={{ width: "50%" }}>
                        <Input placeholder="Nome ou CPF" />
                    </Form.Item>
                    <Form.Item name="processType" style={{ width: "49%" }}>
                        <Select
                            showSearch
                            mode="multiple"
                            placeholder="Tipo de processo"
                            optionFilterProp="children"
                            value={tiposSelecionados}
                            onChange={setTiposSelecionados}
                            filterOption={(input, option) => (option?.label ?? "").includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? "").toLowerCase().localeCompare((optionB?.label ?? "").toLowerCase())
                            }
                            options={opcoesFiltradasTipoProcesso.map((item) => ({
                                value: item,
                                label: item,
                            }))}
                        />
                    </Form.Item>
                </div>
                <div style={estilo.row}>
                    <Form.Item name="processSituation" style={{ width: "30%" }}>
                        <Select showSearch mode="multiple" placeholder="Situação do processo" options={situItens} />
                    </Form.Item>
                    <Form.Item name="procNumber" style={{ width: "15%" }}>
                        <Input placeholder="N.º Proc. Órgão" />
                    </Form.Item>
                    <Form.Item name="cdaNumber" style={{ width: "15%" }}>
                        <Input placeholder="N.º CDA" />
                    </Form.Item>

                    <Form.Item name="organ" style={{ width: "20%" }}>
                        <Select placeholder="Órgão">{/* Opções do select */}</Select>
                    </Form.Item>
                    <Space style={{ width: "20%", display: "flex", justifyContent: "flex-end" }}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Pesquisar
                            </Button>
                        </Form.Item>
                        <Button
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Limpar
                        </Button>
                    </Space>
                </div>
                {/* <Form.Item noStyle shouldUpdate>
                    {() => (
                        <Typography>
                            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                        </Typography>
                    )}
                </Form.Item> */}
            </Form>
            <Table dataSource={data} columns={columns} />
        </>
    );
};

export default SearchPage;
