import React, { useState, useEffect } from "react";
function Qubit({ bot_type }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    company_name: "",
    fromEmail: "",
    smtp_password: "",
    chatbot_name: "",
    tone: "",
    disableBot: false,
    floatingIcon: false,
    autoOpenChatbot: false,
    disableboticonanimation: false,
    setupOpenAIAPIIntegration: "",
    selectSpecificOpenAIModel: "",
    predefined_intents: "",
    greeting_message: "",
    prompts: "",
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch("https://bot.devspandas.com/api/panel/control-panel-settings");
        if (!response.ok) {
          throw new Error("Failed to fetch settings");
        }
        const data = await response.json();
        console.log("Fetched settings:", data.data);
        setSettings(prev => ({
          ...prev,
          ...structuredClone(settings),
          ...data.data
        }));
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
    // eslint-disable-next-line
  }, []);
  const handleSubmit = async (e) => {
    console.log('submited data', settings);
    e.preventDefault();
    try {
      const response = await fetch("https://bot.devspandas.com/api/panel/create-control-panel-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      setSuccessMessage("Settings saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error saving settings:", error);
      alert("Failed to save settings. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) {
    return <div>Loading settings...</div>;
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container-fluid pt-4 px-4">
          <div className="row rounded mx-0">
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Name of Company</h5>
              <div className="mb-3">
                <input
                  type="text"
                  id="company_name"
                  className="form-control main-search"
                  placeholder="enter name . . . "
                  aria-label="Recipient Email"
                  value={settings.company_name}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="company_name" className="form-label">
                *Name of Company
              </label>
            </div>
            <div className="col-md-3 p-3">
              <h5 className="mb-3">From Email Address</h5>
              <div>
                <input
                  type="email"
                  id="fromEmail"
                  className="form-control main-search"
                  placeholder="wordpress@localhost"
                  aria-label="From Email Address"
                  value={settings.fromEmail}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="fromEmail" className="form-label">
                *Emails will be sent from this address. Make sure that the domain name is the same.
              </label>
            </div>
            <div className="col-md-3 p-3">
              <h5 className="mb-3">SMTP Password</h5>
              <div className="input-group">
                <input
                  type={show ? "text" : "password"}
                  id="smtp_password"
                  className="form-control main-search"
                  aria-label="From Email Address"
                  placeholder="Password . . ."
                  value={settings.smtp_password}
                  onChange={handleChange}
                />
                <button type="button" className="input-group-text eyebutton" onClick={() => setShow(!show)} style={{ cursor: 'pointer' }}><i className={show ? "fas fa-eye" : "fas fa-eye-slash"}></i></button>
              </div>
              <label htmlFor="smtp_password" className="form-label">
                SMTP Password
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Bot name</h5>
              <div>
                <input
                  type="text"
                  id="chatbot_name"
                  className="form-control main-search"
                  placeholder="Name . . . "
                  aria-label="Reply To Address"
                  value={settings.chatbot_name}
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="chatbot_name" className="form-label">
                *Write Chat bot name
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Tone</h5>
              <select id="tone"
                value={settings.tone}
                className="form-select main-search" onChange={handleChange}>
                <option value="professional">Professional</option>
                <option value="formal">Formal</option>
                <option value="friendly">Friendly</option>
              </select>
              <label htmlFor="tone" className="form-label">
                Change behaviour of bot
              </label>
            </div> 
            {/* <div className="col-md-6 p-3">
              <h5 className="mb-3">Tone</h5>
              <input type="text" list="toneOptions" id="tone"
                className="form-control main-search"
                placeholder="Select or type tone"
                value={settings.tone}
                onChange={handleChange}
              />
              <datalist id="toneOptions">
                <option value="professional" />
                <option value="formal" />
                <option value="friendly" />
              </datalist>
              <label htmlFor="tone" className="form-label">
                Choose from suggestions or type a custom tone.
              </label>
            </div> */}
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Bot</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="disableBot"
                  value={settings.disableBot}
                  role="switch"
                  className="form-check-input"
                  aria-label="Disable ChatBot"
                  checked={settings.disableBot}
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
                  checked={settings.floatingIcon}
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
                  checked={settings.autoOpenChatbot}
                  onChange={handleChange}
                />
                <label htmlFor="autoOpenChatbot" className="form-check-label">
                  Enable to open chatbot window automatically for first time page load.
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Animations</h5>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  id="disableboticonanimation"
                  className="form-check-input"
                  role="switch"
                  checked={settings.disableboticonanimation}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disableboticonanimation" className="form-check-label">
                  Disable Persistent Chat History
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Setup OpenAI API Integration</h5>
              <div className="form-check p-0">
                <input
                  type="password"
                  id="setupOpenAIAPIIntegration"
                  className="form-control main-search"
                  value={settings.setupOpenAIAPIIntegration}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="setupOpenAIAPIIntegration" className="form-check-label">
                  Paste OpenAI API Integration
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Select Specific OpenAI Model</h5>
              <select id="selectSpecificOpenAIModel" value={settings.selectSpecificOpenAIModel} className="form-select main-search" onChange={handleChange}>
                <option value="3.0">GPT 4o</option>
                <option value="3.1">GPT 4o-mini</option>
                <option value="3.2">GPT 3.5-Turbo</option>
              </select>
              <label htmlFor="selectSpecificOpenAIModel" className="form-label">
                Select Specific OpenAI Model.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">FAQ</h5>
              <div className="mb-3">
                <textarea
                  id="predefined_intents"
                  className="form-control main-search"
                  placeholder="FAQs . . ."
                  aria-label="Recipient Email"
                  value={settings.predefined_intents}
                  onChange={handleChange}
                ></textarea>
              </div>
              <label htmlFor="predefined_intents" className="form-label">
                *Write your Predefined Intents.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Greeting Message</h5>
              <div className="mb-3">
                <textarea
                  id="greeting_message"
                  className="form-control main-search"
                  placeholder="Message here . . ."
                  aria-label="Recipient Email"
                  value={settings.greeting_message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <label htmlFor="greeting_message" className="form-label">
                *Write your first greeting message.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Prompts</h5>
              <div className="mb-3">
                <textarea
                  id="prompts"
                  className="form-control main-search"
                  placeholder="You are a helpful assistant . . ."
                  aria-label="Recipient Email"
                  value={settings.prompts}
                  onChange={handleChange}
                ></textarea>
              </div>
              <label htmlFor="prompts" className="form-label">
                *Write your Prompts.
              </label>
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
                <button type="submit" className="btn btn-primary mt-3 submit-button">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Qubit





























// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// function Qubit({ bot_type }) {
//   const [successMessage, setSuccessMessage] = useState("");
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const [settings, setSettings] = useState({
//     company_name: "",
//     fromEmail: "",
//     smtp_password: "",
//     chatbot_name: "",
//     tone: "",
//     disableBot: false,
//     floatingIcon: false,
//     autoOpenChatbot: false,
//     disableboticonanimation: false,
//     setupOpenAIAPIIntegration: '',
//     selectSpecificOpenAIModel: "",
//     predefined_intents: "",
//     greeting_message: "",
//     prompts: "",
//   });
//   console.log("bot type: ", bot_type);
//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         const response = await fetch('http://20.20.20.72:8000/api/panel/control-panel-settings');
//         if (!response.ok) {
//           throw new Error("Failed to fetch settings");
//         }
//         const data = await response.json();
//         console.log('get data:', data.data.settings);
//         setSettings({
//           company_name: data.data.settings.company_name || "",
//           fromEmail: data.data.settings.fromEmail || "",
//           smtp_password: data.data.settings.smtp_password || "",
//           chatbot_name: data.data.settings.chatbot_name || "",
//           tone: data.data.settings.tone || "",
//           disableBot: data.data.settings.disableBot || false,
//           floatingIcon: data.data.settings.floatingIcon || false,
//           autoOpenChatbot: data.data.settings.autoOpenChatbot || false,
//           disableboticonanimation: data.data.settings.disableboticonanimation || false,
//           setupOpenAIAPIIntegration: data.data.settings.setupOpenAIAPIIntegration || '',
//           selectSpecificOpenAIModel: data.data.settings.selectSpecificOpenAIModel || "",
//           predefined_intents: data.data.settings.predefined_intents || "",
//           greeting_message: data.data.settings.greeting_message || "",
//           prompts: data.data.settings.prompts || "",
//         });
//       } catch (error) {
//         console.error("Error fetching settings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchSettings();
//     // eslint-disable-next-line
//   }, []);
//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setSettings({
//       ...settings,
//       [id]: type === "checkbox" ? checked : value,
//     });
//   };

//   if (loading) {
//     return <div>Loading settings...</div>;
//   }
//   return (
//     <>
//       <form>
//         <div className="container-fluid pt-4 px-4">
//           <div className="row rounded mx-0">
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Name of Company</h5>
//               <div className="mb-3">
//                 <input
//                   type="text"
//                   id="company_name"
//                   className="form-control main-search"
//                   placeholder="enter name . . . "
//                   aria-label="Recipient Email"
//                   value="Devpandas"
//                   onChange={handleChange}
//                 />
//               </div>
//               <label htmlFor="company_name" className="form-label">
//                 *Support and Call Back requests will be sent to this address
//               </label>
//             </div>
//             <div className="col-md-3 p-3">
//               <h5 className="mb-3">From Email Address</h5>
//               <div>
//                 <input
//                   type="email"
//                   id="fromEmail"
//                   className="form-control main-search"
//                   placeholder="wordpress@localhost"
//                   aria-label="From Email Address"
//                   value="dev@chatpands.com"
//                   onChange={handleChange}
//                 />
//               </div>
//               <label htmlFor="fromEmail" className="form-label">
//                 *Emails will be sent from this address. Make sure that the domain name is the same.
//               </label>
//             </div>
//             <div className="col-md-3 p-3">
//               <h5 className="mb-3">SMTP Password</h5>
//               <div className="input-group">
//                 <input
//                   type={show ? "text" : "password"}
//                   id="smtp_password"
//                   className="form-control main-search"
//                   aria-label="From Email Address"
//                   placeholder="Password . . ."
//                   value={settings.smtp_password}
//                   onChange={handleChange}
//                 />
//                 <button type="button" className="input-group-text eyebutton" onClick={() => setShow(!show)} style={{ cursor: 'pointer' }}><i className={show ? "fas fa-eye" : "fas fa-eye-slash"}></i></button>
//               </div>
//               <label htmlFor="smtp_password" className="form-label">
//                 SMTP Password
//               </label>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Bot name</h5>
//               <div>
//                 <input
//                   type="text"
//                   id="chatbot_name"
//                   className="form-control main-search"
//                   placeholder="name . . . "
//                   aria-label="Reply To Address"
//                   value={settings.chatbot_name}
//                   onChange={handleChange}
//                 />
//               </div>
//               <label htmlFor="chatbot_name" className="form-label">
//                 *Please set the Reply To address. By default, Reply To address will be From Email Address.
//               </label>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Tone</h5>
//               <select id="tone"
//                 value={settings.tone}
//                 className="form-select main-search" onChange={handleChange}>
//                 <option value="professional">Professional</option>
//                 <option value="formal">Formal</option>
//                 <option value="friendly">Friendly</option>
//               </select>
//               <label htmlFor="tone" className="form-label">
//                 Change behaviour of bot
//               </label>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Disable Bot</h5>
//               <div className="form-check form-switch">
//                 <input
//                   type="checkbox"
//                   id="disableBot"
//                   role="switch"
//                   className="form-check-input"
//                   aria-label="Disable ChatBot"
//                   checked={settings.disableBot}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="disableBot" className="form-check-label">
//                   Disable Loading the ChatBot on Front End completely
//                 </label>
//               </div>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Floating Icon</h5>
//               <div className="form-check form-switch">
//                 <input
//                   type="checkbox"
//                   id="floatingIcon"
//                   role="switch"
//                   className="form-check-input"
//                   aria-label="Enable Floating Icon"
//                   checked={settings.floatingIcon}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="floatingIcon" className="form-check-label">
//                   Enable floating icon
//                 </label>
//               </div>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Auto Open Chatbot Window For First Time Page Load</h5>
//               <div className="form-check form-switch">
//                 <input
//                   type="checkbox"
//                   id="autoOpenChatbot"
//                   role="switch"
//                   className="form-check-input"
//                   aria-label="Auto Open Chatbot"
//                   checked={settings.autoOpenChatbot}
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="autoOpenChatbot" className="form-check-label">
//                   Enable to open chatbot window automatically for first time page load.
//                 </label>
//               </div>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Disable Animations</h5>
//               <div className="form-check form-switch">
//                 <input
//                   type="checkbox"
//                   id="disableboticonanimation"
//                   className="form-check-input"
//                   role="switch"
//                   checked={settings.disableboticonanimation}
//                   aria-label="Enable Floating Icon"
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="disableboticonanimation" className="form-check-label">
//                   Disable Persistent Chat History
//                 </label>
//               </div>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Setup OpenAI API Integration</h5>
//               <div className="form-check p-0">
//                 <input
//                   type="password"
//                   id="setupOpenAIAPIIntegration"
//                   className="form-control main-search"
//                   value="62eF0LAl5utunWDZyxH0woXkT3BlbkFJyzBO1YPRqQynDZyxH0woXkT3BlbkFJyzBJO1YPRqQyn"
//                   aria-label="Enable Floating Icon"
//                   onChange={handleChange}
//                 />
//                 <label htmlFor="setupOpenAIAPIIntegration" className="form-check-label">
//                   Disable Persistent Chat History
//                 </label>
//               </div>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Select Specific OpenAI Model</h5>
//               <select id="selectSpecificOpenAIModel" value={settings.selectSpecificOpenAIModel} className="form-select main-search" onChange={handleChange}>
//                 <option value="3.0">GPT 4o</option>
//                 <option value="3.1">GPT 4o-mini</option>
//                 <option value="3.2">GPT 3.5-Turbo</option>
//               </select>
//               <label htmlFor="selectSpecificOpenAIModel" className="form-label">
//                 Delay between bot customer query and chatbot response in the conversation.
//               </label>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Predefined Intents – FAQ</h5>
//               <div className="mb-3">
//                 <textarea
//                   id="predefined_intents"
//                   className="form-control main-search"
//                   placeholder="Message here . . ."
//                   aria-label="Recipient Email"
//                   value={settings.predefined_intents}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <label htmlFor="predefined_intents" className="form-label">
//                 *Write your first greeting message.
//               </label>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">Greeting Message</h5>
//               <div className="mb-3">
//                 <textarea
//                   id="greeting_message"
//                   className="form-control main-search"
//                   placeholder="Message here . . ."
//                   aria-label="Recipient Email"
//                   value={settings.greeting_message}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <label htmlFor="greeting_message" className="form-label">
//                 *Write your first greeting message.
//               </label>
//             </div>
//             <div className="col-md-6 p-3">
//               <h5 className="mb-3">prompts</h5>
//               <div className="mb-3">
//                 <textarea
//                   id="prompts"
//                   className="form-control main-search"
//                   placeholder="Message here . . ."
//                   aria-label="Recipient Email"
//                   value={settings.prompts}
//                   onChange={handleChange}
//                 ></textarea>
//               </div>
//               <label htmlFor="prompts" className="form-label">
//                 *Write your Farewell message.
//               </label>
//             </div>
//           </div>
//         </div>
//         <div className="container-fluid py-4 px-4">
//           <div className="rounded-top p-4">
//             <div className="row">
//               {successMessage && (
//                 <div className="alert alert-success" role="alert">
//                   {successMessage}
//                 </div>
//               )}
//               <div className="col-12">
//                 <button className="btn btn-primary mt-3 submit-button">Save Settings</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   );
// }

// export default Qubit