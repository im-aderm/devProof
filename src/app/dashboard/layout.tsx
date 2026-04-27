import Sidebar from "@/components/layout/Sidebar";
import TopNavbar from "@/components/layout/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Sidebar />
      <div className="pl-64 flex flex-col min-h-screen">
        <TopNavbar />
        <main className="p-6 md:p-8 max-w-content-max mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
