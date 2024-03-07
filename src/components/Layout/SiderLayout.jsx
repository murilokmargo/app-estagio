import React, { useState } from "react";
import { GroupOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";
import { Link } from "react-router-dom";

const estilo = {
    title: {
        color: "white",
        alignContent: "center",
        margin: "0",
        textAlign: "center",
        fontSize: "48px",
        height: "64px",
    },
};

function getItem(label, key, icon, children) {
    return {
        label,
        key,
        icon,
        children,
    };
}

const items = [
    getItem("Processos", "1", <FileOutlined />, [
        getItem(<Link to="/processos">CDA's</Link>, "2"),
        getItem("Decisões administrativas", "3"),
    ]),
    getItem("Tabelas", "4", <GroupOutlined />),
    getItem("Consulta", "5", <PieChartOutlined />),
];

const SiderLayout = () => {
    const [current, setCurrent] = useState();
    const onClick = (e) => {
        console.log(e);
        setCurrent(e.key);
    };

    return (
        <Sider theme="dark" width={"12%"}>
            <div>
                <Link to="/">
                    <Title level={1} strong style={estilo.title} onClick={onClick}>
                        SADA
                    </Title>
                </Link>
            </div>
            <Menu
                theme="dark"
                mode="inline"
                items={items}
                selectedKeys={[current]}
                style={estilo.menu}
                onClick={onClick}
            />
        </Sider>
    );
};

export default SiderLayout;
