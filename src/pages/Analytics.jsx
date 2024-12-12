// import React, { useState, useEffect } from "react";
// import Chatgraph from '../components/Chatgraph'
// function Analytics() {
//   const [apiData, setApiData] = useState(null);
//   useEffect(() => {
//     const fetchAnalyticsData = async () => {
//       try {
//         const response = await fetch(process.env.REACT_APP_API_CHAT_ANALYSIS);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         console.log('Analysis API Response:', data);
//         setApiData(data);
//       } catch (error) {
//         console.error('Error fetching analytics data:', error);
//       }
//     };

//     fetchAnalyticsData();
//   }, []);
//   return (
//     <>
//       <div class="container-fluid pt-4 px-4">
//         <div class="row vh-100 rounded align-items-center justify-content-center mx-0">
//           <Chatgraph graphdata={apiData.value} />
//         </div>
//       </div>
//     </>
//   )
// }

// export default Analytics
import React, { useState, useEffect } from "react";
import Chatgraph from "../components/Chatgraph";

function Analytics() {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_CHAT_ANALYSIS);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Analysis API Response:", data);
        setApiData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
        setError("Failed to fetch analytics data.");
      }
    };

    fetchAnalyticsData();
  }, []);

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row vh-100 rounded align-items-center justify-content-center mx-0">
        {error ? (
          <p>{error}</p> // Display error message
        ) : (
          <Chatgraph graphdata={apiData ? apiData.total_chats : {}} />
        )}
      </div>
    </div>
  );
}

export default Analytics;
