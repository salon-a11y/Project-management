import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarIcon, MessageCircle, PenIcon } from "lucide-react";
import { assets } from "../assets/assets";

const TaskDetails = () => {

    const [searchParams] = useSearchParams();
    const projectId = searchParams.get("projectId");
    const taskId = searchParams.get("taskId");

    const user = { id : 'user_1'}
    const [task, setTask] = useState(null);
    const [project, setProject] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);

    const { currentWorkspace } = useSelector((state) => state.workspace);

    const fetchComments = async () => {

    };

    const fetchTaskDetails = async () => {
        setLoading(true);
        if (!projectId || !taskId) return;

        const proj = currentWorkspace.projects.find((p) => p.id === projectId);
        if (!proj) return;

        const tsk = proj.tasks.find((t) => t.id === taskId);
        if (!tsk) return;

        setTask(tsk);
        setProject(proj);
        setLoading(false);
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;

        try {

            toast.loading("Adding comment...");

            //  Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const dummyComment = { id: Date.now(), user: { id: 1, name: "User", image: assets.profile_img_a }, content: newComment, createdAt: new Date() };
            
            setComments((prev) => [...prev, dummyComment]);
            setNewComment("");
            toast.dismissAll();
            toast.success("Comment added.");
        } catch (error) {
            toast.dismissAll();
            toast.error(error?.response?.data?.message || error.message);
            console.error(error);
        }
    };

    useEffect(() => { fetchTaskDetails(); }, [taskId]);

    useEffect(() => {
        if (taskId && task) {
            fetchComments();
            const interval = setInterval(() => { fetchComments(); }, 10000);
            return () => clearInterval(interval);
        }
    }, [taskId, task]);

    if (loading) return <div className="text-gray-500 dark:text-zinc-400 px-4 py-6">Loading task details...</div>;
    if (!task) return <div className="text-red-500 px-4 py-6">Task not found.</div>;

   
    return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* Left Section */}
            <div className="xl:col-span-2">
                
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">

                    {/* Header */}
                    <div className="px-6 py-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                        
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-2xl bg-blue-100 dark:bg-blue-500/10">
                                <MessageCircle className="size-5 text-blue-600 dark:text-blue-400" />
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
                                    Task Discussion
                                </h2>

                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    {comments.length} comments
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Comments */}
                    <div className="h-[60vh] overflow-y-auto px-6 py-5 space-y-5">

                        {comments.length > 0 ? (

                            comments.map((comment) => (

                                <div
                                    key={comment.id}
                                    className={`flex ${
                                        comment.user.id === user?.id
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >

                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 border shadow-sm ${
                                            comment.user.id === user?.id
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700"
                                        }`}
                                    >

                                        <div className="flex items-center gap-2 mb-2">

                                            <img
                                                src={comment.user.image}
                                                alt="avatar"
                                                className="size-7 rounded-full border border-white/20"
                                            />

                                            <div className="flex flex-col">
                                                <span
                                                    className={`text-sm font-medium ${
                                                        comment.user.id === user?.id
                                                            ? "text-white"
                                                            : "text-zinc-900 dark:text-white"
                                                    }`}
                                                >
                                                    {comment.user.name}
                                                </span>

                                                <span
                                                    className={`text-xs ${
                                                        comment.user.id === user?.id
                                                            ? "text-blue-100"
                                                            : "text-zinc-500 dark:text-zinc-400"
                                                    }`}
                                                >
                                                    {format(
                                                        new Date(comment.createdAt),
                                                        "dd MMM yyyy • HH:mm"
                                                    )}
                                                </span>
                                            </div>

                                        </div>

                                        <p
                                            className={`text-sm leading-relaxed ${
                                                comment.user.id === user?.id
                                                    ? "text-white"
                                                    : "text-zinc-700 dark:text-zinc-200"
                                            }`}
                                        >
                                            {comment.content}
                                        </p>

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="h-full flex flex-col items-center justify-center text-center">

                                <div className="size-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                                    <MessageCircle className="size-8 text-zinc-400" />
                                </div>

                                <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                                    No comments yet
                                </h3>

                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    Start the discussion for this task.
                                </p>

                            </div>

                        )}

                    </div>

                    {/* Comment Input */}
                    <div className="border-t border-zinc-200 dark:border-zinc-800 p-5">

                        <div className="flex flex-col sm:flex-row gap-4">

                            <textarea
                                value={newComment}
                                onChange={(e) =>
                                    setNewComment(e.target.value)
                                }
                                placeholder="Write your comment..."
                                rows={3}
                                className="flex-1 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />

                            <button
                                onClick={handleAddComment}
                                className="h-fit px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow-lg hover:scale-[1.02] transition-all"
                            >
                                Post Comment
                            </button>

                        </div>

                    </div>

                </div>

            </div>

            {/* Right Section */}
            <div className="space-y-6">

                {/* Task Card */}
                <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm">

                    <div className="flex items-start justify-between gap-4">

                        <div>
                            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {task.title}
                            </h1>

                            {task.description && (
                                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                    {task.description}
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-5">

                        <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-medium">
                            {task.status}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400 text-xs font-medium">
                            {task.type}
                        </span>

                        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
                            {task.priority}
                        </span>

                    </div>

                    {/* Divider */}
                    <div className="border-t border-zinc-200 dark:border-zinc-800 my-6" />

                    {/* Details */}
                    <div className="space-y-4">

                        <div className="flex items-center gap-3">

                            <img
                                src={task.assignee?.image}
                                alt="avatar"
                                className="size-10 rounded-full border border-zinc-200 dark:border-zinc-700"
                            />

                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    Assigned To
                                </p>

                                <p className="font-medium text-zinc-900 dark:text-white">
                                    {task.assignee?.name || "Unassigned"}
                                </p>
                            </div>

                        </div>

                        <div className="flex items-center gap-3">

                            <div className="size-10 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center">
                                <CalendarIcon className="size-5 text-orange-600 dark:text-orange-400" />
                            </div>

                            <div>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                    Due Date
                                </p>

                                <p className="font-medium text-zinc-900 dark:text-white">
                                    {format(
                                        new Date(task.due_date),
                                        "dd MMM yyyy"
                                    )}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Project Card */}
                {project && (

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg">

                        <div className="flex items-center gap-3 mb-5">

                            <div className="size-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                <PenIcon className="size-5" />
                            </div>

                            <div>
                                <p className="text-sm text-blue-100">
                                    Project
                                </p>

                                <h2 className="text-xl font-semibold">
                                    {project.name}
                                </h2>
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                            <div className="bg-white/10 rounded-2xl p-4">
                                <p className="text-xs text-blue-100 mb-1">
                                    Status
                                </p>

                                <h3 className="font-medium">
                                    {project.status}
                                </h3>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-4">
                                <p className="text-xs text-blue-100 mb-1">
                                    Priority
                                </p>

                                <h3 className="font-medium">
                                    {project.priority}
                                </h3>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-4">
                                <p className="text-xs text-blue-100 mb-1">
                                    Progress
                                </p>

                                <h3 className="font-medium">
                                    {project.progress}%
                                </h3>
                            </div>

                            <div className="bg-white/10 rounded-2xl p-4">
                                <p className="text-xs text-blue-100 mb-1">
                                    Start Date
                                </p>

                                <h3 className="font-medium text-sm">
                                    {format(
                                        new Date(project.start_date),
                                        "dd MMM yyyy"
                                    )}
                                </h3>
                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    </div>
);
};

export default TaskDetails;
