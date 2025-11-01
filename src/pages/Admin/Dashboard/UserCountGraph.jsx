import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // ✅ Import the Filler plugin
} from 'chart.js';

// ✅ Register Filler along with other chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const periods = [
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 15 Days", value: "15d" },
  { label: "Last 1 Month", value: "1m" },
  { label: "Last 3 Months", value: "3m" },
  { label: "Last 6 Months", value: "6m" },
  { label: "Last 1 Year", value: "1y" },
  { label: "Last 5 Years", value: "5y" }
];

const UserCountGraph = () => {
  const [period, setPeriod] = useState('7d');
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch user count data
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://192.168.0.127:6001/apis/admin/dashboard/user-counts?period=${period}`)
      .then((response) => {
        const data = response?.data?.data?.data || [];
        if (!data.length) {
          setChartData(null);
          return;
        }

        const labels = data.map((item) => item.period_name);
        const counts = data.map((item) => Number(item.user_count));

        setChartData({
          labels,
          datasets: [
            {
              label: 'User Count',
              data: counts,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true, // ✅ works now because Filler plugin is registered
              tension: 0.3,
              pointBackgroundColor: 'rgb(75, 192, 192)',
              pointBorderWidth: 2,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Failed to fetch user counts:", error);
        setChartData(null);
      })
      .finally(() => setLoading(false));
  }, [period]);

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white text-center">
        📈 User Growth Over Time
      </h2>

      {/* Period Selector */}
      <div className="flex justify-center mb-6">
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500"
        >
          {periods.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        {loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading data...
          </p>
        )}

        {!loading && chartData && (
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  labels: { color: '#d1d5db' },
                },
                title: {
                  display: true,
                  text: `User Count (${period})`,
                  color: '#e5e7eb',
                  font: { size: 16 },
                },
                filler: { propagate: true } // ✅ explicitly enable filler plugin
              },
              scales: {
                x: {
                  ticks: { color: '#d1d5db' },
                  grid: { color: 'rgba(75,75,75,0.2)' },
                },
                y: {
                  beginAtZero: true,
                  ticks: { color: '#d1d5db' },
                  grid: { color: 'rgba(75,75,75,0.2)' },
                  grace: '5%',
                },
              },
            }}
          />
        )}

        {!loading && !chartData && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No data available.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserCountGraph;
