// src/components/GetStartedButton.tsx
import { useNavigate } from "react-router-dom";

interface Props {
  label?: string; // 버튼 텍스트 (기본값: GET STARTED)
  to?: string; // 이동 경로 (기본값: /home)
  className?: string; // Tailwind 커스텀 스타일
}

function GetStartedButton({ label = "GET STARTED", to = "/", className = "" }: Props) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`w-full bg-[#0F9D58] text-white rounded-lg py-2 font-semibold ${className}`}
    >
      {label}
    </button>
  );
}

export default GetStartedButton;
