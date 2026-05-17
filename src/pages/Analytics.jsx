import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../services/taskThunks.js";
import {
  PRIORITY_COLORS,
  STATUS_COLORS,
} from "../components/AnalyticsCharts.jsx";
import { StatusChart, PriorityChart, TimelineChart } from "../components/AnalyticsCharts.jsx";

const STATUS_COLORS = { pending: "#facc15", "in-progress": "#60a5fa", completed: "#4ade80", overdue: "#f87171" };
const PRIORITY_COLORS = { low: "#60a5fa", medium: "#fb923c", high: "#f87171" };
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
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading analytics...</p>
      </div>
    );
  };
  if (tasks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No tasks yet — create some tasks first</p>
      </div>
    );
  };
  export const StatusData = useMemo(() => {
    const counts = { pending: 0, 'in-progress': 0, completed: 0, overdue: 0 };
    tasks.forEach((task) => {
      if (counts[task.status] !== undefined) {
        counts[task.status]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tasks]);
  export const PriorityData = useMemo(() => {
    const counts = { low: 0, medium: 0, high: 0 };
    tasks.forEach((task) => {
      if (counts[task.priority] !== undefined) {
        counts[task.priority]++;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [tasks]);
  export const TimeLineData = useMemo(() => {
    const counts = {};
    tasks.forEach((task) => {
      const date = new Date(task.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
      });
      counts[date] = (counts[date] || 0) + 1;
    });
    return Object.entries(counts).map(([date, count]) => ({
      date,
      tasks: count
    }));
  }, [tasks]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Analytics</h2>
        <p className="text-gray-500 text-sm mt-1">
          Overview of your task performance
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Tasks by Status
          </h3>
          <StatusChart data={statusData} colors={STATUS_COLORS} />
        </div>

        <div className='bg-white rounded-2xl shadow-sm p-5'>
          <h3 className='mb-4'>Priority Distribution</h3>
          <PriorityChart data={priorityData} colors={PRIORITY_COLORS} />
        </div>
      </div>

      <div className='bg-white rounded-2xl shadow-sm p-5'>
        <h3 className='mb-4'>Tasks Created Over Time</h3>
        <TimelineChart data={timelineData} />
      </div>
    </div>
  );
};

export default Analytics;
