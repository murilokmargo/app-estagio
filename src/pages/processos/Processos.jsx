import React, { useEffect } from "react";
import { Form, Table } from "antd";
import { useNavigate } from "react-router-dom";
import ProcessosSearch from "../../components/ProcessosSearch/ProcessosSearch";
import mapeamentoDeSituacao from "../../utils/MapeamentoDeSituacao";
import mapeamentoDeTipos from "../../utils/MapeamentoDeTipos";
import useGetProcessos from "../../hooks/useGetProcessos";

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

const SearchPage = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { loading, data, fetchData, pagination } = useGetProcessos();

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
        onDoubleClick: () => {
            navigate(`/processos/${record.id}`);
        },
    });

    return (
        <>
            <ProcessosSearch onSearch={onSearch} form={form} />
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
