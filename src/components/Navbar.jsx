import { useState } from "react";
import { SearchIcon, PanelLeft, MoonIcon, SunIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/themeSlice";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

const Navbar = ({ setIsSidebarOpen, projects = [] }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  // Search state
  const [search, setSearch] = useState("");

  // Filtered projects
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="w-full bg-white border-b border-gray-200 px-4 md:px-8 py-4 shadow-sm">

    <div className="flex items-center justify-between gap-4">

      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">

        {/* Sidebar Button */}
        <button
          onClick={() => setIsSidebarOpen((prev) => !prev)}
          className="sm:hidden p-2 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
        >
          <PanelLeft size={20} className="text-gray-700" />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-md">

          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black"
          />

          {/* Search Results */}
          {search && (
            <div className="absolute top-14 left-0 w-full bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-50">

              {filteredProjects.length > 0 ? (

                filteredProjects.map((project, index) => (

                  <div
                    key={index}
                    className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition border-b last:border-b-0 border-gray-100"
                  >
                    {project.title}
                  </div>

                ))

              ) : (

                <div className="px-4 py-3 text-sm text-gray-500">
                  No project found
                </div>

              )}

            </div>
          )}

        </div>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="w-11 h-11 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-100 transition"
        >
          {theme === "light" ? (
            <MoonIcon className="w-5 h-5 text-gray-700" />
          ) : (
            <SunIcon className="w-5 h-5 text-yellow-500" />
          )}
        </button>

        {/* Auth */}
        <SignedOut>
          <SignInButton>

            <button className="px-5 py-2.5 bg-black text-white rounded-xl hover:bg-gray-800 transition text-sm font-medium">
              Login
            </button>

          </SignInButton>
        </SignedOut>

        <SignedIn>
          <div className="border border-gray-200 rounded-full p-1 shadow-sm">
            <UserButton />
          </div>
        </SignedIn>

      </div>

    </div>

  </div>
);
};

export default Navbar;