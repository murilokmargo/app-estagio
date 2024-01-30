import { Footer } from "antd/es/layout/layout";

const estilo = {
    footer: {
        textAlign: "center",
        backgroundColor: "#f0f5ff",
    },
};

const FooterLayout = () => {
    return (
        <Footer style={estilo.footer}>
            <p>Governo do Estado de Mato Grosso {new Date().getFullYear()}</p>
        </Footer>
    );
};

export default FooterLayout;
