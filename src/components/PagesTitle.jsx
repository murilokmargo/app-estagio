const estilo = {
    container: {
        padding: "24px 0",
        width: "90%",
        margin: "auto",
    },
};

const PageTitle = ({ children }) => {
    return <div style={estilo.container}>{children}</div>;
};

export default PageTitle;
