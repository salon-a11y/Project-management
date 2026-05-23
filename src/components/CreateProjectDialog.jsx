import { useState } from "react";
import { XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../features/workspaceSlice";
import toast from "react-hot-toast";

const CreateProjectDialog = ({ isDialogOpen, setIsDialogOpen }) => {

    const dispatch = useDispatch();

    const { currentWorkspace } = useSelector(
        (state) => state.workspace
    );

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "PLANNING",
        priority: "MEDIUM",
        start_date: "",
        end_date: "",
        team_members: [],
        team_lead: "",
        progress: 0,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);

            const newProject = {
                id: crypto.randomUUID(),

                name: formData.name,
                description: formData.description,

                status: formData.status,
                priority: formData.priority,

                start_date: new Date(formData.start_date),
                end_date: new Date(formData.end_date),

                progress: 0,

                tasks: [],

                members: formData.team_members.map((email) => ({
                    user: {
                        id: crypto.randomUUID(),
                        email,
                        name: email.split("@")[0],
                    },
                })),
            };

            dispatch(addProject(newProject));

            toast.success("Project created successfully");

            setFormData({
                name: "",
                description: "",
                status: "PLANNING",
                priority: "MEDIUM",
                start_date: "",
                end_date: "",
                team_members: [],
                team_lead: "",
                progress: 0,
            });

            setIsDialogOpen(false);

        } catch (error) {

            toast.error(error.message);

        } finally {

            setIsSubmitting(false);

        }
    };

    const removeTeamMember = (email) => {
        setFormData((prev) => ({
            ...prev,
            team_members: prev.team_members.filter(
                (m) => m !== email
            ),
        }));
    };

    if (!isDialogOpen) return null;

   
    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 overflow-y-auto">

        <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative shadow-lg">

            {/* Close */}
            <button
                onClick={() => setIsDialogOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
                <XIcon className="w-5 h-5" />
            </button>

            {/* Heading */}
            <h2 className="text-2xl font-semibold text-gray-800">
                Create Project
            </h2>

            {currentWorkspace && (
                <p className="text-sm text-gray-500 mt-1 mb-5">
                    Workspace :
                    <span className="text-blue-600 ml-1 font-medium">
                        {currentWorkspace.name}
                    </span>
                </p>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Project Name */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Project Name
                    </label>

                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        placeholder="Enter project name"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Description
                    </label>

                    <textarea
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Project description"
                        className="w-full border border-gray-300 rounded-md px-4 py-2 h-24 outline-none focus:border-blue-500"
                    />
                </div>

                {/* Status & Priority */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Status
                        </label>

                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    status: e.target.value,
                                })
                            }
                            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="PLANNING">Planning</option>
                            <option value="ACTIVE">Active</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="ON_HOLD">On Hold</option>
                            <option value="CANCELLED">Cancelled</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Priority
                        </label>

                        <select
                            value={formData.priority}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    priority: e.target.value,
                                })
                            }
                            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500"
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    </div>

                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Start Date
                        </label>

                        <input
                            type="date"
                            value={formData.start_date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    start_date: e.target.value,
                                })
                            }
                            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            End Date
                        </label>

                        <input
                            type="date"
                            value={formData.end_date}
                            min={formData.start_date}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    end_date: e.target.value,
                                })
                            }
                            className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500"
                        />
                    </div>

                </div>

                {/* Project Lead */}
                <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Project Lead
                    </label>

                    <select
                        value={formData.team_lead}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                team_lead: e.target.value,

                                team_members: e.target.value
                                    ? [
                                          ...new Set([
                                              ...formData.team_members,
                                              e.target.value,
                                          ]),
                                      ]
                                    : formData.team_members,
                            })
                        }
                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500"
                    >
                        <option value="">No lead</option>

                        {currentWorkspace?.members?.map((member) => (
                            <option
                                key={member.user.email}
                                value={member.user.email}
                            >
                                {member.user.email}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Team Members */}
                <div>

                    <label className="block text-sm font-medium mb-2 text-gray-700">
                        Team Members
                    </label>

                    <select
                        className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:border-blue-500"
                        onChange={(e) => {

                            if (
                                e.target.value &&
                                !formData.team_members.includes(
                                    e.target.value
                                )
                            ) {

                                setFormData((prev) => ({
                                    ...prev,
                                    team_members: [
                                        ...prev.team_members,
                                        e.target.value,
                                    ],
                                }));
                            }
                        }}
                    >
                        <option value="">Add team members</option>

                        {currentWorkspace?.members
                            ?.filter(
                                (member) =>
                                    !formData.team_members.includes(
                                        member.user.email
                                    )
                            )
                            .map((member) => (
                                <option
                                    key={member.user.email}
                                    value={member.user.email}
                                >
                                    {member.user.email}
                                </option>
                            ))}
                    </select>

                    {/* Selected Members */}
                    {formData.team_members.length > 0 && (

                        <div className="flex flex-wrap gap-2 mt-3">

                            {formData.team_members.map((email) => (

                                <div
                                    key={email}
                                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-md text-sm"
                                >
                                    {email}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeTeamMember(email)
                                        }
                                        className="text-red-500"
                                    >
                                        <XIcon className="w-3 h-3" />
                                    </button>
                                </div>

                            ))}

                        </div>

                    )}

                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4">

                    <button
                        type="button"
                        onClick={() => setIsDialogOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting || !currentWorkspace}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isSubmitting
                            ? "Creating..."
                            : "Create Project"}
                    </button>

                </div>

            </form>

        </div>

    </div>
);
};

export default CreateProjectDialog;