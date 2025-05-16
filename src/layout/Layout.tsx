import { Outlet, Link, useLocation } from "react-router-dom";
import BottomNav from "../navigator/BottonNav";
import logo from "../assets/images/logoGreen.svg";
import { VscBell } from "react-icons/vsc";

function Layout() {
  const location = useLocation();
  const hideNav = ["/login", "/signup", "/select-avatar", "/start"].includes(
    location.pathname
  );
  const showNav = !hideNav;

  return (
    <div className="relative w-full max-w-md mx-auto h-[100dvh] bg-white shadow-lg flex flex-col">
      {/* 상단 네비게이션 */}
      {showNav && (
        <header className="bg-white border-b border-gray-200 p-4 py-5 z-10">
          <nav className="flex justify-between gap-4">
            <Link to="/" className="hover:underline">
              <img src={logo} alt="로고" className="w-12 h-auto" />
            </Link>
            <Link to="/notifications" aria-label="Go to notifications">
              <VscBell className="w-6 h-6 text-gray-600 hover:text-main transition-colors" />
            </Link>
          </nav>
        </header>
      )}

      {/* ✅ 스크롤 가능한 콘텐츠 영역 */}
      <main className={`flex-1 overflow-y-auto py-2 ${showNav ? "pb-24" : ""}`}>
        {/* ✅ 여백: 하단 푸터바를 가리지 않게 `pb-24` */}
        <Outlet />
      </main>

      {/* ✅ 화면 고정 푸터 */}
      {showNav && (
        <footer className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-20">
          <BottomNav />
        </footer>
      )}
    </div>
  );
}

export default Layout;
