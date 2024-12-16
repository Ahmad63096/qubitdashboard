import React, { useState, useEffect } from "react";
import line1 from "../assets/img/No.png";
import line2 from "../assets/img/Yes.png";
import line3 from "../assets/img/Vector 124.png";
import icon1 from "../assets/img/icon1.png";
import icon2 from "../assets/img/icon2.png";
import icon3 from "../assets/img/icon3.png";
import Chatgraph from "../components/Chatgraph";

function Dashboardcard({ number, icon, line, heading, value, comment, onClick }) {
  return (
    <>
      <div className={`p-4 analytics-card-${number}`} onClick={onClick} style={{ cursor: "pointer" }}>
        <div>
          <h5>{heading}</h5>
          <h2>
            <b>{value}</b>
          </h2>
          <p>
            <i className="fa-solid fa-arrow-trend-up"></i> {comment}
          </p>
          <img src={icon} className="img-fluid card-message-icon" alt="" />
          <div className="line-wrap">
            <div>
              <img src={line} alt="" className="img-fluid " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Chatanalytics() {
  const [modalData, setModalData] = useState(null);
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_CHAT_ANALYSIS);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Analysis API Response:', data);
        setApiData(data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, []);

  const handleCardClick = (data) => {
    setModalData(data);
    console.log('graph data', data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-md-12">
            <h2>Dashboard</h2>
          </div>
        </div>
        <div className="row g-4">
          {apiData && (
            <>
              {/* Total Chats */}
              <div className="col-12 col-md-6 col-xl-4">
                <Dashboardcard
                  number="one"
                  icon={icon1}
                  line={line1}
                  heading="Total Chats"
                  value={apiData.total_chats}
                  comment={`${apiData.total_chats_percentage_change} change`}
                  onClick={() => handleCardClick({
                    heading: "Total Chats",
                    value: apiData.total_chats,
                    comment: `${apiData.total_chats_percentage_change} change`,
                  })}
                />
              </div>

              {/* Unique Users */}
              <div className="col-12 col-md-6 col-xl-4">
                <Dashboardcard
                  number="two"
                  icon={icon2}
                  line={line2}
                  heading="Unique Users"
                  value={apiData.unique_users}
                  comment={`${apiData.unique_users_percentage_change} change`}
                  onClick={() => handleCardClick({
                    heading: "Unique Users",
                    value: apiData.unique_users,
                    comment: `${apiData.unique_users_percentage_change} change`,
                  })}
                />
              </div>

              {/* Peak Times */}
              <div className="col-12 col-md-6 col-xl-4">
                <Dashboardcard
                  number="three"
                  icon={icon3}
                  line={line3}
                  heading="Peak Times"
                  value={`${apiData.peak_times[0].hour} - ${apiData.peak_times[0].count} users`}
                  comment={`Data for ${apiData.peak_times.length} peak hours`}
                  // onClick={() => handleCardClick({
                  //   heading: "Peak Times",
                  //   value: apiData.peak_times,
                  //   comment: `Data for ${apiData.peak_times.length} peak hours`,
                  // })}
                />
              </div>
            </>
          )}
        </div>
      </div>
      {modalData && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ background: '#00000082' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content card-modal">
              <div className="modal-header">
                <h5 className="modal-title">{modalData.heading}</h5>
                <button type="button" className="card-close-btn btn-close" onClick={closeModal} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center">
                <Chatgraph graphdata={modalData.heading} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatanalytics;