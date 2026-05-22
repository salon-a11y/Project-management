import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useUser } from "@clerk/clerk-react"

import StatsGrid from '../components/StatsGrid'
import ProjectOverview from '../components/ProjectOverview'
import RecentActivity from '../components/RecentActivity'
import TasksSummary from '../components/TasksSummary'
import CreateProjectDialog from '../components/CreateProjectDialog'

const Dashboard = () => {

    const { user, isLoaded } = useUser()
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    if (!isLoaded) return null  // wait for Clerk to load

    const displayName =
        user?.fullName ||
        user?.firstName ||
        user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
        "User"

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
            
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-14">

                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                            Welcome back, {displayName}
                        </h1>

                        <p className="text-gray-500 dark:text-zinc-400 text-sm sm:text-base">
                            Here's what's happening with your projects today
                        </p>
                    </div>

                    <button
                        onClick={() => setIsDialogOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl 
                        bg-gradient-to-r from-indigo-500 to-purple-600 
                        text-white font-medium shadow-lg 
                        hover:shadow-indigo-500/30 
                        hover:-translate-y-0.5 
                        transition-all duration-300"
                    >
                        <Plus size={16} />
                        New Project
                    </button>

                    <CreateProjectDialog
                        isDialogOpen={isDialogOpen}
                        setIsDialogOpen={setIsDialogOpen}
                    />
                </div>

                {/* Stats Section */}
                <div className="mb-14 p-6 rounded-3xl 
                bg-white/70 dark:bg-zinc-900/60 
                backdrop-blur-xl 
                border border-gray-200 dark:border-zinc-800 
                shadow-sm">
                    <StatsGrid />
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-10">

                    <div className="lg:col-span-2 space-y-10">

                        <div className="rounded-3xl 
                        bg-white dark:bg-zinc-900 
                        border border-gray-200 dark:border-zinc-800 
                        shadow-md hover:shadow-xl 
                        transition-all duration-300 
                        p-8">
                            <ProjectOverview />
                        </div>

                        <div className="rounded-3xl 
                        bg-white dark:bg-zinc-900 
                        border border-gray-200 dark:border-zinc-800 
                        shadow-md hover:shadow-xl 
                        transition-all duration-300 
                        p-8">
                            <RecentActivity />
                        </div>

                    </div>

                    <div className="rounded-3xl 
                    bg-white dark:bg-zinc-900 
                    border border-gray-200 dark:border-zinc-800 
                    shadow-md hover:shadow-xl 
                    transition-all duration-300 
                    p-8">
                        <TasksSummary />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Dashboard