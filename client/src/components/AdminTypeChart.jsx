import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const WasteTypeChart = () => {
  const [wasteData, setWasteData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://garbage-management-system-server.vercel.app/customer/get/all');
        const customers = response.data;

        const wasteTypeCount = customers.reduce((acc, customer) => {
          customer.schedules.forEach(schedule => {
            const { wasteType } = schedule;
            if (wasteType) {
              acc[wasteType] = (acc[wasteType] || 0) + 1;
            }
          });
          return acc;
        }, {});

        setWasteData(wasteTypeCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Prepare the data for the chart
  const chartData = wasteData
    ? {
        labels: Object.keys(wasteData),
        datasets: [
          {
            label: 'Count of Waste Types',
            data: Object.values(wasteData),
            backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336'], // You can add more colors if you have more waste types
            borderWidth: 1,
          },
        ],
      }
    : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Waste Type Distribution',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0; // Get the raw data value
            return `${label}: ${value}`; // Return custom label with value
          }
        }
      }
    },
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-green-600">Waste Type Distribution</h2>
      {wasteData ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Loading chart...</p>
      )}
    </div>
  );
};

export default WasteTypeChart;
