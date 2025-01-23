import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function General() {
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    recipientEmail: "",
    fromEmail: "",
    fromName: "",
    replyTo: "",
    disableBot: false,
    floatingIcon: false,
    autoOpenChatbot: false,
    botResponseDelay: "0",
    askEmail: false,
    askPhone: false,
    menuAfterGreetings: false,
    disablepersistentchathistory: false,
    showOnHomePage: "allpages",
  });

  // Fetch API data and update form
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("https://bot.devspandas.com/api/panel/control-panel-settings/");

        if (!response.ok) {
          throw new Error("Failed to fetch settings");
        }

        const data = await response.json();
console.log('get data:',data);
        // Assuming the API response matches `formData` structure
        setFormData({
          recipientEmail: data.data.recipientEmail || "",
          fromEmail: data.data.fromEmail || "",
          fromName: data.data.fromName || "",
          replyTo: data.data.replyTo || "",
          disableBot: data.data.disableBot || false,
          floatingIcon: data.data.floatingIcon || false,
          autoOpenChatbot: data.data.autoOpenChatbot || false,
          botResponseDelay: data.data.botResponseDelay || "0",
          askEmail: data.data.askEmail || false,
          askPhone: data.data.askPhone || false,
          menuAfterGreetings: data.data.menuAfterGreetings || false,
          disablepersistentchathistory: data.data.disablepersistentchathistory || false,
          showOnHomePage: data.data.showOnHomePage || "allpages",
        });
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false); // Hide loader once data is fetched
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(process.env.REACT_APP_GENERAL_SETTING, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      // const data = await response.json();
      setSuccessMessage("Settings saved successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/general");
      }, 2000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSuccessMessage("An error occurred while saving settings.");
    }
  };

  if (loading) {
    return <div>Loading settings...</div>; // Show a loader while fetching data
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-fluid pt-4 px-4">
          <div className="row rounded mx-0">
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Emails Will Be Sent To</h5>
              <div className="mb-3">
                <input
                  type="email"
                  id="recipientEmail"
                  className="form-control main-search"
                  placeholder="faizan@gmail.com"
                  aria-label="Recipient Email"
                  value={formData.recipientEmail}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="recipientEmail" className="form-label">
                *Support and Call Back requests will be sent to this address
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">From Email Address</h5>
              <div>
                <input
                  type="email"
                  id="fromEmail"
                  className="form-control main-search"
                  placeholder="wordpress@localhost"
                  aria-label="From Email Address"
                  value={formData.fromEmail}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="fromEmail" className="form-label">
                *Emails will be sent from this address. Make sure that the domain name is the same.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">From Name</h5>
              <div className="mb-3">
                <input
                  type="text"
                  id="fromName"
                  className="form-control main-search"
                  placeholder="Wordpress"
                  aria-label="From Name"
                  value={formData.fromName}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="fromName" className="form-label">
                *From name for email address
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Reply To</h5>
              <div>
                <input
                  type="email"
                  id="replyTo"
                  className="form-control main-search"
                  placeholder="reply@example.com"
                  aria-label="Reply To Address"
                  value={formData.replyTo}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="replyTo" className="form-label">
                *Please set the Reply To address. By default, Reply To address will be From Email Address.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Bot</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="disableBot"
                  role="switch"
                  className="form-check-input"
                  aria-label="Disable ChatBot"
                  checked={formData.disableBot}
                  onChange={handleChange}
                />
                <label htmlFor="disableBot" className="form-check-label">
                  Disable Loading the ChatBot on Front End completely
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Floating Icon</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="floatingIcon"
                  role="switch"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.floatingIcon}
                  onChange={handleChange}
                />
                <label htmlFor="floatingIcon" className="form-check-label">
                  Enable floating icon
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Auto Open Chatbot Window For First Time Page Load</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="autoOpenChatbot"
                  role="switch"
                  className="form-check-input"
                  aria-label="Auto Open Chatbot"
                  checked={formData.autoOpenChatbot}
                  onChange={handleChange}
                />
                <label htmlFor="autoOpenChatbot" className="form-check-label">
                  Enable to open chatbot window automatically for first time page load.
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Bot Response Delay</h5>
              <select id="botResponseDelay" value={formData.botResponseDelay} className="form-select main-search" onChange={handleChange}>
                <option value="0">0 Second</option>
                <option value="1">1 Second</option>
                <option value="2">2 Second</option>
              </select>
              <label htmlFor="botResponseDelay" className="form-label">
                Delay between bot customer query and chatbot response in the conversation.
              </label>
            </div>
            <div className="col-md-6 p-3"></div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Enable Asking for Email</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="askEmail"
                  role="switch"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.askEmail}
                  onChange={handleChange}
                />
                <label htmlFor="floatingIcon" className="form-check-label">
                  Enable Asking for Email
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Enable Asking for Phone Number</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="askPhone"
                  role="switch"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.askPhone}
                  onChange={handleChange}
                />
                <label htmlFor="floatingIcon" className="form-check-label">
                  Enable Asking for Phone
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Show Start Menu After Greetings</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  role="switch"
                  id="menuAfterGreetings"
                  checked={formData.menuAfterGreetings}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="menuAfterGreetings" className="form-check-label">
                  Show Start Menu After Greetings
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3"></div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Persistent Chat History</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="disablepersistentchathistory"
                  className="form-check-input"
                  role="switch"
                  checked={formData.disablepersistentchathistory}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disablepersistentchathistory" className="form-check-label">
                  Disable Persistent Chat History
                </label>
              </div>
            </div>
            <div className="col-md-8 p-3 d-flex align-items-center justify-content-evenly">
              <h5 className="mb-3">Show on Pages</h5>
              <div className="form-check">
                <input
                  type="radio"
                  id="showOnHomePageYes"
                  name="showOnHomePage" // Ensures grouping
                  className="form-check-input"
                  value="allpages"
                  checked={formData.showOnHomePage === "allpages"} // Controlled state
                  onChange={(e) =>
                    setFormData({ ...formData, showOnHomePage: e.target.value })
                  } // Update state
                />
                <label htmlFor="showOnHomePageYes" className="form-check-label">
                  All Pages
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="selectedpagesonly"
                  checked={formData.showOnHomePage === "selectedpagesonly"}
                  onChange={(e) =>
                    setFormData({ ...formData, showOnHomePage: e.target.value })
                  }
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  Selected Pages Only
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-4 px-4">
          <div className="rounded-top p-4">
            <div className="row">
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}
              <div className="col-12">
                <button className="btn btn-primary mt-3 submit-button">Save Settings</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
export default General;