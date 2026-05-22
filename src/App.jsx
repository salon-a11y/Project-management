import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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

// 404 Component
const NotFound = () => (
  <div className="flex items-center justify-center h-full text-xl font-semibold">
    404 - Page Not Found
  </div>
);

const App = () => {
  return (
    <>
      <Toaster />

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