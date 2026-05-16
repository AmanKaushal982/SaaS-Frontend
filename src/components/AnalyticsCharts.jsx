import {
  Pie,
  Legend,
  Tooltip,
  Cell,
  PieChart,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";

export const StatusChart = ({ data, colors }) => {
  <ResponsiveContainer width="100%" height={260}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={100}
        paddingAngle={3}
        dataKey="value"
      >
        {data.map((entry) => (
          <Cell key={entry.name} fill={colors[entry.name]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>;
};

export const PriorityChart = ({ data, colors }) => (
  <ResponsiveContainer width="100%" height={260}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
      <Tooltip />
      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
        {data.map((entry) => (
          <Cell key={entry.name} fill={colors[entry.name]} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);

export const TimelineChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={260}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="tasks"
        stroke="#111827"
        strokeWidth={2}
        dot={{ fill: "#111827", r: 4 }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
);
