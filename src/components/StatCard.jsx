import useDashboardStats from '../hooks/useDashboardStats';

export const StatCard = ({ label }) => {
    const { stats } = useDashboardStats();
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            <div className='bg-white rounded-xl p-5 shadow-sm'>
                <p className='text-sm text-gray-500 mb-1'>Total Tasks</p>
                <p className='text-3xl font-bold text-gray-800'>{stats.total}</p>
            </div>
            <div className='bg-white rounded-xl p-5 shadow-sm'>
                <p className='text-sm text-gray-500 mb-1'>Completed</p>
                <p className='text-3xl font-bold text-gray-800'>{stats.completed}</p>
            </div>
            <div className='bg-white rounded-xl p-5 shadow-sm'>
                <p className='text-sm text-gray-500 mb-1'>Pending</p>
                <p className='text-3xl font-bold text-gray-800'>{stats.pending}</p>
            </div>
            <div className='bg-white rounded-xl p-5 shadow-sm'>
                <p className='text-sm text-gray-500 mb-1'>Overdue</p>
                <p className='text-3xl font-bold text-gray-800'>{stats.overdue}</p>
            </div>
        </div>
    )
}