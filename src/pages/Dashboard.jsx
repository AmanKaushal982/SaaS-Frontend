import { useSelector } from 'react-redux';
const dummyStats = {
    total: 24,
    completed: 12,
    pending: 8,
    overdue: 4,
};
const dummyTasks = [
    { _id: '1', title: 'Design landing page', status: 'completed', priority: 'high', dueDate: '2024-12-01' },
    { _id: '2', title: 'Fix auth bug', status: 'pending', priority: 'high', dueDate: '2024-12-05' },
    { _id: '3', title: 'Write API docs', status: 'pending', priority: 'medium', dueDate: '2024-12-10' },
    { _id: '4', title: 'Setup CI/CD', status: 'overdue', priority: 'low', dueDate: '2024-11-28' },
    { _id: '5', title: 'Database optimization', status: 'completed', priority: 'medium', dueDate: '2024-12-03' },
];
const StatCard = ({ label, value, color }) => {
    return (
        <div className='bg-white rounded-xl p-5 border-1-4 ${color}'>

        </div>
    )
}
const StatusBadge = ({ status }) => {
    const styles = {
        completed: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        overdue: 'bg-red-100 text-red-700'
    };
    return (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status]}`}>
            {status}
        </span>
    );
};
const PriorityBadge = ({ priority }) => {
    const styles = {
        high: 'bg-red-50 text-red-600',
        medium: 'bg-orange-50 text-orange-600',
        low: 'bg-blue-50 text-blue-600'
    };
    return (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[priority]}`}>
            {priority}
        </span>
    );
};
const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    return (
        <div className='space-y-6'>

            <div>
                <h2 className='text-2xl font-bold text-gray-800'>Dashboard</h2>
                <p className='text-gray-500 text-sm mt-1'>What's happening in your workspace</p>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <StatCard label='Total Tasks' value={dummyStats.total} color='border-blue-500' />
                <StatCard label='Completed' value={dummyStats.completed} color='border-green-500' />
                <StatCard label='Pending' value={dummyStats.pending} color='border-yellow-500' />
                <StatCard label='Overdue' value={dummyStats.overdue} color='border-red-500' />
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>

                <div className='lg:col-span-2 bg-white rounded-xl shadow-sm p-5'>
                    <h3 className='text-lg font-semibold text-gray-800 mb-4'>Recent Tasks</h3>
                    <div className='flex flex-col gap-3'>
                        {dummyTasks.map((task) => {
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
                                {Math.round((dummyStats.completed / dummyStats.total) * 100)}%
                            </span>
                        </div>
                        <div className='w-full bg-gray-100 rounded-full h-2'>
                            <div
                                className='bg-green-500 h-2 rounded-full transition-all'
                                style={{
                                    width: `${(dummyStats.completed / dummyStats.total) * 100}%`
                                }}
                            />
                        </div>
                    </div>


                    <div className='mb-6'>
                        <div className='flex justify-between text-sm text-gray-600 mb-1'>
                            <span>Pending</span>
                            <span>
                                {Math.round((dummyStats.pending / dummyStats.total) * 100)}%
                            </span>
                        </div>
                        <div className='w-full bg-gray-100 rounded-full h-2'>
                            <div
                                className='bg-yellow-500 h-2 rounded-full transition-all'
                                style={{
                                    width: `${(dummyStats.pending / dummyStats.total) * 100}%`
                                }}
                            />
                        </div>
                    </div>

                    <div>
                        <div className='flex justify-between text-sm text-gray-600 mb-1'>
                            <span>Overdue</span>
                            <span>
                                {Math.round((dummyStats.overdue / dummyStats.total) * 100)}%
                            </span>
                        </div>
                        <div className='w-full bg-gray-100 rounded-full h-2'>
                            <div
                                className='bg-red-500 h-2 rounded-full transition-all'
                                style={{
                                    width: `${(dummyStats.overdue / dummyStats.total) * 100}%`
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