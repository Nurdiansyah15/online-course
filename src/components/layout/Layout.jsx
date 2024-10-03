import Header from "./sub/Header";
import Sidebar from "./sub/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Custom Sidebar */}
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-6 overflow-auto bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
}
