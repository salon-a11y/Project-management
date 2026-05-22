import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProjectDetails = () => {

    const { id } = useParams();

    const currentWorkspace = useSelector(
        (state) => state.workspace?.currentWorkspace
    );

    // Loading Safety
    if (!currentWorkspace) {
        return (
            <div className="p-6">
                Loading...
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
            <div className="p-6 text-lg">
                Project not found
            </div>
        );
    }

    return (

        <div className="p-6 space-y-6">

            {/* Header */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">

                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                    {project.name}
                </h1>

                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                    {project.description || "No description"}
                </p>

            </div>

            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Status */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">

                    <p className="text-sm text-zinc-500">
                        Status
                    </p>

                    <h2 className="text-lg font-semibold mt-1">
                        {project.status}
                    </h2>

                </div>

                {/* Priority */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">

                    <p className="text-sm text-zinc-500">
                        Priority
                    </p>

                    <h2 className="text-lg font-semibold mt-1">
                        {project.priority}
                    </h2>

                </div>

                {/* Total Tasks */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">

                    <p className="text-sm text-zinc-500">
                        Total Tasks
                    </p>

                    <h2 className="text-lg font-semibold mt-1">
                        {project.tasks?.length || 0}
                    </h2>

                </div>

            </div>

            {/* Team Members */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6">

                <h2 className="text-xl font-semibold mb-4">
                    Team Members
                </h2>

                <div className="space-y-3">

                    {project.members?.length > 0 ? (

                        project.members.map((member) => (

                            <div
                                key={member.user.id}
                                className="flex items-center justify-between border border-zinc-200 dark:border-zinc-700 rounded-lg p-3"
                            >

                                <div>

                                    <p className="font-medium">
                                        {member.user.name}
                                    </p>

                                    <p className="text-sm text-zinc-500">
                                        {member.user.email}
                                    </p>

                                </div>

                            </div>

                        ))

                    ) : (

                        <p className="text-zinc-500">
                            No members added
                        </p>

                    )}

                </div>

            </div>

        </div>

    );
};

export default ProjectDetails;