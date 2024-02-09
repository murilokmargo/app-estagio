import {
    FileAddOutlined,
    FileDoneOutlined,
    HighlightOutlined,
    InfoCircleOutlined,
    FileExcelOutlined,
    FileSyncOutlined,
    AuditOutlined,
} from "@ant-design/icons";
import { Button, Descriptions, Popover, Timeline } from "antd";
import CardContent from "./CardContent";

const getPropsForTransition = (estadoFinal) => {
    switch (estadoFinal) {
        case "Inscrito":
            return { icon: <HighlightOutlined />, color: "blue" };
        case "Cancelado":
            return { icon: <FileExcelOutlined />, color: "red" };
        case "Suspenso":
            return { icon: <FileSyncOutlined />, color: "gray" };
        case " Pagamento":
            return { icon: <FileDoneOutlined />, color: "green" };
        default:
            return <FileAddOutlined />; // Um ícone padrão para outros casos
    }
};

const TimeLineProcesso = ({ detalheProcesso }) => {
    const timelineItems = [
        {
            dot: <AuditOutlined />,
            color: "blue",
            children: `Processo constituido em ${detalheProcesso.dataConstuitcaoProcesso}`,
        },
        {
            dot: <FileAddOutlined />,
            color: "green",
            children: `Processo cadastrado em ${detalheProcesso.dataCadastro}`,
        },

        ...detalheProcesso.transicoes.map((transicao) => {
            const { icon, color } = getPropsForTransition(transicao.estadoFinal);
            return {
                dot: icon,
                color: color,
                children: (
                    <Popover
                        content={<p style={{ maxWidth: 360 }}>{transicao.descricao}</p>}
                        title="Descrição"
                        trigger="click"
                    >
                        <span style={{ cursor: "pointer" }}>
                            Processo {transicao.estadoFinal} em {transicao.data} por {transicao.usuario}
                            <InfoCircleOutlined style={{ marginLeft: 5, color: "blue" }} />
                        </span>
                    </Popover>
                ),
            };
        }),
    ];

    return (
        <CardContent>
            <Descriptions title="Transições" extra={<Button icon={<FileSyncOutlined />}>Nova transição</Button>} />
            <Timeline mode="alternate" items={timelineItems} />
        </CardContent>
    );
};

export default TimeLineProcesso;
