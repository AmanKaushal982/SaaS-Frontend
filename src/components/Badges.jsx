export const StatusBadge = ({ status }) => {
    const styles = {
        completed: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        overdue: 'bg-red-100 text-red-700',
        'in-progress': 'bg-blue-100 text-blue-700',
    };
    return (
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${styles[status]}`}>
            {status}
        </span>
    );
};
export const PriorityBadge = ({ priority }) => {
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