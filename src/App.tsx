import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      path: "/login",
      element: <Login />, // ✅ Layout 없이 별도 라우트로
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
