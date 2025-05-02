import {
  //HomeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { GoHomeFill } from "react-icons/go";
import { FaIdCardClip } from "react-icons/fa6";
import { IoDocumentText } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: <GoHomeFill className="w-6 h-6" />, label: "Home" },
    {
      path: "/record",
      icon: <PencilSquareIcon className="w-6 h-6" />,
      label: "Record",
    },
    {
      path: "/report",
      icon: <IoDocumentText className="w-6 h-6" />,
      label: "Report",
    },
    {
      path: "/mypage",
      icon: <FaIdCardClip className="w-6 h-6" />,
      label: "My Page",
    },
  ];

  return (
    <footer className="bg-[#f7f7f7] border-t border-t-gray-300 shadow-inner">
      <nav className="flex justify-around py-4 max-w-md mx-auto">
        {navItems.map(({ path, icon, label }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              to={path}
              key={path}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-main font-bold" : "text-gray-500"
              }`}
            >
              {icon}
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
};

export default BottomNav;
