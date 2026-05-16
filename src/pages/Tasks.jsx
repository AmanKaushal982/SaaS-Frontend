import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StatusBadge, PriorityBadge } from "../components/Badges.jsx";
import { fetchTasks, deleteTask } from "../services/taskThunks.js";
import {
  setStatusFilter,
  setPriorityFilter,
} from "../store/slices/taskSlice.js";
import TaskModal from "../components/TaskModal.jsx";
import { Link } from 'react-router-dom';

const Tasks = () => {
  const dispatch = useDispatch();
  const { tasks, loading, filters } = useSelector((state) => state.tasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  useEffect(() => {
    dispatch(fetchTasks());
  }, []);
  const filterBtn = (active, label, onClick) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition-colors
        ${active
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
        }`}
    >
      {label}
    </button>
  );
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filters.status === "all" || task.status === filters.status;
    const priorityMatch =
      filters.priority === "all" || task.priority === filters.priority;
    return statusMatch && priorityMatch;
  });
  const handleAddNew = () => {
    setEditTask(null);
    setIsModalOpen(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setEditTask(null);
  };
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
          <p className="text-gray-500 text-sm mt-1"></p>
        </div>
        <button
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
          onClick={handleAddNew}
        >
          + Add Task
        </button>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
        {/* Status Filters */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-gray-500 mr-1 self-center">
            Status:
          </span>
          {filterBtn(filters.status === "all", "All", () =>
            dispatch(setStatusFilter("all")),
          )}
          {filterBtn(filters.status === "pending", "Pending", () =>
            dispatch(setStatusFilter("pending")),
          )}
          {filterBtn(filters.status === "in-progress", "In Progress", () =>
            dispatch(setStatusFilter("in-progress")),
          )}
          {filterBtn(filters.status === "completed", "Completed", () =>
            dispatch(setStatusFilter("completed")),
          )}
          {filterBtn(filters.status === "overdue", "Overdue", () =>
            dispatch(setStatusFilter("overdue")),
          )}
        </div>

        {/* Priority Filters */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm text-gray-500 mr-1 self-center">
            Priority:
          </span>
          {filterBtn(filters.priority === "all", "All", () =>
            dispatch(setpriorityFilter("all")),
          )}
          {filterBtn(filters.priority === "low", "Low", () =>
            dispatch(setpriorityFilter("low")),
          )}
          {filterBtn(filters.priority === "medium", "Medium", () =>
            dispatch(setpriorityFilter("medium")),
          )}
          {filterBtn(filters.priority === "high", "High", () =>
            dispatch(setpriorityFilter("high")),
          )}
        </div>
      </div>
      {/* task list */}
      <div className="bg-white rounded-xl shadow-sm">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading tasks...</div>
        ) : filteredTasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No tasks found</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredTasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
              >
                {/* Left title + Date */}
                <div className="flex-1">
                  <Link className="text-sm font-medium text-gray-800 hover:text-blue-600 hover:underline" to={`/tasks/${task._id}`}>
                    {task.title}
                  </Link>
                  {task.dueDate && (
                    <p className="text-xs text-gray-400 mt-1">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                {/* Right Badges + Actions */}
                <div className="flex items-center gap-2 ml-4">
                  <PriorityBadge priority={task.priority} />
                  <StatusBadge status={task.status} />
                  <button
                    onClick={() => handleEdit(task)}
                    className="text-xs text-blue-600 hover:underline cursor-pointer ml-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="text-xs text-red-500 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleClose}
        editTask={editTask}
      />
    </div>
  );
};

export default Tasks;
