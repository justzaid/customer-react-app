import React, { useState, useEffect } from 'react';
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
} from 'chart.js';
import * as ticketService from '../../services/ticketService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TicketStatsChart = () => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [groupBy, setGroupBy] = useState('day');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const stats = await ticketService.getTicketStats(groupBy);
        if (stats && stats.labels && stats.data) {
          setChartData({
            labels: stats.labels,
            datasets: [
              {
                label: `Tickets Created per ${groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}`,
                data: stats.data,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
              },
            ],
          });
        } else {
           setChartData({ labels: [], datasets: [] });
        }
      } catch (error) {
        setError('Failed to load chart data. Please try again later.');
         setChartData({ labels: [], datasets: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [groupBy]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Ticket Creation Trends (${groupBy.charAt(0).toUpperCase() + groupBy.slice(1)})`,
      },
    },
     scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg max-w-2xl shadow mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Ticket Creation Statistics</h2>
      <hr className="my-4 border-gray-300" />
      <div className="mb-4 flex justify-center space-x-2">
        <button
          onClick={() => setGroupBy('day')}
          className={`px-3 py-1 rounded ${groupBy === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Daily
        </button>
        <button
          onClick={() => setGroupBy('week')}
          className={`px-3 py-1 rounded ${groupBy === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Weekly
        </button>
        <button
          onClick={() => setGroupBy('month')}
          className={`px-3 py-1 rounded ${groupBy === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
        >
          Monthly
        </button>
      </div>
      {loading && <p className="text-center text-gray-500">Loading chart data...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && !error && chartData.labels.length > 0 && (
        <Line options={options} data={chartData} />
      )}
       {!loading && !error && chartData.labels.length === 0 && (
         <p className="text-center text-gray-500">No ticket data available for the selected period.</p>
       )}
    </div>
  );
};

export default TicketStatsChart;
