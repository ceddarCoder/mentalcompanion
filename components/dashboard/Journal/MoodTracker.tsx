// components/MoodTracker.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2023-10-01', mood: 4 },
  { date: '2023-10-02', mood: 3 },
  { date: '2023-10-03', mood: 5 },
  { date: '2023-10-04', mood: 2 },
  { date: '2023-10-05', mood: 4 },
];

export const MoodTracker = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Mood Tracker</h2>
      <div style={{ width: '100%', height: 200 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="mood" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};