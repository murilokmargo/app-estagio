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

        fetch(`http://localhost:3000/processos?${queryString}`)
            .then((response) => {
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
                setLoading(false);
            });
    };

    return ({ loading, data, fetchData, pagination })
}

export default useGetProcessos;