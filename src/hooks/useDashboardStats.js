import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../services/taskThunks';

const useDashboardStats = () => {
    const dispatch = useDispatch();
    const { tasks, loading } = useSelector((state) => state.tasks);
    useEffect(() => {
        dispatch(fetchTasks());
    }, []);
    const stats = useMemo(() => {
        const total = tasks.length;
        const completed = tasks.filter((t) => t.status === 'completed').length;
        const pending = tasks.filter((t) => t.status === 'pending').length;
        const overdue = tasks.filter((t) => t.status === 'overdue').length;
        return { total, completed, pending, overdue };
    }, [tasks]);
    const recentTasks = useMemo(() => {
        return [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
    }, [tasks]);
    return { stats, recentTasks, loading };
}
export default useDashboardStats;