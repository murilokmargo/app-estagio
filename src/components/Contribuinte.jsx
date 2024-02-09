import { Descriptions } from "antd";
import CardContent from "./CardContent";

const criarItensContribuinte = (contribuinte, index) => {
    const dadosContribuinte = [
        { key: "nome", label: "Nome", value: contribuinte.nome },
        { key: "cpf", label: "CPF", value: contribuinte.cpf },
        { key: "rg", label: "RG", value: contribuinte.rg },
        { key: "score", label: "Score", value: contribuinte.score },
        { key: "dataObito", label: "Data de Óbito", value: contribuinte.dataObito },
        { key: "porte", label: "Porte", value: contribuinte.porte },
        { key: "endereco", label: "Endereço", value: contribuinte.endereco },
    ];

    // Filtrar campos nulos ou indefinidos
    const items = dadosContribuinte.reduce((acc, { key, label, value }) => {
        if (value !== null && value !== undefined) {
            acc.push({
                key,
                label,
                children: <p>{value.toString()}</p>,
            });
        }
        return acc;
    }, []);

    const titulo = `${index === 0 ? "Contribuinte" : "Contribuinte Solidário"}: ${contribuinte.nome}${
        contribuinte.recJudicial ? " - Em Recisão Judicial" : ""
    }`;

    return { titulo, itens: items };
};

const Contribuinte = ({ contribuintes }) => {
    return (
        <>
            {contribuintes.map((contribuinte, index) => {
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
            })}
        </>
    );
};

export default Contribuinte;
