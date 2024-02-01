import { Content } from "antd/es/layout/layout";

const estilo = {
    content: {
        backgroundColor: "#ffffff",
        width: "90%",
        margin: "0 auto",
        borderRadius: "16px",
        padding: "24px",
    },
};

const CardContent = ({ children }) => {
    return <Content style={estilo.content}>{children}</Content>;
};

export default CardContent;
