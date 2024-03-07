import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
    AutoComplete,
    notification,
    Space,
    Divider,
    Select,
    Typography,
    Card,
    InputNumber,
} from "antd";
import PageHeader from "../../components/PageHeader";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import CardContent from "../../components/CardContent";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import mapeamentoDeSituacao from "../../utils/MapeamentoDeSituacao";
import mapeamentoDeTipos from "../../utils/MapeamentoDeTipos";
import dayjs from "dayjs";
import mapeamentoDeOrgao from "../../utils/MapeamentoDeOrgao";

const opcoesTipoProcesso = Object.entries(mapeamentoDeTipos).map((entry) => ({
    key: entry[0],
    value: entry[0],
    label: entry[1],
}));
const opcoesSituacaoProcesso = Object.entries(mapeamentoDeSituacao).map((entry) => ({
    key: entry[0],
    value: entry[0],
    label: entry[1],
}));
const opcoesOrgaos = Object.entries(mapeamentoDeOrgao).map((entry) => ({
    key: entry[0],
    value: entry[0],
    label: entry[1],
}));

const correcaoOptions = [
    { label: "Correção monetária da Sefaz", value: "Correção monetária da Sefaz" },
    { label: "Correção Selic", value: "Correção Selic" },
    { label: "Correção INPC", value: "Correção INPC" },
];

const juroOptions = [
    { label: "Juro de mora da Sefaz", value: "Juro de mora da Sefaz" },
    { label: "Juro de mora do código Cívil", value: "Juro de mora do código Cívil" },
    { label: "Juro de mora de meio porcento", value: "Juro de mora de meio porcento" },
    { label: "Juro Selic", value: "Juro Selic" },
];

const situacaoFatoOptions = [
    { label: "Não programado", value: "Não programado" },
    { label: "Programado", value: "Programado" },
    { label: "Quitado", value: "Quitado" },
    { label: "Cancelado", value: "Cancelado" },
    { label: "Prescrito", value: "Prescrito" },
];

const tipoValorFato = [{ label: "Valor percentual", value: "Valor percentual" }];

const dateFormat = "DD/MM/YYYY";

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
            const response = await fetch("http://localhost:3000/contribuintes");
            const data = await response.json();
            setContribuintes(data);
        } catch (error) {
            console.error("Falha ao buscar contribuintes:", error);
            notification.error({ message: "Erro ao buscar contribuintes" });
        }
    };

    const fetchInfracoes = async () => {
        try {
            const response = await fetch("http://localhost:3000/infracoes");
            const data = await response.json();
            setInfracoes(data);
        } catch (error) {
            console.error("Falha ao buscar infrações:", error);
            notification.error({ message: "Erro ao buscar infrações" });
        }
    };

    const contribuintesOptions = contribuintes.map((c) => ({
        value: c.id.toString(),
        label: `${c.nome} (${c.cpf})`,
    }));

    const infracoesOptions = infracoes.map((c) => ({
        value: c.id.toString(),
        label: `${c.titulo})`,
    }));

    const handleSubmit = async (values) => {
        console.log("Form Values:", values);
        // Aqui você pode formatar os dados conforme necessário e enviar para a API
        // Exemplo: await fetch('http://localhost:3000/processos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
    };
    const handleContribuinteSelect = (value, option, index) => {
        // Atualiza o campo de contribuintes com o ID selecionado
        let contribuintesAtualizados = form.getFieldValue("contribuintes");
        contribuintesAtualizados[index] = { id: value };
        form.setFieldsValue({ contribuintes: contribuintesAtualizados });

        // Para o primeiro contribuinte, atualiza também os campos nome e cpf
        if (index === 0) {
            const contribuinteSelecionado = contribuintes.find((c) => c.id.toString() === value);
            form.setFieldsValue({
                nome: contribuinteSelecionado.nome,
                cpf: contribuinteSelecionado.cpf,
            });
        }
    };

    const handleInfraçãoSelect = (value, option, index) => {
        // Atualiza o campo de contribuintes com o ID selecionado
        let infracoesAtualizados = form.getFieldValue("infracoes");
        infracoesAtualizados[index] = { id: value };
        form.setFieldsValue({ infracoes: infracoesAtualizados });
    };

    // Reseta os campos adicionais quando troca o tipo
    const tipoProcesso = Form.useWatch("tipo", form);
    useEffect(() => {
        form.resetFields([
            "numeroAvisoCobranca",
            "chassi",
            "placa",
            "renavan",
            "numeroAutoConstatacao",
            "numeroAutoInfracao",
            "numeroAvisoCobranca",
            "numeroFundeic",
            "numeroInadimplementoContratual",
            "acordoParcelamento",
            "parcelaAcordada",
            "parcelaPaga",
            "termoRemessa",
            "numeroProdei",
            "numeroSentenca",
            "numeroReclamacao",
            "numeroTac",
            "numeroTcc",
            "numeroAcordo",
            "numeroSentenca",
            "numeroAiim",
            "numeroTrfc",
        ]);
    }, [tipoProcesso]);

    return (
        <div>
            <PageHeader>
                <Space style={{ alignItems: "baseline" }}>
                    <Title level={2} style={{ margin: "0" }}>
                        Novo Processo
                    </Title>
                </Space>
                <Space>
                    <Button type="primary">Criar processo</Button>
                    <Button danger>Cancelar</Button>
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
                    }}
                >
                    <Divider orientation="left" orientationMargin="0">
                        Detalhes do Processo
                    </Divider>
                    <Form.Item name="tipo" label="Tipo de processo">
                        <Select showSearch placeholder="Tipo de processo" options={opcoesTipoProcesso} />
                    </Form.Item>
                    {tipoProcesso === "1" && (
                        <>
                            <Form.Item name="numeroAutoConstatacao" label="Nº do Auto da Constatação">
                                <Input placeholder="Nº do Auto da Constatação" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "2" && (
                        <>
                            <Form.Item name="numeroAutoInfracao" label="Nº do Auto da Infração">
                                <Input placeholder="Nº do Auto da Infração" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "3" && (
                        <>
                            <Form.Item name="numeroAvisoCobranca" label="Nº do Aviso de Cobrança">
                                <Input placeholder="Nº do Aviso de Cobrança" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "4" && <></>}
                    {tipoProcesso === "5" && (
                        <>
                            <Form.Item name="numeroFundeic" label="Nº do FUNDEIC">
                                <Input placeholder="Nº do FUNDEIC" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "6" && (
                        <>
                            <Form.Item name="numeroInadimplementoContratual" label="Nº do Inadimplemento Contratual">
                                <Input placeholder="Nº do Inadimplemento Contratual" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "7" && (
                        <>
                            <Form.Item name="acordoParcelamento" label="Nº do acordo de parcelamento">
                                <Input placeholder="Nº do acordo de parcelamento" />
                            </Form.Item>
                            <Form.Item name="parcelaAcordada" label="Nº das parcelas acordada">
                                <Input placeholder="Nº das parcelas acordada" />
                            </Form.Item>
                            <Form.Item name="parcelaPaga" label="Parcelas pagas">
                                <Input placeholder="Nº das Parcelas pagas" />
                            </Form.Item>
                            <Form.Item name="termoRemessa" label="Nº do termo remessa">
                                <Input placeholder="Nº do termo remessa" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "8" && (
                        <>
                            <Form.Item name="numeroProdei" label="Nº Prodei">
                                <Input placeholder="Nº Prodei" />
                            </Form.Item>
                            <Form.Item name="numeroSentenca" label="Nº da Sentença">
                                <Input placeholder="Nº da Sentença" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "9" && (
                        <>
                            <Form.Item name="numeroReclamacao" label="Nº da Reclamação">
                                <Input placeholder="Nº da Reclamação" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "10" && (
                        <>
                            <Form.Item name="numeroTac" label="Nº do TAC">
                                <Input placeholder="Nº do TAC" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "11" && (
                        <>
                            <Form.Item name="numeroTcc" label="Nº do TCC">
                                <Input placeholder="Nº do TCC" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "12" && (
                        <>
                            <Form.Item name="numeroAcordo" label="Nº do acordo">
                                <Input placeholder="Nº do acordo" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "13" && (
                        <>
                            <Form.Item name="numeroSentenca" label="Nº da sentença">
                                <Input placeholder="Nº da sentença" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "14" && (
                        <>
                            <Form.Item name="numeroAvisoCobranca" label="Nº do aviso de cobrança">
                                <Input placeholder="Nº do aviso de cobrança" />
                            </Form.Item>
                            <Form.Item name="placa" label="Placa">
                                <Input placeholder="Placa" />
                            </Form.Item>
                            <Form.Item name="renavan" label="Renavan">
                                <Input placeholder="Renavan" />
                            </Form.Item>
                            <Form.Item name="chassi" label="Chassi">
                                <Input placeholder="Chassi" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "15" && (
                        <>
                            <Form.Item name="numeroAiim" label="Nº AIIM">
                                <Input placeholder="Nº AIIM" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "16" && (
                        <>
                            <Form.Item name="numeroTrfc" label="Nº TRFC">
                                <Input placeholder="Nº TRFC" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "17" && (
                        <>
                            <Form.Item name="numeroAvisoCobranca" label="Nº do aviso de cobrança">
                                <Input placeholder="Nº do aviso de cobrança" />
                            </Form.Item>
                            <Form.Item name="placa" label="Placa">
                                <Input placeholder="Placa" />
                            </Form.Item>
                            <Form.Item name="renavan" label="Renavan">
                                <Input placeholder="Renavan" />
                            </Form.Item>
                            <Form.Item name="chassi" label="Chassi">
                                <Input placeholder="Chassi" />
                            </Form.Item>
                        </>
                    )}
                    {tipoProcesso === "18" && <></>}
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
                    <Form.Item name="nmrProcessoAdm" label="Nº do processo administrativo">
                        <Input placeholder="Nº do processo administrativo" />
                    </Form.Item>
                    <Form.Item name="dataConstuitcaoProcesso" label="Data de constituição">
                        <DatePicker placeholder="Data de constituição do processo" format={dateFormat} />
                    </Form.Item>
                    <Form.Item name="dataCadastro" label="Data de cadastro">
                        <DatePicker placeholder="Data de cadastro" format={dateFormat} />
                    </Form.Item>
                    <Form.Item name="dataConstituicaoJuros" label="Data de constituição de juros">
                        <DatePicker placeholder="Data de constituicao de juros" format={dateFormat} />
                    </Form.Item>
                    <Form.Item name="dataNegativacao" label="Data de negativação">
                        <DatePicker placeholder="Data de negativação" format={dateFormat} />
                    </Form.Item>
                    <Form.Item name="nmrLivro" label="Nº do livro">
                        <Input placeholder="Nº do livro" />
                    </Form.Item>
                    <Form.Item name="nmrFolha" label="Nº da folha">
                        <Input placeholder="Nº da folha" />
                    </Form.Item>
                    <Form.Item name="unidadeAjuizamento" label="Unidade de Ajuizamento">
                        <Input placeholder="Unidade de Ajuizamento" />
                    </Form.Item>
                    <Form.Item name="orgao" label="Orgão" rules={[{ required: true, message: "Orgão é obrigatório!" }]}>
                        <Select showSearch placeholder="Orgão" options={opcoesOrgaos} />
                    </Form.Item>
                    <Form.Item name="inscEstadual" label="Inscrição estadual">
                        <Input placeholder="Inscrição estadual" />
                    </Form.Item>
                    <Form.Item name="processoProtestado" label="Processo protestado">
                        <Input placeholder="Inscrição estadual" />
                    </Form.Item>
                    <Form.Item name="situacaoNegativacao" label="Situação de negativação">
                        <Input placeholder="Situação de negativação" />
                    </Form.Item>
                    <Form.Item name="tipoJuro" label="Tipo de juro">
                        <Select placeholder="Tipo de correção" options={juroOptions} allowClear />
                    </Form.Item>
                    <Form.Item name="tipoCorrecao" label="Tipo de correção">
                        <Select placeholder="Tipo de correção" options={correcaoOptions} allowClear />
                    </Form.Item>

                    <Form.Item
                        name="descricao"
                        label="Descrição"
                        rules={[{ required: true, message: "Por favor, insira a descrição do processo!" }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Descrição do processo"
                            autoSize={{ minRows: 3, maxRows: 5 }}
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
                                        name={[name, "id"]}
                                        label={index === 0 ? "Contribuinte" : "Contribuinte solidário"}
                                        rules={[{ required: true, message: "Contribuinte é obrigatório!" }]}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                            <AutoComplete
                                                options={contribuintesOptions}
                                                onSelect={(value, option) =>
                                                    handleContribuinteSelect(value, option, index)
                                                }
                                                placeholder="Digite nome ou CPF"
                                                style={{ width: "calc(100% - 32px)" }}
                                                filterOption={(inputValue, option) =>
                                                    option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                                }
                                            />
                                            {index > 0 && (
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                    style={{ color: "#ff4d4f", marginLeft: 8, cursor: "pointer" }}
                                                />
                                            )}
                                        </div>
                                    </Form.Item>
                                ))}
                                <div style={{ width: "100%", textAlign: "center" }}>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                        style={{ width: "600px", textAlign: "center" }}
                                    >
                                        Adicionar Contribuinte
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form.List>
                    <Divider orientation="left" orientationMargin="0">
                        Infrações
                    </Divider>
                    <Form.List name="infracoes">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }, index) => (
                                    <>
                                        <Form.Item {...restField} name={[name, "id"]} label="Infração">
                                            <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                                                <AutoComplete
                                                    options={infracoesOptions}
                                                    onSelect={(value, option) =>
                                                        handleInfraçãoSelect(value, option, index)
                                                    }
                                                    placeholder="Digite o título da infração"
                                                    style={{ width: "calc(100% - 32px)" }}
                                                    filterOption={(inputValue, option) =>
                                                        option.label.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                                                        -1
                                                    }
                                                />
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                    style={{ color: "#ff4d4f", marginLeft: 8, cursor: "pointer" }}
                                                />
                                            </div>
                                        </Form.Item>
                                        <Form.List name={[name, "fatosGeradores"]}>
                                            {(fatosFields, { add: addFato, remove: removeFato }) => (
                                                <>
                                                    {fatosFields.map((fatoField, fatoIndex) => (
                                                        <>
                                                            <Card
                                                                key={fatoField.key}
                                                                title={`Fato Gerador ${fatoIndex + 1}`}
                                                                extra={
                                                                    <MinusCircleOutlined
                                                                        onClick={() => removeFato(fatoField.name)}
                                                                        style={{
                                                                            color: "#ff4d4f",
                                                                            marginLeft: 8,
                                                                            cursor: "pointer",
                                                                        }}
                                                                    />
                                                                }
                                                                style={{ marginBottom: "16px" }}
                                                                type="inner"
                                                            >
                                                                <Form.Item
                                                                    {...fatoField}
                                                                    name={[fatoField.name, "dataFato"]}
                                                                    label="Data do Fato"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Data do fato é obrigatória!",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <DatePicker format={dateFormat} />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...fatoField}
                                                                    name={[fatoField.name, "dataVencimento"]}
                                                                    label="Data de vencimento"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message:
                                                                                "Data de vencimento do fato é obrigatória!",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <DatePicker format={dateFormat} />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...fatoField}
                                                                    name={[fatoField.name, "situacaoFato"]}
                                                                    label="Situação do fato"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Situação do fato é obrigatório!",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        showSearch
                                                                        placeholder="Situação do fato"
                                                                        options={situacaoFatoOptions}
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...fatoField}
                                                                    name={[fatoField.name, "tipoValor"]}
                                                                    label="Tipo do valor"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Tipo do valor é obrigatório!",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        placeholder="Tipo do valor"
                                                                        options={tipoValorFato}
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...fatoField}
                                                                    name={[fatoField.name, "valorFato"]}
                                                                    label="Valor do fato"
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "Valor do fato é obrigatório!",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <InputNumber
                                                                        addonAfter={
                                                                            <Form.Item
                                                                                {...fatoField}
                                                                                name={[
                                                                                    fatoField.name,
                                                                                    "unidadeReferenciaValor",
                                                                                ]}
                                                                                rules={[
                                                                                    {
                                                                                        required: true,
                                                                                    },
                                                                                ]}
                                                                                style={{ padding: "0", margin: "0" }}
                                                                            >
                                                                                <Select
                                                                                    defaultValue="UPF"
                                                                                    style={{
                                                                                        width: 80,
                                                                                    }}
                                                                                >
                                                                                    <Option value="UPF">UPF</Option>
                                                                                    <Option value="UFIR">UFIR</Option>
                                                                                </Select>
                                                                            </Form.Item>
                                                                        }
                                                                        formatter={(value) =>
                                                                            `$ ${value}`.replace(
                                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                                ","
                                                                            )
                                                                        }
                                                                        parser={(value) =>
                                                                            value.replace(/\$\s?|(,*)/g, "")
                                                                        }
                                                                    />
                                                                </Form.Item>

                                                                <Form.Item
                                                                    {...fatoField}
                                                                    name={[fatoField.name, "valorQuitadoFato"]}
                                                                    label="Valor quitado do fato"
                                                                >
                                                                    <InputNumber
                                                                        formatter={(value) =>
                                                                            `$ ${value}`.replace(
                                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                                ","
                                                                            )
                                                                        }
                                                                        parser={(value) =>
                                                                            value.replace(/\$\s?|(,*)/g, "")
                                                                        }
                                                                        style={{ width: "277px" }}
                                                                    />
                                                                </Form.Item>
                                                            </Card>
                                                        </>
                                                    ))}
                                                    <div style={{ width: "100%", textAlign: "center" }}>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => addFato()}
                                                            icon={<PlusOutlined />}
                                                            style={{
                                                                width: "600px",
                                                                textAlign: "center",
                                                                marginBottom: "32px",
                                                            }}
                                                        >
                                                            Adicionar Fato Gerador
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </Form.List>
                                    </>
                                ))}
                                <div style={{ width: "100%", textAlign: "center" }}>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                        icon={<PlusOutlined />}
                                        style={{ width: "600px", textAlign: "center" }}
                                    >
                                        Adicionar Infração
                                    </Button>
                                </div>
                            </>
                        )}
                    </Form.List>
                    {/* <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Typography>
                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                            </Typography>
                        )}
                    </Form.Item> */}
                    <Form.Item style={{ padding: "32px" }}>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Criar Processo
                            </Button>
                            <Button danger>Cancelar</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </CardContent>
        </div>
    );
};

export default CriarProcesso;
