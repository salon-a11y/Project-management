import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AlertTriangle, HomeIcon } from "lucide-react";

// Layout
import Layout from "./pages/Layout";

// Pages
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Modern 404 Page
const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div
        className="
          relative overflow-hidden
          w-full max-w-xl
          rounded-3xl
          border border-zinc-200 dark:border-zinc-800
          bg-white/80 dark:bg-zinc-900/70
          backdrop-blur-xl
          shadow-[0_10px_60px_rgba(0,0,0,0.08)]
          p-10 text-center
        "
      >
        {/* Glow Effect */}
        <div className="absolute -top-20 -right-20 w-52 h-52 bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-24 -left-20 w-52 h-52 bg-purple-500/20 blur-3xl rounded-full" />

        {/* Icon */}
        <div
          className="
            relative z-10
            mx-auto mb-6
            flex items-center justify-center
            w-20 h-20 rounded-2xl
            bg-gradient-to-br from-red-500 to-orange-500
            shadow-lg shadow-red-500/20
          "
        >
          <AlertTriangle className="size-10 text-white" />
        </div>

        {/* 404 */}
        <h1
          className="
            relative z-10
            text-7xl font-black
            bg-gradient-to-r from-blue-600 via-violet-500 to-pink-500
            bg-clip-text text-transparent
            tracking-tight
          "
        >
          404
        </h1>

        {/* Title */}
        <h2 className="relative z-10 mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
          Oops! Page not found
        </h2>

        {/* Description */}
        <p className="relative z-10 mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn’t exist or may have been moved.
        </p>

        {/* Button */}
        <a
          href="/"
          className="
            relative z-10
            inline-flex items-center gap-2
            mt-8 px-6 py-3 rounded-2xl
            bg-gradient-to-r from-blue-600 to-violet-600
            text-white font-medium
            shadow-lg shadow-blue-500/20
            hover:scale-[1.03]
            hover:shadow-blue-500/40
            active:scale-95
            transition-all duration-300
          "
        >
          <HomeIcon className="size-4" />
          Back to Dashboard
        </a>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181b",
            color: "#fff",
            borderRadius: "14px",
            border: "1px solid #27272a",
            padding: "12px 16px",
          },
        }}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<Dashboard />} />

          {/* Main Pages */}
          <Route path="team" element={<Team />} />
          <Route path="projects" element={<Projects />} />

          {/* Dynamic Routes */}
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="tasks/:id" element={<TaskDetails />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;