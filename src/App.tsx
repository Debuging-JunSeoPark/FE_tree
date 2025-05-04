import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Record from "./pages/Record";
import Report from "./pages/Report";
import Mypage from "./pages/Mypage";
import SelectAvatar from "./pages/SelectAvatar";
import Splash from "./pages/Splash";
import { useEffect, useState } from "react";
import StartScreen from "./pages/StartScreen";
import Signup from "./pages/Signup";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2초 후에 로딩 상태 변경

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/record", element: <Record /> },
        { path: "/report", element: <Report /> },
        { path: "/mypage", element: <Mypage /> },
      ],
    },
    {
      path: "/login",
      element: <Login />, // ✅ Layout 없이 별도 라우트로
    },
    { path: "/signup", 
      element: <Signup /> },
    {
      path: "/select-character",
      element: <SelectAvatar />,
    },
    {
      path: "/start",
      element: <StartScreen />,
    },
  ]);
  if (loading) return <Splash />;
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
