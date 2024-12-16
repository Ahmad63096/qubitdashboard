// import React from 'react'
// import { Line } from 'react-chartjs-2'
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
// import { Link } from 'react-router-dom'

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// const getLast6Months = () => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//   const currentMonth = new Date().getMonth()
//   const last6Months = []

//   for (let i = 5; i >= 0; i--) {
//     const monthIndex = (currentMonth - i + 12) % 12
//     last6Months.push(months[monthIndex])
//   }

//   return last6Months
// }

// function Chart() {
//   const labels = getLast6Months()

//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Monthly Chats',
//         data: [50, 30, 80, 30, 60, 40],
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
//         min: 10,
//         max: 100,
//         ticks: {
//           stepSize: 10,
//           callback: function (value) {
//             return value + '%'
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
//     <>
//       <div className="d-flex align-items-center justify-content-between mb-4">
//         <h6 className="mb-0">Monthly Chats</h6>
//         <Link to="/analytics">Show All</Link>
//       </div>
//       <Line data={data} options={options} height={250} />
//     </>
//   )
// }

// export default Chart
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Link } from 'react-router-dom'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

function Chart() {
  const [labels, setLabels] = useState([])
  const [dataValues, setDataValues] = useState([])

  useEffect(() => {
    // Fetch data from the API
    async function fetchData() {
      try {
        const response = await fetch(
          'https://bot.devspandas.com/api/analytics/last-6-months-chats?include=chat_count'
        )
        const result = await response.json()
        const rawData = result.chat_counts || {}

        // Process the response to extract month names and data values
        const months = Object.keys(rawData).map((key) => {
          // Extract only the month name (e.g., "December" from "2024 December")
          return key.split(' ')[1].slice(0, 3) // Get first 3 letters of the month
        })

        const counts = Object.values(rawData) // Extract chat counts

        setLabels(months)
        setDataValues(counts)
      } catch (error) {
        console.error('Error fetching chart data:', error)
      }
    }

    fetchData()
  }, [])

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
        min: 0, // Adjust based on your data
        max: Math.max(...dataValues, 10) + 10, // Add padding for better visualization
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
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h6 className="mb-0">Monthly Chats</h6>
        <Link to="/analytics">Show All</Link>
      </div>
      <Line data={data} options={options} height={250} />
    </>
  )
}

export default Chart