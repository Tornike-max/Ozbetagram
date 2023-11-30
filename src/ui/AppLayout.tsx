import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import Header from "./Header";
import Footer from "./Footer";
import { useDarkMode } from "../context/useDarkMode";

export default function AppLayout() {
  const { dark } = useDarkMode();
  return (
    <div
      className={`min-h-screen grid grid-cols-1 gap-4 sm:grid-cols-3 font-serif bg-slate-950 `}
    >
      <header className="fixed top-0 w-full z-50 sm:hidden bg-slate-950 p-2  col-span-3">
        <Header />
      </header>
      <aside className="sticky hidden sm:flex top-0 h-screen bg-slate-950 p-4">
        <SideBar />
      </aside>
      <main
        className={`col-span-2  p-4 overflow-y-auto py-20 sm:p-8 ${
          dark ? "bg-gray-900 duration-150 transition-all" : "bg-slate-100"
        }`}
      >
        <Outlet />
      </main>
      <div className="fixed bottom-0 w-full sm:hidden bg-slate-950 p-4  col-span-3">
        <Footer />
      </div>
    </div>
  );
}
