import { Footer } from "antd/es/layout/layout";

const estilo = {
    footer: {
        textAlign: "center",
        backgroundColor: "#f0f5ff"
    }
}

const FooterLayout = () => {
    return (
        < Footer style={estilo.footer}>
            <p>Governo Federal de Mato Grosso 2024</p>
        </Footer >
    );
};

export default FooterLayout;
