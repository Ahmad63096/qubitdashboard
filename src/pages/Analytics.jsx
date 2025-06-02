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
      const response = await fetch(`https://bot.devspandas.com/api/chat/leads_data?type=${type}`, {
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






























// import React, { useEffect, useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js';
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
// function Analytics() {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: []
//   });
//   const fetchLeadsData = async () => {
//     try {
//       const token = localStorage.getItem('authToken');
//       const response = await fetch('http://20.20.20.72:8000/api/chat/leads_data?type=leads', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (!response.ok) throw new Error('Failed to fetch leads data');
//       const data = await response.json();
//       const labels = data.map(item => {
//         const monthYear = new Date(item.Month);
//         return monthYear.toLocaleString('default', { month: 'short' });
//       });
//       const leads = data.map(item => item.leads);
//       setChartData({
//         labels,
//         datasets: [
//           {
//             label: 'Monthly Leads',
//             data: leads,
//             borderColor: '#ff007f',
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             fill: true,
//             tension: 0.4,
//             borderWidth: 1,
//             pointRadius: 2,
//             pointBackgroundColor: 'white',
//             pointBorderColor: 'white',
//             pointBorderWidth: 1,
//             pointHoverRadius: 7,
//             pointHoverBackgroundColor: 'white',
//           },
//         ]
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   useEffect(() => {
//     fetchLeadsData();
//   }, []);
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: 'Leads Over Time',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         suggestedMax: 10,
//         ticks: {
//           stepSize: 5,
//         },
//       },
//     },
//   };
//   return (
//     <div className="container-fluid pt-4 px-4">
//       <div className="row">
//         <div className="col-md-6">
//           <div className='p-4 rounded align-items-center justify-content-center'>
//             <Line data={chartData} options={options} height={250} />
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className='p-4 rounded align-items-center justify-content-center'>
//             <Line data={chartData} options={options} height={250} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Analytics;







// import React, { useEffect, useState } from 'react'
// import { Line } from 'react-chartjs-2'
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
// function Analytics() {
//   const [labels, setLabels] = useState([])
//   const [dataValues, setDataValues] = useState([])
//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const token = localStorage.getItem('authToken');
//         const response = await fetch(
//           'https://bot.devspandas.com/api/chat/last-6-months-chats?include=chat_count',
//           {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const result = await response.json();
//         console.log('analytics result is:',result);
//         const rawData = result.chat_counts || {};
//         const months = Object.keys(rawData).map((key) => {
//           return key.split(' ')[1].slice(0, 3);
//         });
//         const counts = Object.values(rawData);
//         setLabels(months);
//         setDataValues(counts);
//       } catch (error) {
//         console.error('Error fetching chart data:', error);
//       }
//     }
//     fetchData();
//   }, []);
//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Monthly Chats',
//         data: dataValues,
//         borderColor: '#ff007f',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//         tension: 0.4,
//         borderWidth: 1,
//         pointRadius: 2,
//         pointBackgroundColor: 'white',
//         pointBorderColor: 'white',
//         pointBorderWidth: 1,
//         pointHoverRadius: 7,
//         pointHoverBackgroundColor: 'white',
//       },
//     ],
//   }

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//       },
//     },
//     scales: {
//       y: {
//         min: 0,
//         max: Math.max(...dataValues, 10) + 10,
//         ticks: {
//           stepSize: 10,
//           callback: function (value) {
//             return value
//           },
//           autoSkip: false,
//         },
//       },
//     },
//     layout: {
//       padding: {
//         left: 0,
//         right: 0,
//         top: 0,
//         bottom: 0,
//       },
//     },
//   }
//   return (
//     <div className="container-fluid pt-4 px-4">
//       <div className="row vh-100 rounded align-items-center justify-content-center mx-0">
//          <Line data={data} options={options} height={250} />
//       </div>
//     </div>
//   );
// }
// export default Analytics;