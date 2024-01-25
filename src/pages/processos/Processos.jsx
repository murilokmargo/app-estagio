import React, { useState, useEffect } from "react";
import { Form, Input, Select, AutoComplete, Button, Table, Tabs, Row, Typography, Col, Space } from "antd";

const { Option } = Select;

const estilo = {
    form: {
        maxWidth: "none",
        background: "#fafafa",
        borderRadius: "16px 16px 0 0",
        padding: "24px",
        gap: "16px",
    },
    row: {
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
    },
    buttons: {
        width: "97%",
        textAlign: "right",
    },
};

const onChange = (key) => {
    console.log(key);
};

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

    // Definição das colunas da tabela
    const columns = [
        //colunas da tabela
        {
            title: "ID",
            dataIndex: "id",
            align: "right",
        },
        {
            title: "Nº Proc. Órgão",
            dataIndex: "n_proc_orgao",
            align: "right",
        },
        {
            title: "Nº CDA",
            dataIndex: "n_cda",
            align: "right",
        },
        {
            title: "Nº antigo CDA",
            dataIndex: "n_antigo_cda",
            align: "right",
        },
        {
            title: "CPF/CNPJ",
            dataIndex: "cpf_cnpj",
            align: "right",
        },
        {
            title: "Nome / Razão Social",
            dataIndex: "nome",
            align: "right",
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
            align: "right",
        },
        {
            title: "Tipo Processo",
            dataIndex: "tipo_processo",
            align: "right",
        },
    ];

    const opcoesFiltradasTipoProcesso = opcoesTipoProcesso.filter((o) => !tiposSelecionados.includes(o));
    return (
        <>
            <Form form={form} onFinish={onSearch} layout="inline" style={estilo.form}>
                <div style={estilo.row}>
                    <Form.Item name="nameOrCpf" style={{ width: "40%" }}>
                        <Input placeholder="Nome ou CPF" />
                    </Form.Item>
                    <Form.Item name="procNumber" style={{ width: "24%" }}>
                        <Input placeholder="N.º Proc. Órgão" />
                    </Form.Item>
                    <Form.Item name="cdaNumber" style={{ width: "24%" }}>
                        <Input placeholder="N.º CDA" />
                    </Form.Item>
                </div>
                <div style={estilo.row}>
                    <Form.Item name="processType" style={{ width: "40%" }}>
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
                    <Form.Item name="processSituation" style={{ width: "24%" }}>
                        <Select placeholder="Situação Processo">{/* Opções do select */}</Select>
                    </Form.Item>
                    <Form.Item name="organ" style={{ width: "24%" }}>
                        <Select placeholder="Órgão">{/* Opções do select */}</Select>
                    </Form.Item>
                </div>
                <div style={estilo.buttons}>
                    <Space size="small" tyle={estilo.buttons}>
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
                <Form.Item noStyle shouldUpdate>
                    {() => (
                        <Typography>
                            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                        </Typography>
                    )}
                </Form.Item>
            </Form>
            <Table dataSource={data} columns={columns} />
        </>
    );
};

export default SearchPage;
