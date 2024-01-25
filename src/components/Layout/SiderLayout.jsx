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
    getItem(<Link to="/processos">Processos</Link>, "1", <FileOutlined />),
    getItem("Tabelas", "2", <GroupOutlined />),
    getItem("User", "sub1", <UserOutlined />, [getItem("Tom", "3"), getItem("Bill", "4"), getItem("Alex", "5")]),
    getItem("Team", "sub2", <TeamOutlined />, [getItem("Team 1", "6"), getItem("Team 2", "8")]),
    getItem("Files", "9", <PieChartOutlined />),
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
                    <Title level={1} style={estilo.title} onClick={onClick}>
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
