import { Header } from "antd/es/layout/layout";
import { Avatar, Menu, Space, Tooltip } from "antd";

const estilo = {
    header: {
        backgroundColor: "white",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    avatar: {
        backgroundColor: "skyblue",
    }
}

const items = [
    {
        key: "1",
        label: "Admin",
    },
];

const User = "Murilo Camargo";

const HeaderLayout = () => {
    const userIsAdmin = true;

    return (
        <Header style={estilo.header}>
            <Space>
                {userIsAdmin && <Menu mode="horizontal" items={items} />}
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
