import { useSelector } from 'react-redux';
import { StatCard } from '../components/StatCard.jsx';
import { StatusBadge, PriorityBadge } from '../components/Badges';
import { DummyStats, DummyTasks } from '../components/Dummy.jsx';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className='space-y-6'>

            <div>
                <h2 className='text-2xl font-bold text-gray-800'>Dashboard</h2>
                <p className='text-gray-500 text-sm mt-1'>What's happening in your workspace</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <StatCard label='Total Tasks' value={DummyStats.total} color='border-blue-500' />
                <StatCard label='Completed' value={DummyStats.completed} color='border-green-500' />
                <StatCard label='Pending' value={DummyStats.pending} color='border-yellow-500' />
                <StatCard label='Overdue' value={DummyStats.overdue} color='border-red-500' />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                <div className='lg:col-span-2 bg-white rounded-xl shadow-sm p-5'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>Recent Tasks</h3>
                    <div className='flex flex-col gap-3'>
                        {DummyTasks.map((task) => {
                            <div key={task._id} className='flex items-center justify-between border border-gray-100'>
                                <p className='text-sm font-medium text-gray-700 flex-1'>{task.title}</p>
                                <div className='flex items-center gap-2 ml-4'>
                                    <PriorityBadge priority={task.priority} />
                                    <StatusBadge status={task.status} />
                                    <span className='text-xs text-gray-400'>{task.dueDate}</span>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

                <div className='bg-white rounded-xl shadow-sm p-5'>

                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>Progress</h3>

                    <div className='mb-6'>
                        <div className='flex justify-between text-sm text-gray-600 mb-1'>
                            <span>Completed</span>
                            <span>
                                {Math.round((DummyStats.completed / DummyStats.total) * 100)}%
                            </span>
                        </div>
                        <div className='w-full bg-gray-100 rounded-full h-2'>
                            <div
                                className='bg-green-500 h-2 rounded-full transition-all'
                                style={{
                                    width: `${(DummyStats.completed / DummyStats.total) * 100}%`
                                }}
                            />
                        </div>
                    </div>


                    <div className='mb-6'>
                        <div className='flex justify-between text-sm text-gray-600 mb-1'>
                            <span>Pending</span>
                            <span>
                                {Math.round((DummyStats.pending / DummyStats.total) * 100)}%
                            </span>
                        </div>
                        <div className='w-full bg-gray-100 rounded-full h-2'>
                            <div
                                className='bg-yellow-500 h-2 rounded-full transition-all'
                                style={{
                                    width: `${(DummyStats.pending / DummyStats.total) * 100}%`
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex justify-between text-sm text-gray-600 mb-1'>
                            <span>Overdue</span>
                            <span>
                                {Math.round((DummyStats.overdue / DummyStats.total) * 100)}%
                            </span>
                        </div>
                        <div className='w-full bg-gray-100 rounded-full h-2'>
                            <div
                                className='bg-red-500 h-2 rounded-full transition-all'
                                style={{
                                    width: `${(DummyStats.overdue / DummyStats.total) * 100}%`
                                }}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard