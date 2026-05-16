import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TaskModal from '../components/TaskModal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getTaskById, deleteTask } from '../services/taskThunks.js';
import { StatusBadge, PriorityBadge } from '../components/Badges.jsx';

const TaskDetail = () => {
    const { id } = useParams();
    const diapatch = useDispatch();
    const navigate = useNavigate();
    const { selectedTask, loading, error } = useSelector((state) => state.tasks);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        dispatchEvent(getTaskById(id));
    }, [id]);
    const handleDelete = async () => {
        if (window.confirm('Delete this task?')) {
            await dispatchEvent(deleteTask(id));
            navigate('/tasks', { replace: true });
        }
    };
    if (loading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <p className='text-gray-500'>Loading task...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className='flex items-center justify-center h-64'>
                <p className='text-red-500'>{error}</p>
            </div>
        );
    }
    if (!selectedTask) return null;
    return (
        <div className='max-w-2xl mx-auto space-y-6'>
            <button onClick={() => navigate('/tasks')} className='text-sm text-gray-500 hover:text-gray-800 cursor-pointer flex items-center gap-1'>
                ← Back to Tasks
            </button>
            <div className='bg-white rounded-2xl shadow-sm p-6 space-y-5'>
                <div className='flex items-start justify-between gap-4'>
                    <h2 className='text-2xl font-bold text-gray-800'>
                        {selectedTask.title}
                    </h2>
                    <div className='flex gap-2 mt-1'>
                        <PriorityBadge priority={selectedTask.priority} />
                        <StatusBadge status={selectedTask.status} />
                    </div>
                </div>
                <hr className='border-gray-100' />
                <div>
                    <p className='text-sm font-medium text-gray-500 mb-1'>Description</p>
                    <p className='text-gray-700 text-sm'>
                        {selectedTask.description || 'No description provided'}
                    </p>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <div>
                        <p className='text-sm font-medium text-gray-500 mb-1'>Status</p>
                        <StatusBadge status={selectedTask.status} />
                    </div>
                    <div>
                        <p className='text-sm font-medium text-gray-500 mb-1'>Priority</p>
                        <PriorityBadge priority={selectedTask.priority} />
                    </div>
                    <div>
                        <p className='text-sm font-medium text-gray-500 mb-1'>Due Date</p>
                        <p className='text-sm text-gray-700'>
                            {selectedTask.dueDate
                                ? new Date(selectedTask.dueDate).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })
                                : 'No due date'
                            }
                        </p>
                    </div>
                    <div>
                        <p className='text-sm font-medium text-gray-500 mb-1'>Created</p>
                        <p className='text-sm text-gray-700'>
                            {new Date(selectedTask.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
                <hr className='border-gray-100' />
                <div className='flex gap-3'>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className='flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium cursor-pointer'
                    >
                        Edit Task
                    </button>
                    <button
                        onClick={handleDelete}
                        className='flex-1 border border-red-300 text-red-500 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-red-50'
                    >
                        Delete Task
                    </button>
                </div>
            </div>
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editTask={selectedTask}
            />
        </div>
    )
}

export default TaskDetail