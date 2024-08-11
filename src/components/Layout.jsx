import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import MobileMenu from "@/components/MobileMenu";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Topbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <MobileMenu />
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
