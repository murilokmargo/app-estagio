import { Descriptions } from "antd";
import CardContent from "./CardContent";

const criarItensContribuinte = (contribuinte, index) => {
    const titulo = `${index === 0 ? "Contribuinte" : "Contribuinte Solidário"}: ${contribuinte.nome}${contribuinte.recJudicial ? " - Em Recisão Judicial" : ""
        }`;
    const itens = Object.entries(contribuinte)
        .map(([key, value]) => {
            if (key === "recJudicial" || value === null) return null; // Ignora 'recJudicial' e valores nulos
            return {
                label: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " "),
                children: value.toString(),
            };
        })
        .filter(Boolean); // Remove itens nulos
    return { titulo, itens };
};

const Contribuinte = ({ detalheProcesso }) => {



    return <>
        {detalheProcesso.contribuinte.map((contribuinte, index) => {
            const { titulo, itens } = criarItensContribuinte(contribuinte, index);
            return (
                <>
                    <CardContent key={index} style={{ marginBottom: "16px" }}>
                        <Descriptions title={titulo}>
                            {itens.map((item, itemIndex) => (
                                <Descriptions.Item key={itemIndex} label={item.label}>
                                    {item.children}
                                </Descriptions.Item>
                            ))}
                        </Descriptions>
                    </CardContent>
                    <br />
                </>
            );
        })}</>
}

export default Contribuinte;