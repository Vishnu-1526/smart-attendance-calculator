
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Subject } from '../types';
import { calculateAttendancePercentage, getAttendanceStatus } from '../utils/attendance';

interface AnalyticsProps {
  subjects: Subject[];
  minAttendance: number;
}

const Analytics: React.FC<AnalyticsProps> = ({ subjects, minAttendance }) => {
  const chartData = subjects.map(s => ({
    name: s.code,
    fullName: s.name,
    attendance: parseFloat(calculateAttendancePercentage(s).toFixed(2)),
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface p-2 border border-gray-600 rounded-md">
          <p className="label font-bold text-text-primary">{`${payload[0].payload.fullName} (${label})`}</p>
          <p className="intro text-text-secondary">{`Attendance: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold text-text-primary mb-6">Attendance Analysis</h2>
      {subjects.length > 0 ? (
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" unit="%" />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(75, 85, 99, 0.3)' }}/>
              <Legend />
              <Bar dataKey="attendance" name="Attendance %" fill="#8884d8">
                {chartData.map((entry, index) => {
                  const status = getAttendanceStatus(entry.attendance, minAttendance);
                  let color = '#ef4444'; // danger
                  if (status === 'success') color = '#22c55e';
                  if (status === 'warning') color = '#f97316';
                  return <Cell key={`cell-${index}`} fill={color} />;
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center py-12">
            <h3 className="text-xl font-medium text-text-primary">No data to analyze.</h3>
            <p className="text-text-secondary mt-2">Add subjects to see your attendance chart.</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
