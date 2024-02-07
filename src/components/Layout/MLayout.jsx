import { Layout } from "antd";
import SiderLayout from "./SiderLayout";
import HeaderLayout from "./HeaderLayout";
import { Content } from "antd/es/layout/layout";
import FooterLayout from "./FooterLayout";

const MLayout = ({ children }) => {
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <SiderLayout />
            <Layout style={{ backgroundColor: "#d6e4ff" }}>
                <HeaderLayout />
                <Content style={{ width: "90%", margin: "auto" }}>{children}</Content>
                <FooterLayout />
            </Layout>
        </Layout>
    );
};

export default MLayout;
