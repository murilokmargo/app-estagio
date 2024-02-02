import { Space } from "antd";

const estilo = {
    container: {
        padding: "24px 0",
        display: "flex",
        justifyContent: "space-between",
    },
};

const PageHeader = ({ children }) => {
    return <Space style={estilo.container}>{children}</Space>;
};

export default PageHeader;
