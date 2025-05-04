import { Outlet, Link } from "react-router-dom";
import BottomNav from "../navigator/BottonNav";
import logo from "../assets/images/logoGreen.svg";
import { VscBell } from "react-icons/vsc";
function Layout() {
  return (
    <div className="flex flex-col mx-auto w-full max-w-md min-h-screen bg-white shadow-lg">
      {/* 상단 네비게이션 */}
      <header className="bg-white border-b border-gray-200 p-4 py-5">
        <nav className="flex justify-between gap-4">
          <Link to="/" className="hover:underline">
            <img src={logo} alt="로고" className="w-12 h-auto" />
          </Link>
          <VscBell className="w-6 h-6" />
        </nav>
      </header>

      {/* 페이지 컨텐츠 */}
      <main className="flex-1 p-2">
        <Outlet />
      </main>

      {/* 하단 푸터 */}
      <footer>
        <BottomNav />
      </footer>
    </div>
  );
}

export default Layout;
