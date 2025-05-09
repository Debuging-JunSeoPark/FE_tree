import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import logo from "../assets/images/logoGreen.svg";
import GetStartedButton from "../components/GetStartedButton";
import { postCheckEmail, postVerifyEmailCode , postVerifiedSignup} from "../apis/auth";
import Header from "../components/Header";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [code, setCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleEmailRequest = async () => {
    try {
      if (!email) {
        alert("이메일을 입력해주세요.");
        return;
      }
  
      if (!email.includes("@")) {
        alert("유효한 이메일 형식을 입력해주세요.");
        return;
      }
  
      await postCheckEmail(email);
      alert("인증 이메일이 성공적으로 발송되었습니다.");
      setEmailSent(true);
    } catch (error) {
      alert("이메일 요청에 실패했습니다.");
      console.error("이메일 요청 실패", error);
      setEmailSent(false);
    }
  };


  const handleVerifyCode = async () => {
    try {
      if (!email || !code) {
        alert("이메일과 인증 코드를 모두 입력해주세요.");
        return;
      }

      await postVerifyEmailCode({ email, code });
      alert("이메일 인증이 완료되었습니다.");
    } catch (error) {
      alert("인증 코드가 유효하지 않습니다.");
      console.error("이메일 인증 실패", error);
    }
  };

  const handleSignup = async () => {
    if (!email || !code || !password || !confirmPassword) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
  
    if (!email.includes("@")) {
      alert("유효한 이메일 형식을 입력해주세요.");
      return;
    }
  
    if (password.length < 6) {
      alert("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }
  
    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    try {
      await postVerifiedSignup({ email, code, password });
      alert("회원가입이 완료되었습니다.");
      navigate("/login"); // ✅ 이 줄은 반드시 try 안에서만 실행되도록 유지
    } catch (error: any) {
      if (error.response?.status === 409) {
        alert("이미 가입된 이메일입니다.");
      } else if (error.response?.status === 400) {
        alert("인증 코드가 유효하지 않습니다.");
      } else {
        alert("회원가입에 실패했습니다.");
        console.error("회원가입 오류", error);
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-start px-6 py-8 bg-white">
      {/* 상단 바 */}
      <Header title="Sign Up" showLogo={false} />
      <img
        src={logo}
        alt="tree logo"
        className="w-24 h-auto mt-20 mb-4"
      />
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
        <label className="text-sm text-gray-600 font-Pretendard block mb-1">
          Email
        </label>
        <div className="flex items-center gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 h-12 border border-gray-300 rounded-lg px-4 font-Pretendard"
          />
          <button
            onClick={handleEmailRequest}
            className="h-12 px-4 bg-[#87CEAB] hover:bg-[#0F9D58] focus:bg-[#0F9D58] text-white rounded-lg text-sm font-semibold font-Pretendard transition-colors"
          >
            Request
          </button>
        </div>
      </div>
      {/* 이메일 인증  */}
      {emailSent && (
        <div className="w-full mb-4">
          <label className="text-sm text-gray-600 font-Pretendard block mb-1">
            Verification Code
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="123456"
              className="flex-1 h-12 border border-gray-300 rounded-lg px-4 font-Pretendard"
            />
            <button
              onClick={handleVerifyCode}
              className="h-12 px-4 bg-[#87CEAB] hover:bg-[#0F9D58] focus:bg-[#0F9D58] text-white rounded-lg text-sm font-semibold font-Pretendard transition-colors"
            >
              Verify
            </button>
          </div>
        </div>
      )}

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
    onChange={(e) => {
      setConfirmPassword(e.target.value);
      if (passwordMismatch) setPasswordMismatch(false); // 입력 중이면 리셋
    }}
    placeholder="password"
    className={`w-full rounded-lg p-2 mt-1 border ${
      passwordMismatch ? "border-red-500" : "border-gray-300"
    }`}
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
      <GetStartedButton label="GET STARTED" className="w-full" onClick={handleSignup} />

    </div>
  );
}

export default Signup;