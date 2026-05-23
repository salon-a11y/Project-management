import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  ClipboardList,
  Users,
} from "lucide-react";

const ProjectDetails = () => {
  const { id } = useParams();

  const currentWorkspace = useSelector(
    (state) => state.workspace?.currentWorkspace
  );

  // Loading
  if (!currentWorkspace) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  // Find Project
  const project = currentWorkspace?.projects?.find(
    (p) => String(p.id) === String(id)
  );

  // Project Not Found
  if (!project) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <p className="text-xl font-semibold text-red-500">
          Project not found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Top Banner */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-7 shadow-sm">

        <div className="flex items-start justify-between flex-wrap gap-4">

          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 rounded-xl bg-black text-white">
                <FolderKanban className="size-6" />
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                  {project.name}
                </h1>

                <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
                  Project Details & Team Overview
                </p>
              </div>
            </div>

            <p className="text-gray-600 dark:text-zinc-400 leading-7">
              {project.description || "No description available"}
            </p>
          </div>

        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Status */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Status
              </p>

              <h2 className="text-xl font-semibold mt-1 text-gray-800 dark:text-white">
                {project.status}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10">
              <CheckCircle2 className="size-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Priority */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Priority
              </p>

              <h2 className="text-xl font-semibold mt-1 text-gray-800 dark:text-white">
                {project.priority}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-500/10">
              <AlertTriangle className="size-5 text-red-500" />
            </div>
          </div>
        </div>

        {/* Tasks */}
        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-5 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-zinc-400">
                Total Tasks
              </p>

              <h2 className="text-xl font-semibold mt-1 text-gray-800 dark:text-white">
                {project.tasks?.length || 0}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-500/10">
              <ClipboardList className="size-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">

        <div className="flex items-center gap-2 mb-6">
          <Users className="size-5 text-black dark:text-white" />

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Team Members
          </h2>
        </div>

        {project.members?.length > 0 ? (

          <div className="grid sm:grid-cols-2 gap-4">

            {project.members.map((member) => (

              <div
                key={member.user.id}
                className="border border-gray-200 dark:border-zinc-700 rounded-xl p-4 hover:shadow-md transition bg-gray-50 dark:bg-zinc-800/40"
              >

                <div className="flex items-center gap-3">

                  <div className="size-11 rounded-full bg-black text-white flex items-center justify-center font-semibold uppercase">
                    {member.user.name?.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {member.user.name}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      {member.user.email}
                    </p>
                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (

          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-zinc-400">
              No members added yet
            </p>
          </div>

        )}
      </div>
    </div>
  );
};

export default ProjectDetails;