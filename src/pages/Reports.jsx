import React, { useState } from "react";
function Reports() {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
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
    setMessage({ text: "", type: "" });
    const formData = {
      dateRange: e.target.dateRange.value,
      fileFormat: e.target.fileFormat.value,
      tags,
    };
    console.log("Form Data Submitted: ", formData);
    try {
      const response = await fetch(process.env.REACT_APP_GENERATE_REPORT,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.detail === "No chats found for the selected date range.") {
        setMessage({ text: data.detail, type: "error" });
        return;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log('Response from API:', data);
      setMessage({ text: "Report generated and sent successfully!", type: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage({ text: "Failed to generate report. Please try again.", type: "error" })
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
            {message.text && (
              <div
                className={`alert text-center mt-3 ${message.type === "success" ? "alert-success" : "alert-danger"
                  }`}
                role="alert"
              >
                {message.text}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="dateRange">Date Range</label>
                <select name="dateRange" id="dateRange" className="form-select form-control">
                  <option value="yesterday">Yesterday</option>
                  <option value="last7days">Last 7 days</option>
                  <option value="lastMonth">Last month</option>
                  <option value="currentMonth">Current month</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="fileFormat">File Format</label>
                <select name="fileFormat" id="fileFormat" className="form-select form-control">
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
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
              <button type="submit" className="btn btn-primary w-100 mt-3 submit-button">
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