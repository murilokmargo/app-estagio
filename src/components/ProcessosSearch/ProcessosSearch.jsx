import React from "react";
import { Form, Input, Select, Button, Row, Col } from "antd";
import * as estilos from "./style.js"
import mapeamentoDeTipos from "../../utils/MapeamentoDeTipos.js";
import mapeamentoDeSituacao from "../../utils/MapeamentoDeSituacao.js";

const opcoesTipoProcesso = Object.entries(mapeamentoDeTipos).map((entry) => ({ key: entry[0], value: entry[0], label: entry[1] }));
const opcoesSituacaoProcesso = Object.entries(mapeamentoDeSituacao).map((entry) => ({ key: entry[0], value: entry[0], label: entry[1] }));


const ProcessosSearch = ({ onSearch, form }) => {


    return (
        <Form form={form} onFinish={onSearch} layout="inline" style={estilos.form}>
            <Row gutter={16} style={estilos.row}>
                <Col xs={24} sm={12} md={6} lg={6}>
                    <Form.Item name="nome" style={{ width: "100%" }}>
                        <Input placeholder="Nome ou CPF" />
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
            <Row gutter={16} style={estilos.row}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Form.Item name="situacao" style={{ width: "100%" }}>
                        <Select showSearch mode="multiple" placeholder="Situação do processo" options={opcoesSituacaoProcesso} />
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
            <Row style={estilos.buttonsRow}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Pesquisar
                    </Button>
                </Form.Item>
                <Button
                    style={estilos.searchButton}
                    onClick={() => {
                        form.resetFields();
                    }}
                >
                    Limpar
                </Button>
            </Row>
        </Form>
    )
}

export default ProcessosSearch;