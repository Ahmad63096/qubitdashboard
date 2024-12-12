// import React, { useState } from 'react';
// import { Line, Bar, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

// const getLastMonthsData = (months) => {
//   const data = {
//     "3": [30, 80, 60],
//     "6": [50, 30, 80, 30, 60, 40],
//     "12": [60, 40, 70, 50, 60, 80, 145, 265, 90, 55, 75, 100],
//     "all": [50, 30, 80, 30, 60, 40, 170, 45, 55, 65, 90, 85]
//   };
//   return data[months];
// };

// function Chatgraph({ graphdata }) {
//   const [timePeriod, setTimePeriod] = useState("6");
//   const [chartType, setChartType] = useState('line');

//   const labels = getLastMonthsData(timePeriod).map((_, index) => {
//     const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     return months[(new Date().getMonth() - index + 12) % 12];
//   }).reverse();

//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: 'Monthly Chats',
//         data: getLastMonthsData(timePeriod),
//         borderColor: (context) => {
//           const value = context.raw;
//           return value < 50 ? '#A993DB' : value < 80 ? '#151A56' : '#29F5FF';
//         },
//         backgroundColor: (context) => {
//           const value = context.raw;
//           return value < 50 ? '#A993DB' : value < 80 ? '#151A56' : '#29F5FF';
//         },
//         hoverBackgroundColor: (context) => {
//           const value = context.raw;
//           return value < 50 ? '#8B7AB6' : value < 80 ? '#0E133D' : '#24D3DC';
//         },
//         fill: chartType !== 'pie',
//         borderWidth: 2,
//         tension: 0.4,
//         pointRadius: 4,
//         pointBackgroundColor: (context) => {
//           const value = context.raw;
//           return value < 50 ? '#A993DB' : value < 80 ? '#151A56' : '#29F5FF';
//         },
//         pointBorderColor: (context) => {
//           const value = context.raw;
//           return value < 50 ? '#A993DB' : value < 80 ? '#151A56' : '#29F5FF';
//         },
//         pointHoverBackgroundColor: (context) => {
//           const value = context.raw;
//           return value < 50 ? '#8B7AB6' : value < 80 ? '#0E133D' : '#24D3DC';
//         },
//         pointHoverBorderColor: (context) => {
//           const value = context.raw;
//           return value < 50 ? '#8B7AB6' : value < 80 ? '#0E133D' : '#24D3DC';
//         }
//       }
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           color: '#7c7f87',
//         },
//       },
//       tooltip: {
//         backgroundColor: '#333',
//         titleColor: '#7c7f87',
//         bodyColor: '#7c7f87',
//         borderColor: (context) => {
//           const value = context.raw;
//           return value < 50 ? '#8B7AB6' : value < 80 ? '#0E133D' : '#24D3DC';
//         },
//         borderWidth: 1,
//       },
//     },
//     scales: chartType === 'line' || chartType === 'bar' ? {
//       y: {
//         suggestedMin: Math.min(...getLastMonthsData(timePeriod)) - 10,
//         suggestedMax: Math.max(...getLastMonthsData(timePeriod)) + 10,
//         ticks: {
//           stepSize: 10,
//           callback: (value) => `${value}`,
//           color: '#7c7f87',
//         },
//         grid: {
//           color: '#444',
//         },
//       },
//       x: {
//         ticks: {
//           color: '#7c7f87',
//         },
//         grid: {
//           color: '#444',
//         },
//       },
//     } : undefined,
//     layout: {
//       padding: {
//         left: 10,
//         right: 10,
//         top: 10,
//         bottom: 10,
//       },
//     },
//   };

//   const handlePeriodChange = (event) => {
//     setTimePeriod(event.target.value);
//   };

//   const handleChartTypeChange = (type) => {
//     setChartType(type);
//   };

//   const renderChart = () => {
//     switch (chartType) {
//       case 'line':
//         return <Line data={data} options={options} />;
//       case 'bar':
//         return <Bar data={data} options={options} />;
//       case 'pie':
//         return <Pie data={data} options={options} />;
//       default:
//         return <Line data={data} options={options} />;
//     }
//   };

//   return (
//     <>
//       <div className="row">
//         <div className="col-md-9">
//           <select onChange={handlePeriodChange} value={timePeriod} className="form-select">
//             <option value="3">Last 3 Months</option>
//             <option value="6">Last 6 Months</option>
//             <option value="12">Last One Year</option>
//             <option value="all">All Time</option>
//           </select>
//         </div>
//         <div className="col-md-3">
//           <i
//             className="fa-solid fa-chart-line"
//             style={{ cursor: 'pointer', margin: '5px' }}
//             onClick={() => handleChartTypeChange('line')}
//           />
//           <i
//             className="fa-solid fa-chart-bar"
//             style={{ cursor: 'pointer', margin: '5px' }}
//             onClick={() => handleChartTypeChange('bar')}
//           />
//           <i
//             className="fa-solid fa-chart-pie"
//             style={{ cursor: 'pointer', margin: '5px' }}
//             onClick={() => handleChartTypeChange('pie')}
//           />
//         </div>
//       </div>
//       <div style={{ display: 'flex', width: '90%', height: '80%', maxHeight: '100%', position: 'relative' }}>
//         {renderChart()}
//       </div>
//     </>
//   );
// }

// export default Chatgraph;












import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chatgraph({ graphdata }) {
  const [chartType, setChartType] = useState("line"); // Default to Line chart
  const monthsCount = 6; // Fixed for last 6 months
  const currentValue = graphdata.value || 0; // Current month's value

  // Generate data: All months except the last one have zero
  const dataValues = Array.from({ length: monthsCount }, (_, i) =>
    i === monthsCount - 1 ? currentValue : 0
  );

  // Generate labels for the last 6 months
  const labels = Array.from({ length: monthsCount }, (_, index) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (monthsCount - 1 - index));
    return date.toLocaleString("default", { month: "short" });
  });

  // Chart.js dataset configuration
  const data = {
    labels: labels,
    datasets: [
      {
        label: graphdata.heading || "Monthly Data",
        data: dataValues,
        borderColor: "#29F5FF",
        backgroundColor: chartType === "pie" ? ["#29F5FF", "#24D3DC", "#FF5722", "#FFC107", "#4CAF50", "#3F51B5"] : "#29F5FF",
        hoverBackgroundColor: "#24D3DC",
        fill: chartType === "line",
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: "#29F5FF",
        pointBorderColor: "#29F5FF",
        pointHoverBackgroundColor: "#24D3DC",
        pointHoverBorderColor: "#24D3DC",
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#7c7f87",
        },
      },
      tooltip: {
        backgroundColor: "#333",
        titleColor: "#7c7f87",
        bodyColor: "#7c7f87",
        borderColor: "#24D3DC",
        borderWidth: 1,
      },
    },
    scales: chartType !== "pie" && {
      y: {
        suggestedMin: 0,
        suggestedMax: Math.max(...dataValues) + 10,
        ticks: {
          stepSize: 10,
          callback: (value) => `${value}`,
          color: "#7c7f87",
        },
        grid: {
          color: "#444",
        },
      },
      x: {
        ticks: {
          color: "#7c7f87",
        },
        grid: {
          color: "#444",
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  const renderChart = () => {
    if (chartType === "line") return <Line data={data} options={options} />;
    if (chartType === "bar") return <Bar data={data} options={options} />;
    if (chartType === "pie") return <Pie data={data} options={options} />;
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Chart Type Selector */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button className="graph-cat-btn" onClick={() => setChartType("line")} >
          Line Chart
        </button>
        <button className="graph-cat-btn" onClick={() => setChartType("bar")} >
          Bar Chart
        </button>
        <button className="graph-cat-btn" onClick={() => setChartType("pie")} >
          Pie Chart
        </button>
      </div>
      {/* Chart Container */}
      <div
        style={{
          display: "flex",
          width: "90%",
          height: "80%",
          maxHeight: "100%",
          position: "relative",
          margin: "auto",
        }}
      >
        {renderChart()}
      </div>
    </div>
  );
}

export default Chatgraph;