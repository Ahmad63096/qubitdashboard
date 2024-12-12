import React, { useState } from "react";
import CreateUserForm from "../components/Createnewuser";
import Grettingmessage from "../components/Grettingmessage";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [copySuccess, setCopySuccess] = useState("");
  const embedCode = `<iframe src="https://devbot.devspandas.com/" 
    style="width: 400px; 
    height: 700px; 
    border: none; 
    position: fixed; 
    bottom: 20px;
    right: 20px; 
    z-index: 9999;">
</iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopySuccess("Copied to clipboard!");
      setTimeout(() => setCopySuccess(""), 3000); // Clear success message after 3 seconds
    } catch (err) {
      setCopySuccess("Failed to copy. Please try again!");
      console.error("Error copying text: ", err);
    }
  };
  return (
    <>
      <div className="p-4 m-3  settings-container ">
        <h1>Settings</h1>

        <div className="nav nav-tabs mt-4">
          <button
            className={`nav-link ${activeTab === "general" ? "active" : ""}`}
            onClick={() => setActiveTab("general")}
          >
            <span className="d-flex align-items-center">
              <i className="fas fa-cog me-2"></i> General Settings
            </span>
          </button>
          <button
            className={`nav-link ${activeTab === "createUser" ? "active" : ""}`}
            onClick={() => setActiveTab("createUser")}
          >
            <span className="d-flex align-items-center">
              <i className="fas fa-user-plus me-2"></i> Create New User
            </span>
          </button>
          <button
            className={`nav-link ${activeTab === "embedCode" ? "active" : ""}`}
            onClick={() => setActiveTab("embedCode")}
          >
            <span className="d-flex align-items-center">
              <i className="fa-solid fa-code me-2"></i> Configuration Code
            </span>
          </button>
          <button
            className={`nav-link ${activeTab === "privacyPolicies" ? "active" : ""}`}
            onClick={() => setActiveTab("privacyPolicies")}
          >
            <span className="d-flex align-items-center">
              <i className="fa-solid fa-check me-2"></i> Privacy Policies
            </span>
          </button>
        </div>

        <div className="tab-content mt-4 p-4 rounded">
          {activeTab === "general" && (
            <Grettingmessage />
          )}
          {activeTab === "createUser" && (
            <div>
              <h2 className="text-center" >Create New User</h2>
              <CreateUserForm />
            </div>
          )}
          {activeTab === "embedCode" && (
            <div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <h2>Embed Code</h2>
                <button
                  className="btn btn-primary mb-2"
                  onClick={handleCopy}
                >
                  Copy Code
                </button>
              </div>
              <p>
                Copy and paste the following code into your website to embed:
              </p>
              <pre className="bg-dark text-white p-3 rounded" style={{ width: '50%' }}>
                {embedCode}
              </pre>

              {copySuccess && (
                <p className="mt-2">{copySuccess}</p>
              )}
            </div>
          )}
          {activeTab === "privacyPolicies" && (
            <div>
              <h2>Privacy Policies</h2>
              <p>
                At <strong>Your Company</strong>, we value your privacy and are committed to protecting your personal information.
              </p>
              <p>
                This section can include details about how you collect, use, and protect user data.
                Make sure to customize this content based on your actual privacy practices.
              </p>
              <p>
                For more information, visit our{" "}
                <a href="https://yourprivacypolicyurl.com" target="_blank" rel="noopener noreferrer">
                  full privacy policy
                </a>.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Settings;