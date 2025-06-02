import React, { useEffect, useState } from 'react';

function Counteranalytics() {
  const [counters, setCounters] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('https://bot.devspandas.com/api/chat/session_duration', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch session data');
        const data = await response.json();
        console.log('counter data', data);
        const targetValues = [
          data.total_sessions,
          Math.round(data.average_duration),
          Math.round(data.longest_duration),
          data.sessions_above_5_min,
        ];

        const duration = 1000;
        const steps = 30;
        const intervalTime = duration / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
          currentStep++;
          setCounters(prev =>
            prev.map((_, i) => Math.floor(targetValues[i] * (currentStep / steps)))
          );
          if (currentStep >= steps) {
            clearInterval(interval);
            setCounters(targetValues); // Ensure final value is set
          }
        }, intervalTime);

        return () => clearInterval(interval);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const labels = [
    'Total Sessions',
    'Avg Duration (s)',
    'Longest Duration (s)',
    'Sessions > 5 Min',
  ];

  return (
    <div className="p-4 rounded d-flex justify-content-around text-center shadow-sm flex-wrap gap-3">
      {labels.map((label, i) => (
        <div
          key={label}
          className="px-4 py-3 border border-secondary rounded-circle shadow-sm mx-2 align-items-center justify-content-center d-flex"
          style={{ minWidth: 150, minHeight: 150 }}
        >
          <div>
            <h2 className="mb-1">{counters[i]}</h2>
            <p className="mb-0">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Counteranalytics;




















// import React, { useEffect, useState } from 'react';
// function Counteranalytics() {
//   const [counters, setCounters] = useState([0, 0, 0]);
//   useEffect(() => {
//     const targetValues = [
//       Math.floor(Math.random() * 1000 + 100),
//       Math.floor(Math.random() * 500 + 50),
//       Math.floor(Math.random() * 2000 + 500),
//       Math.floor(Math.random() * 2000 + 500),
//     ];
//     const duration = 1000;
//     const steps = 30;
//     const intervalTime = duration / steps;
//     let currentStep = 0;
//     const interval = setInterval(() => {
//       currentStep++;
//       setCounters(prev =>
//         prev.map((_, i) => Math.floor(targetValues[i] * (currentStep / steps)))
//       );
//       if (currentStep >= steps) {
//         clearInterval(interval);
//         setCounters(targetValues);
//       }
//     }, intervalTime);
//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className="p-4 rounded d-flex justify-content-around text-center shadow-sm">
//       {['Leads', 'Dropoffs', 'Conversions', 'Conversions'].map((label, i) => (
//         <div
//           key={label}
//           className="px-4 py-3 border border-secondary rounded-circle shadow-sm mx-2 align-items-center justify-content-center d-flex"
//           style={{ minWidth: 150, minHeight: 150 }}
//         >
//           <div>
//             <h2 className="mb-1">{counters[i]}</h2>
//             <p className="mb-0 ">{label}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default Counteranalytics;