import { Card, Descriptions, Modal } from "antd";
import React from "react";

export function DecisoesAdministrativasProcesso({ isModalOpen, handleModalCancel, detalheProcesso }) {
    return <Modal title="Decisões Administrativas" open={isModalOpen} onCancel={handleModalCancel} footer={null}>
        {detalheProcesso.decisoesAdministrativas.map((decisao) => (
            <Card style={{ marginTop: "16px" }} type="inner" title={decisao.nDa}>
                <Descriptions key={decisao.id} size="small" column={2}>
                    {/* <Descriptions.Item label="Número DA">{decisao.nDa}</Descriptions.Item> */}
                    <Descriptions.Item label="Criado Por">{decisao.criadoPor}</Descriptions.Item>
                    <Descriptions.Item label="Criado Em">{decisao.criadoEm}</Descriptions.Item>
                    <Descriptions.Item label="Consumido Por">{decisao.consumidoPor}</Descriptions.Item>
                    <Descriptions.Item label="Consumido Em">{decisao.consumidoEm}</Descriptions.Item>
                    {decisao.item ? (
                        <Descriptions.Item label="Item" span={2}>
                            {decisao.item}
                        </Descriptions.Item>
                    ) : (
                        []
                    )}
                </Descriptions>
            </Card>
        ))}
    </Modal>;
}
