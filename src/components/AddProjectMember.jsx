import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const AddProjectMember = ({ isDialogOpen, setIsDialogOpen }) => {

    const [searchParams] = useSearchParams();

    const id = searchParams.get('id');

    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);

    const project = currentWorkspace?.projects.find((p) => p.id === id);
    const projectMembersEmails = project?.members.map((member) => member.user.email);

    const [email, setEmail] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    };

    if (!isDialogOpen) return null;

    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
        <div className="bg-white w-full max-w-md rounded-lg p-6 shadow-lg">

            {/* Header */}
            <div className="mb-5">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
                    <UserPlus className="w-5 h-5" />
                    Add Member
                </h2>

                {currentWorkspace && (
                    <p className="text-sm text-gray-500 mt-1">
                        Project :
                        <span className="text-blue-600 font-medium ml-1">
                            {project.name}
                        </span>
                    </p>
                )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

                {/* Select Member */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Member
                    </label>

                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

                        <select
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 outline-none focus:border-blue-500"
                            required
                        >
                            <option value="">Choose member</option>

                            {currentWorkspace?.members
                                .filter(
                                    (member) =>
                                        !projectMembersEmails.includes(
                                            member.user.email
                                        )
                                )
                                .map((member) => (
                                    <option
                                        key={member.user.id}
                                        value={member.user.email}
                                    >
                                        {member.user.email}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setIsDialogOpen(false)}
                        className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isAdding || !currentWorkspace}
                        className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
                    >
                        {isAdding ? "Adding..." : "Add Member"}
                    </button>
                </div>
            </form>
        </div>
    </div>
);};

export default AddProjectMember;
