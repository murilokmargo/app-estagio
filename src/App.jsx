import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import MLayout from './components/Layout/MLayout';

function App() {

  const Layout = () => {
    return (
      <div className='app'>
        <MLayout>
          <Outlet />
        </MLayout>
      </div>)
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{
        path: "/",
        element: <div>Home</div>
      }]
    },
    {
      path: "/processo",
      element: <Layout />,
      children: [{
        path: "/processo",
        element: <div>Processo</div>
      }]
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
