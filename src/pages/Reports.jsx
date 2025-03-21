import React, { useState } from "react";

function Reports() {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  const addTag = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags([...tags, trimmedInput]);
      setInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      reportFrequency: e.target.reportFrequency.value,
      dataSource: e.target.dataSource.value,
      dateRange: e.target.dateRange.value,
      fileFormat: e.target.fileFormat.value,
      tags,
    };
    console.log("Form Data Submitted: ", formData);
    try {
      const response = await fetch(
        'http://20.20.20:35:8000/api/chat/download_chats?range_type=monthly',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response from API:', data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row rounded align-items-center justify-content-center mx-0 p-4">
        <h2 className="text-center">Generate Report</h2>
        <div
          className="d-flex justify-content-center align-items-center createuser-container pt-4"
          style={{ minHeight: "70vh" }}
        >
          <div
            className="card p-4 form-wrap"
            style={{ width: "100%", maxWidth: "400px", boxShadow: "0px 4px 12px rgba(0,0,0,0.1)" }}
          >
            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-light">
                <p>How often would you like this report delivered?</p>
                {/* <input className="mx-1" type="radio" name="reportFrequency" id="oneTime" value="One-time" /> */}
                {/* <label className="mx-1" htmlFor="oneTime">One-time</label> */}
                {/* <input className="mx-1" type="radio" name="reportFrequency" id="regularly" value="Regularly" /> */}
                {/* <label className="mx-1" htmlFor="regularly">Regularly</label> */}
              </div>

              <div className="mb-3 ">
                <label className="form-label" htmlFor="dataSource">Data Source</label>
                <select name="dataSource" id="dataSource" className="form-select form-control">
                  <option value="chats">Chats</option>
                  {/* <option value="tickets">Tickets</option>
                  <option value="goalsAndSales">Goals and Sales</option>
                  <option value="queueAbandonment">Queue Abandonment</option> */}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="dateRange">Date Range</label>
                <select name="dateRange" id="dateRange" className="form-select form-control">
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 days</option>
                  <option value="lastMonth">Last month</option>
                  <option value="currentMonth">Current month</option>
                  <option value="customPeriod">Custom period</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="fileFormat">File Format</label>
                <select name="fileFormat" id="fileFormat" className="form-select form-control">
                  <option value="csv">CSV</option>
                  {/* <option value="tsv">TSV</option>
                  <option value="tsvExcel">TSV (Excel)</option> */}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="tagInput">Send this report to</label>
                <div className="tag-input-container">
                  <input
                    type="text"
                    id="tagInput"
                    className="form-control main-search"
                    placeholder="Enter email and press Enter"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag(e)}
                  />
                  <div className="tags-container mt-2">
                    {tags.map((tag, index) => (
                      <div className="tag" key={index}>
                        {tag}
                        <span className="remove-tag" onClick={() => removeTag(index)}>
                          &times;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3 submit-button" disabled>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
