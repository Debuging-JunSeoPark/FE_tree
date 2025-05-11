import { useState } from "react";
import logo from "../assets/images/logoGreen.svg";
import { useNavigate } from "react-router-dom";
import GetStartedButton from "../components/GetStartedButton";
import Header from "../components/Header";
import { postLogin } from "../apis/auth";
import Cookies from "js-cookie";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const res = await postLogin({ email, password });
      alert("로그인 성공!");

      // ✅ 쿠키에 토큰 저장 (1일 유지)
      Cookies.set("accessToken", res.token, { expires: 1 });

      // 다른 정보도 필요하면 저장 가능
      Cookies.set("userId", res.id.toString());
      if (res.profileComplete) {
        navigate("/");
      } else {
        navigate("/select-character");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          alert("이메일 또는 비밀번호가 올바르지 않습니다.");
        } else {
          alert("로그인 중 오류가 발생했습니다.");
          console.error("로그인 실패", error);
        }
      } else {
        alert("예기치 못한 오류가 발생했습니다.");
        console.error("알 수 없는 오류", error);
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start px-6 py-8 bg-white">
      <Header title="Log In" showLogo={false} />
      <img src={logo} alt="tree logo" className="w-24 h-auto mt-20 mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h2>

      {/* 소셜 로그인 버튼 */}
      <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg my-2 shadow-sm">
        <img
          src="https://www.svgrepo.com/show/355037/google.svg"
          alt="Google"
          className="w-5 h-5"
        />
        Log in with Google
      </button>

      <button className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded-lg my-2 shadow-sm">
        <img
          src="https://www.svgrepo.com/show/452196/facebook-1.svg"
          alt="Facebook"
          className="w-5 h-5"
        />
        Log in with Facebook
      </button>

      <p className="text-[#87CEAB] text-sm mt-4 mb-2 font-medium">
        OR LOG IN WITH EMAIL
      </p>

      {/* 이메일/비밀번호 입력 */}
      <div className="w-full flex flex-col gap-3">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="password"
          />
        </div>
      </div>

      {/* 로그인 버튼 */}
      <GetStartedButton className="mt-6" label="LOG IN" onClick={handleLogin} />

      {/* 추가 메뉴 */}
      <button
        className="mt-3 text-sm text-gray-600 underline"
        onClick={() => alert("비밀번호 찾기 기능 준비 중")}
      >
        Forgot Password?
      </button>

      <p className="text-gray-400 text-sm mt-4">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-[#87CEAB] underline cursor-pointer font-medium"
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;