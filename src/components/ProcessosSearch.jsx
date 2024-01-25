import { AutoComplete, Card, Form, Input, Tabs } from "antd";
import { useForm } from "antd/es/form/Form";

const estilo = {
    form: {
        maxWidth: "none",
        background: "red",
        borderRadius: "blue",
        padding: 24,
    },
};

const tabItens = [
    {
        label: "Tudo",
        key: "tudo",
    },
    {
        label: "Ajuizado",
        key: "ajuizado",
    },
];

const ProcessosSearch = () => {
    const [form] = Form.useForm();

    return (
        <>
            <AutoComplete placeholder="Nome ou CPF/CNPJ" />
            <Input label="" />

            <Tabs defaultActiveKey="1" type="card" size="small" items={tabItens} />
        </>
    );
};

export default ProcessosSearch;
