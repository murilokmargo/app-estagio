import React, { useEffect, useState } from "react";
import { Button, ConfigProvider, Form, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import ProcessosSearch from "../../components/ProcessosSearch/ProcessosSearch";
import mapeamentoDeSituacao from "../../utils/MapeamentoDeSituacao";
import mapeamentoDeTipos from "../../utils/MapeamentoDeTipos";
import useGetProcessos from "../../hooks/useGetProcessos";
import CardContent from "../../components/CardContent";
import Title from "antd/es/typography/Title";
import PageHeader from "../../components/PageHeader";
import { DownloadOutlined, FileAddOutlined } from "@ant-design/icons";

const rowStyle = {
    cursor: "pointer",
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
            return mapeamentoDeSituacao[situacao] || situacao;
        },
    },
    {
        title: "Tipo Processo",
        dataIndex: "tipo",
        render: (tipo) => {
            return mapeamentoDeTipos[tipo] || tipo;
        },
    },
];

const Processos = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const { loading, data, fetchData, pagination } = useGetProcessos();

    const onSelectChange = (newSelectedRowKeys) => {
        console.log("selectedRowKeys changed: ", newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
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

    const handleNovoProcesso = () => {
        navigate("/processos/criar");
    };

    const onRow = (record) => ({
        onDoubleClick: () => {
            navigate(`/processos/${record.id}`);
        },
        style: rowStyle,
    });

    const hasSelected = selectedRowKeys.length > 0;

    return (
        <>
            <PageHeader>
                <Space style={{ alignItems: "baseline" }}>
                    <Title level={2} style={{ margin: "0" }}>
                        Processos
                    </Title>
                </Space>
                <Space>
                    <Button type="primary" icon={<FileAddOutlined />} onClick={handleNovoProcesso}>
                        Novo processo
                    </Button>
                    <Button disabled={!hasSelected} icon={<DownloadOutlined />}>
                        Baixar CDA em lote
                    </Button>
                </Space>
            </PageHeader>
            <CardContent>
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                rowHoverBg: "#bae7ff",
                            },
                        },
                    }}
                >
                    <ProcessosSearch onSearch={onSearch} form={form} />
                    <Table
                        dataSource={data}
                        loading={loading}
                        pagination={pagination}
                        columns={columns}
                        onRow={onRow}
                        onChange={handleTableChange}
                        rowSelection={rowSelection}
                    />
                </ConfigProvider>
            </CardContent>
        </>
    );
};

export default Processos;
