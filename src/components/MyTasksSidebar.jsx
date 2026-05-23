import { useEffect, useState } from 'react';
import { CheckSquareIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MyTasksSidebar() {

    const user = { id: 'user_1' }

    const { currentWorkspace } = useSelector((state) => state.workspace);
    const [showMyTasks, setShowMyTasks] = useState(false);
    const [myTasks, setMyTasks] = useState([]);

    const toggleMyTasks = () => setShowMyTasks(prev => !prev);

    const getTaskStatusColor = (status) => {
        switch (status) {
            case 'DONE':
                return 'bg-green-500';
            case 'IN_PROGRESS':
                return 'bg-yellow-500';
            case 'TODO':
                return 'bg-gray-500 dark:bg-zinc-500';
            default:
                return 'bg-gray-400 dark:bg-zinc-400';
        }
    };

    const fetchUserTasks = () => {
        const userId = user?.id || '';
        if (!userId || !currentWorkspace) return;
        const currentWorkspaceTasks = currentWorkspace.projects.flatMap((project) => {
            return project.tasks.filter((task) => task?.assignee?.id === userId);
        });

        setMyTasks(currentWorkspaceTasks);
    }

    useEffect(() => {
        fetchUserTasks()
    }, [currentWorkspace])

    return (
  <div className="mt-6 px-4">

    {/* Header */}
    <div
      onClick={toggleMyTasks}
      className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:shadow-md transition"
    >

      <div className="flex items-center gap-3">

        <div className="bg-black p-2 rounded-lg">
          <CheckSquareIcon className="w-4 h-4 text-white" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            My Tasks
          </h3>

          <p className="text-xs text-gray-500">
            Assigned tasks
          </p>
        </div>

      </div>

      <div className="flex items-center gap-3">

        <span className="bg-black text-white text-xs px-2.5 py-1 rounded-full">
          {myTasks.length}
        </span>

        {showMyTasks ? (
          <ChevronDownIcon className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRightIcon className="w-4 h-4 text-gray-500" />
        )}

      </div>

    </div>

    {/* Task List */}
    {showMyTasks && (

      <div className="mt-4 space-y-3">

        {myTasks.length === 0 ? (

          <div className="bg-gray-100 rounded-xl py-6 text-center text-sm text-gray-500">
            No tasks assigned
          </div>

        ) : (

          myTasks.map((task, index) => (

            <Link
              key={index}
              to={`/taskDetails?projectId=${task.projectId}&taskId=${task.id}`}
              className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition"
            >

              <div className="flex items-start gap-3">

                {/* Status Dot */}
                <div
                  className={`w-3 h-3 rounded-full mt-1 ${getTaskStatusColor(task.status)}`}
                />

                {/* Content */}
                <div className="flex-1 min-w-0">

                  <h4 className="text-sm font-semibold text-gray-800 truncate">
                    {task.title}
                  </h4>

                  <p className="text-xs text-gray-500 mt-1 lowercase">
                    {task.status.replace("_", " ")}
                  </p>

                </div>

              </div>

            </Link>

          ))

        )}

      </div>

    )}

  </div>
);
}

export default MyTasksSidebar;
