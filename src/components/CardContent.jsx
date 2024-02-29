import { Content } from "antd/es/layout/layout";

const estilo = {
    content: {
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "4px 4px 6px rgba(0, 0, 0, .2)"
    },
};

const CardContent = ({ children }) => {
    return <Content style={estilo.content}>{children}</Content>;
};

export default CardContent;
