import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Record from "./pages/Record";
import Report from "./pages/Report";
import Mypage from "./pages/Mypage";
import SelectAvatar from "./pages/SelectAvatar";
import Splash from "./pages/Splash";
import StartScreen from "./pages/StartScreen";
import Signup from "./pages/Signup";
import { useEffect, useState } from "react";
import { checkAuth } from "./utils/auth";
import { Toaster } from "react-hot-toast";
import Notifications from "./pages/Notifications";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 스플래시 2초 표시
    return () => clearTimeout(timer);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: () => {
            checkAuth();
            return null;
          },
        },
        {
          path: "/record",
          element: <Record />,
          loader: () => {
            checkAuth();
            return null;
          },
        },
        {
          path: "/report",
          element: <Report />,
          loader: () => {
            checkAuth();
            return null;
          },
        },
        {
          path: "/mypage",
          element: <Mypage />,
          loader: () => {
            checkAuth();
            return null;
          },
        },
        {
          path: "/notifications",
          element: <Notifications />,
          loader: () => {
            checkAuth();
            return null;
          },
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/select-character",
          element: <SelectAvatar />,
        },
        {
          path: "/start",
          element: <StartScreen />,
        },
      ],
    },
  ]);

  if (loading) return <Splash />;

  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          success: {
            style: {
              background: "#E6F4EA",
              color: "#0F9D58",
            },
          },
          error: {
            style: {
              background: "#FDEAEA",
              color: "#D93025",
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
