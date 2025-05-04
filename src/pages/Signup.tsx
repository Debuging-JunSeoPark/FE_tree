import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../assets/images/logoGreen.svg";
import GetStartedButton from "../components/GetStartedButton";

function Signup() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreed, setAgreed] = useState(false);

    return (
        <div className="w-full h-screen flex flex-col items-center justify-start px-6 py-8 bg-white">
            {/* 상단 바 */}
            <div className="w-full h-[48px] flex items-center justify-between border-b border-gray-200 mb-6">
                <button onClick={() => navigate(-1)} className="text-xl">
                    <IoIosArrowBack />
                </button>
                <div className="text-lg font-semibold">Sign Up</div>
                <div className="w-6" />
            </div>

            {/* 로고 및 타이틀 */}
            <img src={logo} alt="tree logo" className="w-24 h-auto mb-3" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Create your account
            </h2>

            {/* 소셜 로그인 */}
            <button className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-lg mb-2 shadow-sm">
                <img
                    src="https://www.svgrepo.com/show/355037/google.svg"
                    alt="Google"
                    className="w-5 h-5"
                />
                Sign in with Google
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded-lg mb-4 shadow-sm">
                <img
                    src="https://www.svgrepo.com/show/452196/facebook-1.svg"
                    alt="Facebook"
                    className="w-5 h-5"
                />
                Sign in with Facebook
            </button>

            {/* 구분선 텍스트 */}
            <p className="text-[#87CEAB] text-sm mb-4 font-medium">
                OR SIGN UP WITH EMAIL
            </p>

            {/* 이메일 + 요청 버튼 */}
            <div className="w-full mb-4">
                <label className="text-sm text-gray-600 font-Pretendard block mb-1">Email</label>
                <div className="flex items-center gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="flex-1 h-12 border border-gray-300 rounded-lg px-4 font-Pretendard"
                    />
                    <button
                        className="h-12 px-4 bg-[#87CEAB] hover:bg-[#0F9D58] focus:bg-[#0F9D58] text-white rounded-lg text-sm font-semibold font-Pretendard transition-colors"
                    >
                        Request
                    </button>
                </div>
            </div>
            {/* 비밀번호 입력 */}
            <div className="w-full mb-3">
                <label className="text-sm text-gray-600">password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                />
            </div>

            {/* 비밀번호 확인 */}
            <div className="w-full mb-3">
                <label className="text-sm text-gray-600">Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="password"
                    className="w-full border border-gray-300 rounded-lg p-2 mt-1"
                />
            </div>

            {/* 약관 체크 */}
            <div className="w-full flex justify-end items-center gap-2 text-sm text-gray-500 mb-6">
                <span>
                    I have read the{" "}
                    <span className="text-[#87CEAB] underline cursor-pointer">
                        Privacy Policy
                    </span>
                </span>
                <input
                    type="checkbox"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                    className="w-4 h-4"
                />
            </div>

            {/* 가입 버튼 */}
            <GetStartedButton label="GET STARTED" className="w-full" />
        </div>
    );
}

export default Signup;
