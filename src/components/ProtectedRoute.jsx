import { useUser, SignInButton } from "@clerk/clerk-react";
import {
    FolderKanban,
    CheckCircle2,
    Users,
    BarChart3,
} from "lucide-react";

const ProtectedRoute = ({ children }) => {

    const { isLoaded, isSignedIn } = useUser();

    // Loading State
    if (!isLoaded) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950 text-zinc-900 dark:text-white">
                Loading...
            </div>
        );
    }

    // Not Signed In
    if (!isSignedIn) {
        return (

            <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center px-6">

                <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">

                    {/* Left Content */}
                    <div>

                        <div className="flex items-center gap-3 mb-5">

                            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">

                                <FolderKanban className="size-7 text-blue-500" />

                            </div>

                            <div>

                                <h1 className="text-4xl font-bold text-zinc-900 dark:text-white">
                                    ProjectSync
                                </h1>

                                <p className="text-zinc-500 dark:text-zinc-400">
                                    Project Management Platform
                                </p>

                            </div>

                        </div>

                        <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            Organize projects, manage tasks, collaborate with teams,
                            and track progress through a clean and responsive dashboard.
                        </p>

                        {/* Features */}
                        <div className="mt-8 space-y-4">

                            <div className="flex items-center gap-3">

                                <CheckCircle2 className="size-5 text-emerald-500" />

                                <p className="text-zinc-700 dark:text-zinc-300">
                                    Create and manage multiple projects
                                </p>

                            </div>

                            <div className="flex items-center gap-3">

                                <Users className="size-5 text-blue-500" />

                                <p className="text-zinc-700 dark:text-zinc-300">
                                    Collaborate with team members
                                </p>

                            </div>

                            <div className="flex items-center gap-3">

                                <BarChart3 className="size-5 text-purple-500" />

                                <p className="text-zinc-700 dark:text-zinc-300">
                                    Track analytics and project progress
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Right Card */}
                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl p-8">

                        <div className="text-center">

                            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                                Welcome Back
                            </h2>

                            <p className="mt-3 text-zinc-500 dark:text-zinc-400">
                                Sign in to access your projects and workspace dashboard.
                            </p>

                            <div className="mt-8">

                                <SignInButton>

                                    <button className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition text-white font-medium">
                                        Sign In
                                    </button>

                                </SignInButton>

                            </div>

                            <p className="mt-5 text-sm text-zinc-400">
                                Secure authentication powered by Clerk
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        );
    }

    return children;
};

export default ProtectedRoute;