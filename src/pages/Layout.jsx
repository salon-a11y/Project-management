import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadTheme } from "../features/themeSlice";
import { Loader2Icon } from "lucide-react";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { loading } = useSelector((state) => state.workspace);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTheme());
  }, []);

  // Loading Screen
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-3">
          <Loader2Icon className="size-10 animate-spin text-black dark:text-white" />
          
          <p className="text-sm text-gray-600 dark:text-zinc-400">
            Loading Workspace...
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Main Section */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Navbar */}
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">

          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>

        </main>
      </div>
    </div>
  );
};

export default Layout;