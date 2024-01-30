import { Header } from "antd/es/layout/layout";
import { Avatar, Menu, Space, Tooltip } from "antd";

const estilo = {
    header: {
        backgroundColor: "white",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        overflow: "visible",
    },
    avatar: {
        backgroundColor: "skyblue",
    },
    menu: {
        width: "150px",
        justifyContent: "center",
    },
};

const items = [
    {
        key: "1",
        label: "Administrador",
    },
];

const User = "Murilo Camargo";

const HeaderLayout = () => {
    const userIsAdmin = true;

    return (
        <Header style={estilo.header}>
            <Space>
                {userIsAdmin && <Menu mode="horizontal" items={items} style={estilo.menu} />}
                <Tooltip placement="bottomLeft" title={User}>
                    <Avatar size="large" style={estilo.avatar}>
                        {User.slice(0, 2)}
                    </Avatar>
                </Tooltip>
            </Space>
        </Header>
    );
};

export default HeaderLayout;
