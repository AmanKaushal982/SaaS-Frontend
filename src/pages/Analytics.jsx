import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../services/taskThunks.js';
import { PRIORITY_COLORS, STATUS_COLORS } from '../components/Charts.jsx';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

const Analytics = () => {
    const dispatch = useDispatch();
    const { tasks, loading } = useSelector((state) => state.tasks);
    useEffect(() => {
        if (tasks.length === 0) {
            dispatch(fetchTasks());
        }
    }, []);
    if (loading) {
        return (
            <div className='flex items-center justify-center h-64'>
                <p className='text-gray-500'>Loading analytics...</p>
            </div>
        );
    };
    if (tasks.length === 0) {
        return (
            <div className='flex items-center justify-center h-64'>
                <p className='text-gray-500'>No tasks yet — create some tasks first</p>
            </div>
        )
    }
    return (
        <div className='space-y-6'>
            <div>
                <h2 className='text-2xl font-bold text-gray-800'>Analytics</h2>
                <p className='text-gray-500 text-sm mt-1'>
                    Overview of your task performance
                </p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                <div className='bg-white rounded-2xl shadow-sm p-5'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                        Tasks by Status
                    </h3>
                    <ResponsiveContainer width='100%' height={260}>
                        <PieChart>
                            <Pie>

                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Analytics