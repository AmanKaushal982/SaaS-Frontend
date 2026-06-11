import { StatCard } from '../components/StatCard.jsx';
import { StatusBadge, PriorityBadge } from '../components/Badges';
import useDashboardStats from '../hooks/useDashboardStats';
import { Link } from 'react-router-dom';
import useCurrentDate from '../hooks/useCurrentDate.js';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { stats, recentTasks, loading } = useDashboardStats();
    const { user } = useSelector((state) => state.auth);
    const displayName = user?.name || user?.email || 'there';
    const today = useCurrentDate();

    return (
        <div className='space-y-6'>
            <div>
                <StatCard />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                <div className='lg:col-span-2 bg-white rounded-xl shadow-sm p-5'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>Recent Tasks</h3>
                    {loading ? (<p className='text-gray-500 text-sm'>Loading...</p>) : recentTasks.length === 0 ? (<p className='text-gray-500 text-sm'>No tasks yet — create some tasks</p>) : (
                        <div className='flex flex-col gap-3'>
                            {recentTasks.map((task) => (
                                <div key={task._id} className='flex items-center justify-between border border-gray-100'>
                                    <Link to={`/tasks/${task._id}`} className='text-sm font-medium text-gray-700 flex-1'>{task.title}</Link>
                                    <div className='flex items-center gap-2 ml-4'>
                                        <PriorityBadge priority={task.priority} />
                                        <StatusBadge status={task.status} />
                                        {task.dueDate && (
                                            <span className='text-xs text-gray-400'>
                                                {new Date(task.dueDate).toLocaleDateString('en-GB', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className='bg-white rounded-xl shadow-sm p-5'>

                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>Progress</h3>

                    <div className='mb-6'>
                        <div className='flex justify-between text-sm text-gray-600 mb-1'>
                            <span>Completed</span>
                            <span>
                                {Math.round((stats.completed / stats.total) * 100)}%
                            </span>
                        </div>
                        <div className='w-full bg-gray-100 rounded-full h-2'>
                            <div
                                className='bg-green-500 h-2 rounded-full transition-all'
                                style={{
                                    width: `${(stats.completed / stats.total) * 100}%`
                                }}
                            />
                        </div>
                    </div>


                    <div className='mb-6'>
                        <div className='flex justify-between text-sm text-gray-600 mb-1'>
                            <span>Pending</span>
                            <span>
                                {Math.round((stats.pending / stats.total) * 100)}%
                            </span>
                        </div>
                        <div className='w-full bg-gray-100 rounded-full h-2'>
                            <div
                                className='bg-yellow-500 h-2 rounded-full transition-all'
                                style={{
                                    width: `${(stats.pending / stats.total) * 100}%`
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex justify-between text-sm text-gray-600 mb-1'>
                            <span>Overdue</span>
                            <span>
                                {Math.round((stats.overdue / stats.total) * 100)}%
                            </span>
                        </div>
                        <div className='w-full bg-gray-100 rounded-full h-2'>
                            <div
                                className='bg-red-500 h-2 rounded-full transition-all'
                                style={{
                                    width: `${(stats.overdue / stats.total) * 100}%`
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Dashboard