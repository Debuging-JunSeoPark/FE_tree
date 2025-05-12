import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/images/logoGreen.svg";
import GetStartedButton from "../components/GetStartedButton";
import { postCheckEmail, postVerifyEmailCode, postVerifiedSignup } from "../apis/auth";
import Header from "../components/Header";
import PrivacyPolicyModal from "../components/PrivacyPolicyModal";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [code, setCode] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  const handleEmailRequest = async () => {
    try {
      if (!email) {
        toast.error("Please enter your email.");
        return;
      }

      if (!email.includes("@")) {
        toast.error("Please enter a valid email.");
        return;
      }

      await postCheckEmail(email);
      toast.error("Verification email has been sent successfully.");
      setEmailSent(true);
    } catch (error) {
      toast.error("Failed to send verification email.");
      console.error("Failed to send verification email.", error);
      setEmailSent(false);
    }
  };


  const handleVerifyCode = async () => {
    try {
      if (!email || !code) {
        toast.error("Please enter both your email and verification code.");
        return;
      }

      await postVerifyEmailCode({ email, code });
      toast.success("Email verification completed successfully.");
    } catch (error) {
      toast.error("The verification code is invalid.");
      console.error("Email verification failed", error);
    }
  };

  const handleSignup = async () => {
    if (!email || !code || !password || !confirmPassword) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address (must include '@').");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      toast.error("Passwords do not match.");
      return;
    }

    if (!agreed) {
      toast.error("Please agree to the privacy policy.");
      return;
    }

    try {
      await postVerifiedSignup({ email, code, password });
      toast.success("Sign-up completed successfully.");
      navigate("/login");
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error("This email is already registered.");
      } else if (error.response?.status === 400) {
        toast.error("The verification code is invalid.");
      } else {
        toast.error("Failed to sign up.");
        console.error("Sign-up error", error);
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
      {/*
      <button className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded-lg mb-4 shadow-sm">
        <img
          src="https://www.svgrepo.com/show/452196/facebook-1.svg"
          alt="Facebook"
          className="w-5 h-5"
        />
        Sign in with Facebook
      </button>
*/}
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
            className="flex-1 p-2 border border-gray-300 rounded-lg px-4 font-Pretendard"
          />
          <button
            onClick={handleEmailRequest}
            className="p-3 px-4 bg-[#87CEAB] hover:bg-[#0F9D58] focus:bg-[#0F9D58] text-white rounded-lg text-sm font-semibold font-Pretendard transition-colors"
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
              className="flex-1 p-2 border border-gray-300 rounded-lg px-4 font-Pretendard"
            />
            <button
              onClick={handleVerifyCode}
              className="p-3 px-4 bg-[#87CEAB] hover:bg-[#0F9D58] focus:bg-[#0F9D58] text-white rounded-lg text-sm font-semibold font-Pretendard transition-colors"
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
          className={`w-full rounded-lg p-2 mt-1 border ${passwordMismatch ? "border-red-500" : "border-gray-300"
            }`}
        />
      </div>

      {/* 약관 체크 영역 */}
      <div className="w-full flex justify-end items-center gap-2 text-sm text-gray-500 mb-6">
        <span>
          I have read the{" "}
          <span
            className="text-[#87CEAB] underline cursor-pointer"
            onClick={() => setShowPolicy(true)}
          >
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

      {/* 모달 렌더링 */}
      {showPolicy && <PrivacyPolicyModal onClose={() => setShowPolicy(false)} />}

      {/* 가입 버튼 */}
      <GetStartedButton label="GET STARTED" className="w-full" onClick={handleSignup} />

    </div>
  );
}

export default Signup;