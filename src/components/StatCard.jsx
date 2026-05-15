export const StatCard = ({ label, value, color }) => {
    return (
        <div className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${color}`}>
            <p className='text-sm text-gray-500 mb-1'>{label}</p>
            <p className='text-3xl font-bold text-gray-800'>{value}</p>
        </div>
    )
}