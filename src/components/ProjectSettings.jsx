import { format } from "date-fns";
import { Plus, Save, CalendarDays, FolderKanban } from "lucide-react";
import { useEffect, useState } from "react";
import AddProjectMember from "./AddProjectMember";

export default function ProjectSettings({ project }) {
  const [formData, setFormData] = useState({
    name: "New Website Launch",
    description: "Initial launch for new web platform.",
    status: "PLANNING",
    priority: "MEDIUM",
    start_date: "2025-09-10",
    end_date: "2025-10-15",
    progress: 30,
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (project) setFormData(project);
  }, [project]);

  const inputClasses =
    "w-full px-4 py-3 rounded-2xl border text-sm bg-white/70 dark:bg-zinc-900/70 border-slate-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all";

  const cardClasses =
    "rounded-3xl border border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl shadow-xl shadow-slate-200/40 dark:shadow-black/20 p-7";

  const labelClasses =
    "text-sm font-medium text-slate-600 dark:text-zinc-400";

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left Side */}
      <div className={cardClasses}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10">
            <FolderKanban className="size-5 text-cyan-600 dark:text-cyan-400" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Project Settings
            </h2>
            <p className="text-sm text-slate-500 dark:text-zinc-400">
              Manage your project information
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Project Name */}
          <div>
            <label className={labelClasses}>Project Name</label>

            <input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={inputClasses}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClasses}>Description</label>

            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className={`${inputClasses} min-h-28 resize-none`}
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Status</label>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value,
                  })
                }
                className={inputClasses}
              >
                <option value="PLANNING">Planning</option>
                <option value="ACTIVE">Active</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label className={labelClasses}>Priority</label>

              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value,
                  })
                }
                className={inputClasses}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClasses}>Start Date</label>

              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />

                <input
                  type="date"
                  value={format(formData.start_date, "yyyy-MM-dd")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      start_date: new Date(e.target.value),
                    })
                  }
                  className={`${inputClasses} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>End Date</label>

              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />

                <input
                  type="date"
                  value={format(formData.end_date, "yyyy-MM-dd")}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      end_date: new Date(e.target.value),
                    })
                  }
                  className={`${inputClasses} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className={labelClasses}>Project Progress</label>

              <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                {formData.progress}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={formData.progress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  progress: Number(e.target.value),
                })
              }
              className="w-full accent-cyan-500"
            />

            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-zinc-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${formData.progress}%` }}
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Save className="size-4" />

              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Team Members */}
      <div className="space-y-6">
        <div className={cardClasses}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                Team Members
              </h2>

              <p className="text-sm text-slate-500 dark:text-zinc-400">
                {project.members.length} members in this project
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsDialogOpen(true)}
              className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-500/10 hover:scale-105 transition"
            >
              <Plus className="size-5 text-cyan-600 dark:text-cyan-400" />
            </button>

            <AddProjectMember
              isDialogOpen={isDialogOpen}
              setIsDialogOpen={setIsDialogOpen}
            />
          </div>

          {/* Member List */}
          {project.members.length > 0 ? (
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {project.members.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/70 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold uppercase">
                      {member?.user?.email?.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-slate-800 dark:text-zinc-200">
                        {member?.user?.email || "Unknown"}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-zinc-500">
                        Project Collaborator
                      </p>
                    </div>
                  </div>

                  {project.team_lead === member.user.id && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-100 dark:bg-cyan-500/10 text-cyan-700 dark:text-cyan-300">
                      Team Lead
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-14">
              <div className="size-20 rounded-full mx-auto bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                <Plus className="size-8 text-slate-400" />
              </div>

              <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
                No Team Members
              </h3>

              <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
                Add members to collaborate on this project
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}