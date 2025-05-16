import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logoGreen.svg";

interface HeaderProps {
  title?: string; // 텍스트 타이틀 (예: Login, Sign Up)
  showLogo?: boolean; // 로고 표시 여부 (기본값 true)
}

function Header({ title, showLogo = true }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between fixed top-0 w-full max-w-md min-h-[60px] px-4 py-3 bg-white border-b border-gray-200 z-10">
      <button onClick={() => navigate(-1)} className="text-xl">{`←`}</button>

      {showLogo ? (
        <img
          src={logo}
          alt="로고"
          className="absolute left-1/2 -translate-x-1/2 w-15 h-auto"
        />
      ) : (
        <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
          {title}
        </div>
      )}

      {/* 오른쪽 공간 확보용 빈 div */}
      <div className="w-6" />
    </header>
  );
}

export default Header;
