import { Outlet, Link } from "react-router-dom";
import BottomNav from "../navigator/BottonNav";

function Layout() {
  return (
    <div className="flex flex-col mx-auto w-full max-w-md min-h-screen bg-white shadow-lg">
      {/* 상단 네비게이션 */}
      <header className="bg-main text-white p-4">
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">
            홈
          </Link>
        </nav>
      </header>

      {/* 페이지 컨텐츠 */}
      <main className="flex-1 p-6">
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
