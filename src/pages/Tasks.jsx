import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBadge, PriorityBadge } from '../components/Badges.jsx';
import { fetchTasks, deleteTask } from '../services/taskThunks.js';
import { setStatusFilter, setPriorityFilter } from '../store/slices/taskSlice.js';
import TaskModal from '../components/TaskModal.jsx';

const Tasks = () => {
    const dispatch = useDispatch();
    const { tasks, loading, filters } = useSelector((state) => state.tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);
    useEffect(() => {
        dispatch(fetchTasks());
    }, []);
    const filteredTasks = tasks.filter((task) => {
        const statusMatch = filters.status === 'all' || task.status === filters.status;
        const priorityMatch = filters.priority === 'all' || task.priority === filters.priority;
        return statusMatch && priorityMatch;
    });
    const handleAddNew = () => {
        setEditTask(null);
        setIsModalOpen(true);
    };
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800'>Tasks</h2>
                    <p className='text-gray-500 text-sm mt-1'></p>
                </div>
                <button className='bg-black text-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer' onClick={handleAddNew}>+ Add Task</button>
            </div>
            {/* task list */}
            <div className='bg-white rounded-xl shadow-sm'>
                {filteredTasks.map((task) => {
                    <div key={task._id}>
                        <div>
                            <p>{task.title}</p>

                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Tasks