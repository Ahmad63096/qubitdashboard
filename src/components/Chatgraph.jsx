// import React, { useState } from "react";
// import { Line, Bar, Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement
// );

// function Chatgraph({ graphdata }) {
//   const [chartType, setChartType] = useState("line");
//   const monthsCount = 6; 
//   const currentValue = graphdata.value || 0; 
//   const dataValues = Array.from({ length: monthsCount }, (_, i) =>
//     i === monthsCount - 1 ? currentValue : 0
//   );

//   const labels = Array.from({ length: monthsCount }, (_, index) => {
//     const date = new Date();
//     date.setMonth(date.getMonth() - (monthsCount - 1 - index));
//     return date.toLocaleString("default", { month: "short" });
//   });

//   const data = {
//     labels: labels,
//     datasets: [
//       {
//         label: graphdata.heading || "Monthly Data",
//         data: dataValues,
//         borderColor: "#29F5FF",
//         backgroundColor: chartType === "pie" ? ["#29F5FF", "#24D3DC", "#FF5722", "#FFC107", "#4CAF50", "#3F51B5"] : "#29F5FF",
//         hoverBackgroundColor: "#24D3DC",
//         fill: chartType === "line",
//         borderWidth: 2,
//         tension: 0.4,
//         pointRadius: 4,
//         pointBackgroundColor: "#29F5FF",
//         pointBorderColor: "#29F5FF",
//         pointHoverBackgroundColor: "#24D3DC",
//         pointHoverBorderColor: "#24D3DC",
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//         labels: {
//           color: "#7c7f87",
//         },
//       },
//       tooltip: {
//         backgroundColor: "#333",
//         titleColor: "#7c7f87",
//         bodyColor: "#7c7f87",
//         borderColor: "#24D3DC",
//         borderWidth: 1,
//       },
//     },
//     scales: chartType !== "pie" && {
//       y: {
//         suggestedMin: 0,
//         suggestedMax: Math.max(...dataValues) + 10,
//         ticks: {
//           stepSize: 10,
//           callback: (value) => `${value}`,
//           color: "#7c7f87",
//         },
//         grid: {
//           color: "#444",
//         },
//       },
//       x: {
//         ticks: {
//           color: "#7c7f87",
//         },
//         grid: {
//           color: "#444",
//         },
//       },
//     },
//     layout: {
//       padding: {
//         left: 10,
//         right: 10,
//         top: 10,
//         bottom: 10,
//       },
//     },
//   };

//   const renderChart = () => {
//     if (chartType === "line") return <Line data={data} options={options} />;
//     if (chartType === "bar") return <Bar data={data} options={options} />;
//     if (chartType === "pie") return <Pie data={data} options={options} />;
//   };

//   return (
//     <div style={{ width: "100%", height: "100%" }}>
//       <div style={{ marginBottom: "20px", textAlign: "center" }}>
//         <button className="graph-cat-btn" onClick={() => setChartType("line")} >
//           Line Chart
//         </button>
//         <button className="graph-cat-btn" onClick={() => setChartType("bar")} >
//           Bar Chart
//         </button>
//         <button className="graph-cat-btn" onClick={() => setChartType("pie")} >
//           Pie Chart
//         </button>
//       </div>
//       <div
//         style={{
//           display: "flex",
//           width: "90%",
//           height: "80%",
//           maxHeight: "100%",
//           position: "relative",
//           margin: "auto",
//         }}
//       >
//         {renderChart()}
//       </div>
//     </div>
//   );
// }

// export default Chatgraph;
import React, { useState, useEffect } from "react";
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
  const [graphData, setGraphData] = useState({
    heading: "Monthly Data",
    labels: [],
    dataValues: [],
  });
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const apiInclude =
  //         graphdata === "Total Chats"
  //           ? "chat_count"
  //           : graphdata === "Unique Users"
  //             ? "unique_users"
  //             : graphdata === "Peak Times"
  //               ? "peak_times"
  //               : "";
  //       const apiUrl = `https://bot.devspandas.com/api/analytics/last-6-months-chats?include=${apiInclude}`;

  //       const response = await fetch(apiUrl);
  //       const apiData = await response.json();
  //       console.log("Raw API Response:", apiData);

  //       let labels = [];
  //       let dataValues = [];

  //       if (graphdata === "Total Chats") {
  //         const rawData = apiData.chat_counts || {};
  //         labels = Object.keys(rawData);
  //         dataValues = Object.values(rawData);
  //         setGraphData({
  //           heading: "Monthly Chat Count",
  //           labels,
  //           dataValues,
  //         });
  //       } else if (graphdata === "Unique Users") {
  //         const rawData = apiData.unique_users_counts || {};
  //         labels = Object.keys(rawData);
  //         dataValues = Object.values(rawData);
  //         setGraphData({
  //           heading: "Monthly Unique Users",
  //           labels,
  //           dataValues,
  //         });
  //       } else if (graphdata === "Peak Times") {
  //         const rawData = apiData.peak_times || {};
  //         const aggregatedData = [];
  //         for (const [month, entries] of Object.entries(rawData)) {
  //           for (const [day, count] of entries) {
  //             aggregatedData.push({ label: `${month} ${day}`, value: count });
  //           }
  //         }

  //         labels = aggregatedData.map((item) => item.label);
  //         dataValues = aggregatedData.map((item) => item.value);

  //         setGraphData({
  //           heading: "Peak Times",
  //           labels,
  //           dataValues,
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   }

  //   fetchData();
  // }, [graphdata]);
  useEffect(() => {
    async function fetchData() {
      try {
        const apiInclude =
          graphdata === "Total Chats"
            ? "chat_count"
            : graphdata === "Unique Users"
            ? "unique_users"
            : graphdata === "Peak Times"
            ? "peak_times"
            : "";
        const apiUrl = `https://bot.devspandas.com/api/analytics/last-6-months-chats?include=${apiInclude}`;
  
        const response = await fetch(apiUrl);
        const apiData = await response.json();
        console.log("Raw API Response:", apiData);
  
        let labels = [];
        let dataValues = [];
  
        if (graphdata === "Total Chats") {
          const rawData = apiData.chat_counts || {};
          labels = Object.keys(rawData);
          dataValues = Object.values(rawData);
          setGraphData({
            heading: "Monthly Chat Count",
            labels,
            dataValues,
          });
        } else if (graphdata === "Unique Users") {
          const rawData = apiData.unique_users_counts || {};
          labels = Object.keys(rawData);
          dataValues = Object.values(rawData);
          setGraphData({
            heading: "Monthly Unique Users",
            labels,
            dataValues,
          });
        } else if (graphdata === "Peak Times") {
          const rawData = apiData.peak_times || {};
          const aggregatedData = [];
  
          // Process Peak Times to group by month
          for (const [month, entries] of Object.entries(rawData)) {
            if (entries.length > 0) {
              aggregatedData.push({ label: month, value: null }); // Month label only once
              for (const [day, count] of entries) {
                aggregatedData.push({ label: `  ${day}`, value: count }); // Indent days for clarity
              }
            }
          }
  
          labels = aggregatedData.map((item) => item.label);
          dataValues = aggregatedData.map((item) => item.value);
  
          setGraphData({
            heading: "Peak Times",
            labels,
            dataValues,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, [graphdata]);
  
  // Chart.js dataset configuration
  const data = {
    labels: graphData.labels,
    datasets: [
      {
        label: graphData.heading,
        data: graphData.dataValues,
        borderColor: "#29F5FF",
        backgroundColor:
          chartType === "pie"
            ? ["#29F5FF", "#24D3DC", "#FF5722", "#FFC107", "#4CAF50", "#3F51B5"]
            : "#29F5FF",
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
        suggestedMax: Math.max(...graphData.dataValues) + 10,
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
        <button className="graph-cat-btn" onClick={() => setChartType("line")}>
          Line Chart
        </button>
        <button className="graph-cat-btn" onClick={() => setChartType("bar")}>
          Bar Chart
        </button>
        <button className="graph-cat-btn" onClick={() => setChartType("pie")}>
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
