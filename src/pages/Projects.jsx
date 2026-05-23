import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Plus, Search, FolderOpen } from "lucide-react";

import ProjectCard from "../components/ProjectCard";
import CreateProjectDialog from "../components/CreateProjectDialog";

export default function Projects() {

    const projects = useSelector(
        (state) => state?.workspace?.currentWorkspace?.projects || []
    );

    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [filters, setFilters] = useState({
        status: "ALL",
        priority: "ALL",
    });

    const filterProjects = () => {

        let filtered = projects;

        if (searchTerm) {

            filtered = filtered.filter(
                (project) =>
                    project.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||

                    project.description
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        if (filters.status !== "ALL") {

            filtered = filtered.filter(
                (project) => project.status === filters.status
            );
        }

        if (filters.priority !== "ALL") {

            filtered = filtered.filter(
                (project) => project.priority === filters.priority
            );
        }

        setFilteredProjects(filtered);
    };

    useEffect(() => {
        filterProjects();
    }, [projects, searchTerm, filters]);

    return (
        <div className="max-w-7xl mx-auto space-y-8">

            {/* Top Header */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                            Projects
                        </h1>

                        <p className="text-sm text-gray-500 dark:text-zinc-400 mt-2">
                            Organize, manage and track all your workspaces
                        </p>
                    </div>

                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center justify-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition w-full sm:w-fit"
                    >
                        <Plus className="size-4" />
                        Create Project
                    </button>

                    <CreateProjectDialog
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                    />
                </div>

            </div>

            {/* Search + Filters */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm">

                <div className="flex flex-col lg:flex-row gap-4">

                    {/* Search */}
                    <div className="relative flex-1">

                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 size-4" />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            placeholder="Search projects..."
                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white outline-none focus:border-black dark:focus:border-white"
                        />

                    </div>

                    {/* Status */}
                    <select
                        value={filters.status}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                status: e.target.value,
                            })
                        }
                        className="px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white outline-none"
                    >
                        <option value="ALL">All Status</option>
                        <option value="ACTIVE">Active</option>
                        <option value="PLANNING">Planning</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="ON_HOLD">On Hold</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>

                    {/* Priority */}
                    <select
                        value={filters.priority}
                        onChange={(e) =>
                            setFilters({
                                ...filters,
                                priority: e.target.value,
                            })
                        }
                        className="px-4 py-3 rounded-xl border border-gray-300 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-white outline-none"
                    >
                        <option value="ALL">All Priority</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                    </select>

                </div>

            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                {filteredProjects.length === 0 ? (

                    <div className="col-span-full">

                        <div className="bg-white dark:bg-zinc-900 border border-dashed border-gray-300 dark:border-zinc-700 rounded-3xl p-14 text-center">

                            <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-6">

                                <FolderOpen className="size-11 text-gray-400 dark:text-zinc-500" />

                            </div>

                            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                                No Projects Found
                            </h2>

                            <p className="text-gray-500 dark:text-zinc-400 mb-6">
                                Start by creating your first project
                            </p>

                            <button
                                onClick={() => setIsDialogOpen(true)}
                                className="inline-flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
                            >
                                <Plus className="size-4" />
                                New Project
                            </button>

                        </div>

                    </div>

                ) : (

                    filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                        />
                    ))

                )}

            </div>
        </div>
    );
}