import { Plus } from "lucide-react";
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";

import StatsGrid from "../components/StatsGrid";
import ProjectOverview from "../components/ProjectOverview";
import RecentActivity from "../components/RecentActivity";
import TasksSummary from "../components/TasksSummary";
import CreateProjectDialog from "../components/CreateProjectDialog";

const Dashboard = () => {
  const { user, isLoaded } = useUser();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!isLoaded) return null;

  const displayName =
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
    "User";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* Top Header */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Welcome, {displayName}
            </h1>

            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              Manage your projects and tasks easily
            </p>
          </div>

          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={18} />
            New Project
          </button>

          <CreateProjectDialog
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm mb-8">
          <StatsGrid />
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <ProjectOverview />
            </div>

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
              <RecentActivity />
            </div>

          </div>

          {/* Right Side */}
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm h-fit">
            <TasksSummary />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;