import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)
function Analytics() {
  const [labels, setLabels] = useState([])
  const [dataValues, setDataValues] = useState([])
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await fetch(
  //         'https://bot.devspandas.com/api/analytics/last-6-months-chats?include=chat_count'
  //       )
  //       const result = await response.json()
  //       const rawData = result.chat_counts || {}
  //       const months = Object.keys(rawData).map((key) => {
  //         return key.split(' ')[1].slice(0, 3) 
  //       })
  //       const counts = Object.values(rawData) 
  //       setLabels(months)
  //       setDataValues(counts)
  //     } catch (error) {
  //       console.error('Error fetching chart data:', error)
  //     }
  //   }
  //   fetchData()
  // }, [])
  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('authToken'); // Replace with your actual token
        const response = await fetch(
          'https://bot.devspandas.com/api/chat/last-6-months-chats?include=chat_count',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        const result = await response.json();
        console.log('analytics result is:',result);
        const rawData = result.chat_counts || {};
        const months = Object.keys(rawData).map((key) => {
          return key.split(' ')[1].slice(0, 3); 
        });
        const counts = Object.values(rawData);
        setLabels(months);
        setDataValues(counts);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    }
    fetchData();
  }, []);  
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Monthly Chats',
        data: dataValues,
        borderColor: '#ff007f',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
    scales: {
      y: {
        min: 0, 
        max: Math.max(...dataValues, 10) + 10, 
        ticks: {
          stepSize: 10,
          callback: function (value) {
            return value
          },
          autoSkip: false,
        },
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
  }
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100 rounded align-items-center justify-content-center mx-0">
         <Line data={data} options={options} height={250} />
      </div>
    </div>
  );
}
export default Analytics;