import React, { useEffect, useState } from 'react';
import { Form, Input, Button, DatePicker, AutoComplete, Descriptions, notification, Space, Divider, Select, Typography } from 'antd';
import PageHeader from '../../components/PageHeader';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import CardContent from '../../components/CardContent';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import mapeamentoDeSituacao from '../../utils/MapeamentoDeSituacao';
import mapeamentoDeTipos from '../../utils/MapeamentoDeTipos';

const opcoesTipoProcesso = Object.entries(mapeamentoDeTipos).map((entry) => ({ key: entry[0], value: entry[0], label: entry[1] }));
const opcoesSituacaoProcesso = Object.entries(mapeamentoDeSituacao).map((entry) => ({ key: entry[0], value: entry[0], label: entry[1] }));

const CriarProcesso = () => {
    const [form] = Form.useForm();
    const [contribuintes, setContribuintes] = useState([]);
    const [selectedContribuinte, setSelectedContribuinte] = useState({});
    const [infracoes, setInfracoes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchContribuintes();
        fetchInfracoes();
    }, []);

    const fetchContribuintes = async () => {
        try {
            const response = await fetch('http://localhost:3000/contribuintes');
            const data = await response.json();
            setContribuintes(data);
        } catch (error) {
            console.error('Falha ao buscar contribuintes:', error);
            notification.error({ message: 'Erro ao buscar contribuintes' });
        }
    };

    const fetchInfracoes = async () => {
        try {
            const response = await fetch('http://localhost:3000/infracoes');
            const data = await response.json();
            setInfracoes(data);
        } catch (error) {
            console.error('Falha ao buscar infrações:', error);
            notification.error({ message: 'Erro ao buscar infrações' });
        }
    };

    const contribuintesOptions = contribuintes.map(c => ({
        value: c.id.toString(),
        label: `${c.nome} (${c.cpf})`,
    }));

    const handleSubmit = async (values) => {
        console.log('Form Values:', values);
        // Aqui você pode formatar os dados conforme necessário e enviar para a API
        // Exemplo: await fetch('http://localhost:3000/processos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
        // Não esqueça de tratar a resposta e possíveis erros
    };

    const onContribuinteSearch = (searchText) => {
        // Lógica opcional para buscar contribuintes baseado no texto inserido.
    };

    const handleContribuinteSelect = (value, option, index) => {
        // Atualiza o campo de contribuintes com o ID selecionado
        let contribuintesAtualizados = form.getFieldValue('contribuintes');
        contribuintesAtualizados[index] = { id: value };
        form.setFieldsValue({ contribuintes: contribuintesAtualizados });

        // Para o primeiro contribuinte, atualiza também os campos nome e cpf
        if (index === 0) {
            const contribuinteSelecionado = contribuintes.find(c => c.id.toString() === value);
            form.setFieldsValue({
                nome: contribuinteSelecionado.nome,
                cpf: contribuinteSelecionado.cpf
            });
        }
    };

    return (
        <div>
            <PageHeader>
                <Space style={{ alignItems: "baseline" }}>
                    <Title level={2} style={{ margin: "0" }}>
                        Novo Processo
                    </Title>
                </Space>
                <Space>
                    <Button type="primary">
                        Botão
                    </Button>
                </Space>
            </PageHeader>
            <CardContent>
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={handleSubmit}
                    layout="horizontal"
                    initialValues={{
                        contribuintes: [{}], // Inicia com um campo de contribuinte
                    }}
                    style={{
                        maxWidth: 820,
                        margin: "auto",
                        textAlign: "center"
                    }}
                >
                    <Divider orientation="left" orientationMargin="0">
                        Detalhes do Processo
                    </Divider>
                    <Form.Item hidden name="nome" label="Nome do Primeiro Contribuinte">
                        <Input placeholder="Nome do primeiro contribuinte" disabled />
                    </Form.Item>
                    <Form.Item hidden name="cpf" label="CPF do Primeiro Contribuinte">
                        <Input placeholder="CPF do primeiro contribuinte" disabled />
                    </Form.Item>
                    <Form.Item name="n_cda" label="Nº da CDA">
                        <Input placeholder="Nº da CDA" />
                    </Form.Item>
                    <Form.Item name="n_antigo_cda" label="Nº antigo da CDA">
                        <Input placeholder="Nº antigo da CDA" />
                    </Form.Item>
                    <Form.Item name="n_proc_orgao" label="Nº do processo no orgão">
                        <Input placeholder="Nº do processo no orgão" />
                    </Form.Item>
                    <Form.Item name="situacao" label="Situação do processo">
                        <Select showSearch placeholder="Situação do processo" options={opcoesSituacaoProcesso} />
                    </Form.Item>
                    <Form.Item name="tipo" label="Tipo de processo">
                        <Select
                            showSearch
                            placeholder="Tipo de processo"
                            options={opcoesTipoProcesso}
                        />
                    </Form.Item>
                    <Divider orientation="left" orientationMargin="0">
                        Contribuinte
                    </Divider>
                    <Form.List name="contribuintes">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'id']}
                                        label={index === 0 ? "Contribuinte" : "Contribuinte solidário"}
                                        rules={[{ required: true, message: 'Contribuinte é obrigatório!' }]}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <AutoComplete
                                                options={contribuintesOptions}
                                                onSelect={(value, option) => handleContribuinteSelect(value, option, index)}
                                                placeholder="Digite nome ou CPF"
                                                style={{ width: 'calc(100% - 32px)' }}
                                                filterOption={(inputValue, option) =>
                                                    option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                            />
                                            {index > 0 && (
                                                <MinusCircleOutlined onClick={() => remove(name)} style={{ color: '#ff4d4f', marginLeft: 8, cursor: 'pointer' }} />
                                            )}
                                        </div>
                                    </Form.Item>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: "600px", textAlign: "center" }}>
                                    Adicionar Contribuinte
                                </Button>
                            </>
                        )}
                    </Form.List>

                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'center' }}>
                        <Button type="primary" htmlType="submit">Criar Processo</Button>
                    </Form.Item>
                </Form>
            </CardContent >
        </div >
    );
};

export default CriarProcesso;
