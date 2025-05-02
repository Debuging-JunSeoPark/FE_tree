import { Outlet, Link } from "react-router-dom";

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
      <footer className="bg-gray-100 text-center p-8 border-t-1 border-gray-200"></footer>
    </div>
  );
}

export default Layout;
