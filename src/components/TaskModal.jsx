import { useState, useEffect } from 'react';
import { createThunk, updateThunk } from '../services/taskThunks';
import { useDispatch } from 'react-redux';

const TaskModal = ({ isOpen, onClose, editTask }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        dueDate: ''
    });
    useEffect(() => {
        if (editTask) {
            setFormData({
                title: editTask.title,
                description: editTask.description || '',
                status: editTask.status,
                priority: editTask.priority,
                dueDate: editTask.dueDate
                    ? editTask.dueDate.split('T')[0] : ''
            });
        }
        else {
            setFormData({
                title: '',
                description: '',
                status: 'pending',
                priority: 'medium',
                dueDate: ''
            });
        }
    }, [editTask, isOpen]);
    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editTask) {
            await dispatch(updateTask({ id: editTask._id, updates: formData }));
        }
        else {
            await dispatch(createTask(formData));
        }
        onClose();
    };
    if (!isOpen) return null;
    return (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <div className='bg-white rounded-2xl p-6 w-full max-w-md mx-4'>
                <h2 className='text-xl font-bold text-gray-800 mb-4'>
                    {editTask ? 'Edit Task' : 'Add New Task'}
                </h2>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>Title</label>
                        <input type="text" name='title' value={formData.title} onChange={handleInput} placeholder='Task title' required className='border border=gray-300 rounded-lg px-3 py-2 text-sm' />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>
                            Description
                        </label>
                        <textarea name="description" value={formData.description} onChange={handleInput} rows={3} placeholder='Task description(optional)' className='border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none'></textarea>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-medium text-gray-700'>Status</label>
                            <select name="status" value={formData.status} onChange={handleInput} className='border border-gray-300 rounded-lg px-3 py-2 text-sm'>
                                <option value="pending">Pending</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Completed</option>
                                <option value="overdue">Overdue</option>
                            </select>
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-medium text-gray-700'>Priority</label>
                            <select name='priority' value={formData.priority} onChange={handleInput} className='border border-gray-300 rounded-lg px-3 py-2 text-sm'>
                                <option value='low'>Low</option>
                                <option value='medium'>Medium</option>
                                <option value='high'>High</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm font-medium text-gray-700'>Due Date</label>
                        <input type="date" name='dueDate' value={formData.dueDate} onChange={handleInput} className='border border-gray-300 rounded-lg px-3 py-2 text-sm' />
                    </div>
                    <div className='flex gap-3 mt-2'>
                        <button type='button' onClick={onClose} className='flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg text-sm font-medium cursor-pointer'>Cancel</button>

                        <button type='submit' className='flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium cursor-pointer'>{editTask ? 'Update Task' : 'Create Task'}</button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default TaskModal