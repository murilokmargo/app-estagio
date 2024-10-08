import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import MLayout from "./components/Layout/MLayout";
import Processos from "./pages/processos/Processos";
import Processo from "./pages/processo/Processo";
import CriarProcesso from "./pages/criarProcesso/CriarProcesso";

function App() {
    const Layout = () => {
        return (
            <div className="app">
                <MLayout>
                    <Outlet />
                </MLayout>
            </div>
        );
    };

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    path: "/",
                    element: <div>Home</div>,
                },
                {
                    path: "processos",
                    element: <Processos />,
                },
                {
                    path: "processos/:id",
                    element: <Processo />,
                },
                {
                    path: "processos/criar",
                    element: <CriarProcesso />,
                },
            ],
        },
    ]);

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
