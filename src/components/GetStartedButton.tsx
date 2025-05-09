import { useNavigate } from "react-router-dom";

interface Props {
  label?: string;
  to?: string; 
  className?: string;
  onClick?: () => void | Promise<void>;
}

function GetStartedButton({ label = "GET STARTED", to, className = "", onClick }: Props) {
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      if (onClick) {
        await onClick();
      }
      if (to) {
        navigate(to); 
      }
    } catch (e) {

      console.error("버튼 동작 중 오류 발생", e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full bg-[#0F9D58] text-white rounded-lg py-2 font-semibold ${className}`}
    >
      {label}
    </button>
  );
}

export default GetStartedButton;
