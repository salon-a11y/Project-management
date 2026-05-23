import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import MyTasksSidebar from './MyTasksSidebar'
import ProjectSidebar from './ProjectsSidebar'
import WorkspaceDropdown from './WorkspaceDropdown'
import {
    FolderOpenIcon,
    LayoutDashboardIcon,
    SettingsIcon,
    UsersIcon
} from 'lucide-react'

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

    const menuItems = [
        { name: 'Dashboard', href: '/', icon: LayoutDashboardIcon },
        { name: 'Projects', href: '/projects', icon: FolderOpenIcon },
        { name: 'Team', href: '/team', icon: UsersIcon },
    ]

    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setIsSidebarOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener("mousedown", handleClickOutside);

    }, [setIsSidebarOpen]);

    return (
        <div
            ref={sidebarRef}
            className={`
                z-50
                min-w-72
                h-screen
                flex flex-col
                max-sm:absolute
                transition-all duration-300

                bg-gradient-to-b
                from-blue-700
                via-blue-800
                to-indigo-950

                dark:from-blue-950
                dark:via-indigo-950
                dark:to-black

                border-r border-blue-500/20
                shadow-2xl shadow-blue-900/20

                ${isSidebarOpen ? 'left-0' : '-left-full'}
            `}
        >

            {/* Top */}
            <div className="backdrop-blur-xl bg-white/5">
                <WorkspaceDropdown />
            </div>

            <hr className='border-white/10' />

            {/* Content */}
            <div className='flex-1 overflow-y-auto no-scrollbar flex flex-col'>

                <div>

                    {/* Menu */}
                    <div className='p-4 space-y-2'>

                        {menuItems.map((item) => (

                            <NavLink
                                to={item.href}
                                key={item.name}
                                className={({ isActive }) => `
                                    group
                                    flex items-center gap-3
                                    py-3 px-4
                                    rounded-2xl
                                    text-white/90
                                    transition-all duration-300

                                    ${
                                        isActive
                                            ? `
                                                bg-white/15
                                                backdrop-blur-md
                                                shadow-lg
                                                border border-white/10
                                                scale-[1.02]
                                              `
                                            : `
                                                hover:bg-white/10
                                                hover:translate-x-1
                                              `
                                    }
                                `}
                            >
                                <item.icon
                                    size={18}
                                    className='text-blue-100 group-hover:text-white'
                                />

                                <p className='text-sm font-medium tracking-wide truncate'>
                                    {item.name}
                                </p>

                            </NavLink>
                        ))}

                        {/* Settings */}
                        <button
                            className='
                                group
                                flex w-full items-center gap-3
                                py-3 px-4
                                rounded-2xl
                                text-white/90
                                hover:bg-white/10
                                hover:translate-x-1
                                transition-all duration-300
                            '
                        >
                            <SettingsIcon
                                size={18}
                                className='text-blue-100 group-hover:text-white'
                            />

                            <p className='text-sm font-medium tracking-wide truncate'>
                                Settings
                            </p>
                        </button>

                    </div>

                    {/* Sections */}
                    <div className='px-2 pb-6 space-y-5'>

                        <div className='rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 py-2'>
                            <MyTasksSidebar />
                        </div>

                        <div className='rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 py-2'>
                            <ProjectSidebar />
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Sidebar