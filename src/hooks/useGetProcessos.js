import { notification } from "antd";
import { useState } from "react";

const useGetProcessos = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]); // Dados da tabela
    const [pagination, setPagination] = useState({
        current: 1, // Página atual
        pageSize: 10, // Quantidade de itens por página
        total: 0, // Total de itens (necessário para o componente de paginação do Ant Design)
    });

    const fetchData = (searchParams = {}, page = 1, pageSize = 10) => {
        setLoading(true);

        const controller = new AbortController();
        const { signal } = controller;

        // Define um tempo limite para a requisição
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        // Construir a query string para a busca
        let queryParts = Object.keys(searchParams)
            .filter((key) => searchParams[key] && searchParams[key].toString().trim() !== "")
            .map((key) => {
                if (Array.isArray(searchParams[key]) && searchParams[key].length > 0) {
                    return `${key}=${encodeURIComponent(searchParams[key][0])}`;
                } else {
                    return `${key}=${encodeURIComponent(searchParams[key])}`;
                }
            });

        let queryString = [`_page=${page}`, `_limit=${pageSize}`, ...queryParts].join("&");

        fetch(`http://localhost:3000/processos?${queryString}`, { signal })
            .then((response) => {
                clearTimeout(timeoutId);
                const total = response.headers.get("X-Total-Count");
                setPagination({ ...pagination, total: parseInt(total, 10), current: page, pageSize: pageSize });

                return response.json();
            })
            .then((data) => {
                setData(data.map((item) => ({ ...item, key: item.id })));
                console.log(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados:", error);
                notification.error({
                    message: "Erro na busca dos dados",
                    description: "Não foi possível recuperar os dados. Por favor, tente novamente mais tarde.",
                    duration: 7, // Mantém a notificação visível até que o usuário feche
                });
                setLoading(false);
            });
    };

    return { loading, data, fetchData, pagination };
};

export default useGetProcessos;
