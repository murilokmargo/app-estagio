import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import MLayout from "./components/Layout/MLayout";
import Processos from "./pages/processos/Processos";

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
            ],
        },
        {
            path: "/processos",
            element: <Layout />,
            children: [
                {
                    path: "/processos",
                    element: <Processos />,
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
