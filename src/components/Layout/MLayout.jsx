import { Layout } from "antd";
import SiderLayout from "./SiderLayout";
import HeaderLayout from "./HeaderLayout";
import { Content } from "antd/es/layout/layout";
import FooterLayout from "./FooterLayout";

const estilo = {
    content: {
        backgroundColor: "#ffffff",
        width: "90%",
        margin: "48px auto 0 auto",
        borderRadius: "16px",
        padding: "24px",
    },
};

const MLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SiderLayout />
            <Layout style={{ backgroundColor: "#f0f5ff" }}>
                <HeaderLayout />
                <Content style={estilo.content}>{children}</Content>
                <FooterLayout />
            </Layout>
        </Layout>
    );
};

export default MLayout;
