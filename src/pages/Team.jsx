import { useEffect, useState } from "react";
import { UsersIcon, Search, UserPlus, Shield, Activity } from "lucide-react";
import InviteMemberDialog from "../components/InviteMemberDialog";
import { useSelector } from "react-redux";

const Team = () => {

    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const currentWorkspace = useSelector((state) => state?.workspace?.currentWorkspace || null);
    const projects = currentWorkspace?.projects || [];

    const filteredUsers = users.filter(
        (user) =>
            user?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setUsers(currentWorkspace?.members || []);
        setTasks(currentWorkspace?.projects?.reduce((acc, project) => [...acc, ...project.tasks], []) || []);
    }, [currentWorkspace]);

    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">

            <div>
                <div className="flex items-center gap-3 mb-2">

                    <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-500/10">
                        <UsersIcon className="size-6 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                            Team Members
                        </h1>

                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                            Manage workspace members and collaboration
                        </p>
                    </div>

                </div>
            </div>

            <button
                onClick={() => setIsDialogOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
                <UserPlus className="size-4" />
                Invite Member
            </button>

            <InviteMemberDialog
                isDialogOpen={isDialogOpen}
                setIsDialogOpen={setIsDialogOpen}
            />

        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* Total Members */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Total Members
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-zinc-900 dark:text-white">
                            {users.length}
                        </h2>
                    </div>

                    <div className="size-14 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
                        <UsersIcon className="size-6 text-blue-600 dark:text-blue-400" />
                    </div>

                </div>

            </div>

            {/* Active Projects */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Active Projects
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-zinc-900 dark:text-white">
                            {
                                projects.filter(
                                    (p) =>
                                        p.status !== "CANCELLED" &&
                                        p.status !== "COMPLETED"
                                ).length
                            }
                        </h2>
                    </div>

                    <div className="size-14 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                        <Activity className="size-6 text-emerald-600 dark:text-emerald-400" />
                    </div>

                </div>

            </div>

            {/* Tasks */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Total Tasks
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-zinc-900 dark:text-white">
                            {tasks.length}
                        </h2>
                    </div>

                    <div className="size-14 rounded-2xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                        <Shield className="size-6 text-purple-600 dark:text-purple-400" />
                    </div>

                </div>

            </div>

        </div>

        {/* Search */}
        <div className="relative max-w-lg">

            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />

            <input
                placeholder="Search members by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

        </div>

        {/* Team Members */}
        {filteredUsers.length === 0 ? (

            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl py-20 px-6 text-center shadow-sm">

                <div className="size-24 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6">
                    <UsersIcon className="size-12 text-zinc-400" />
                </div>

                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                    {users.length === 0
                        ? "No team members yet"
                        : "No matching members"}
                </h2>

                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {users.length === 0
                        ? "Invite members to start collaborating."
                        : "Try changing your search keyword."}
                </p>

            </div>

        ) : (

            <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">

                    <table className="min-w-full">

                        <thead className="bg-zinc-50 dark:bg-zinc-800/40 border-b border-zinc-200 dark:border-zinc-800">

                            <tr>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Member
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Email
                                </th>

                                <th className="px-6 py-4 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                                    Role
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filteredUsers.map((user) => (

                                <tr
                                    key={user.id}
                                    className="border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all"
                                >

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-4">

                                            <img
                                                src={user.user.image}
                                                alt={user.user.name}
                                                className="size-11 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-700"
                                            />

                                            <div>

                                                <h3 className="font-semibold text-zinc-900 dark:text-white">
                                                    {user.user?.name || "Unknown User"}
                                                </h3>

                                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                    Team Member
                                                </p>

                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">
                                        {user.user.email}
                                    </td>

                                    <td className="px-6 py-4">

                                        <span
                                            className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                                                user.role === "ADMIN"
                                                    ? "bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400"
                                                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                            }`}
                                        >
                                            {user.role || "User"}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Mobile Cards */}
                <div className="grid md:hidden gap-4">

                    {filteredUsers.map((user) => (

                        <div
                            key={user.id}
                            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 shadow-sm"
                        >

                            <div className="flex items-center gap-4">

                                <img
                                    src={user.user.image}
                                    alt={user.user.name}
                                    className="size-14 rounded-2xl border border-zinc-200 dark:border-zinc-700"
                                />

                                <div className="flex-1">

                                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                                        {user.user?.name || "Unknown User"}
                                    </h3>

                                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                        {user.user.email}
                                    </p>

                                    <span
                                        className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${
                                            user.role === "ADMIN"
                                                ? "bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400"
                                                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                                        }`}
                                    >
                                        {user.role || "User"}
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </>

        )}

    </div>
);
};

export default Team;
