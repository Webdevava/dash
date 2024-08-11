import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import MobileMenu from "@/components/MobileMenu";


export default function Layout({ children }) {
  return (
    <div className=" overflow-hidden">
      <Topbar />
      <div className="flex h-screen">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col">
          <MobileMenu />
          <main className="flex-1 overflow-y-auto mt-16 p-4">{children}</main>
        </div>
      </div>
    </div>
  );
}
