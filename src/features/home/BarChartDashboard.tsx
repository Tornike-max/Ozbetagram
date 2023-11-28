import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Bar,
} from "recharts";

export default function BarChartDashboard({ users }: { users: object }) {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
  ];

  console.log(users);
  return (
    <BarChart width={550} height={200} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
    </BarChart>
  );
}
