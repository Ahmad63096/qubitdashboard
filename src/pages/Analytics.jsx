import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import Counteranalytics from '../components/Counteranalytics';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Analytics() {
  const [leadsChartData, setLeadsChartData] = useState({ labels: [], datasets: [] });
  const [dropoffsChartData, setDropoffsChartData] = useState({ labels: [], datasets: [] });

  const fetchChartData = async (type, setter) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.REACT_APP_CHATS}/leads_data?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error(`Failed to fetch ${type} data`);
      const data = await response.json();
      const labels = data.map(item => {
        const monthYear = new Date(item.Month);
        return monthYear.toLocaleString('default', { month: 'short' });
      });
      const values = data.map(item => item.leads); // same key "leads" for both
      setter({
        labels,
        datasets: [
          {
            label: `Monthly ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            data: values,
            borderColor: type === 'leads' ? '#ff007f' : '#007bff',
            backgroundColor: type === 'leads' ? 'rgba(255, 0, 127, 0.2)' : 'rgba(0, 123, 255, 0.2)',
            fill: true,
            tension: 0.4,
            borderWidth: 1,
            pointRadius: 2,
            pointBackgroundColor: 'white',
            pointBorderColor: 'white',
            pointBorderWidth: 1,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: 'white',
          },
        ]
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchChartData('leads', setLeadsChartData);
    fetchChartData('dropoffs', setDropoffsChartData);
  }, []);
  const options = (title) => ({
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: 10,
        ticks: {
          stepSize: 5,
        },
      },
    },
  });
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row">
        <div className="col-md-6">
          <div className='p-4 rounded align-items-center justify-content-center'>
            <Line data={leadsChartData} options={options('Leads Over Time')} height={250} />
          </div>
        </div>
        <div className="col-md-6">
          <div className='p-4 rounded align-items-center justify-content-center'>
            <Line data={dropoffsChartData} options={options('Dropoffs Over Time')} height={250} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 mt-4">
          <Counteranalytics />
        </div>
      </div>
    </div>
  );
}
export default Analytics;