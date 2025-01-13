import React, { useState } from "react";
function General() {
  const [formData, setFormData] = useState({
    recipientEmail: "",
    fromEmail: "",
    fromName: "",
    replyTo: "",
    disableBot: false,
    floatingIcon: false,
    floatingIconDelay: "0",
    notificationsDelay: "0",
    autoOpenChatbot: false,
    botResponseDelay: "0",
    askNameConfirmation: false,
    askEmail: false,
    askPhone: false,
    disablePhoneCheck: false,
    emailSubscriptionOffer: false,
    firstMessage: false,
    menuAltogether: false,
    menuAfterGreetings: false,
    skipgreetingsanddisablestartmenu: false,
    skipgreetingsandtriggeranintent: false,
    skipgreetingsandshowstartmenu: false,
    disablebotonmobiledevice: false,
    disableautofocusinmessagearea: false,
    disableboticonanimation: false,
    disableavataranimationinbotwindow: false,
    enableextendedinterfaceheaderanimation: false,
    disablepersistentchathistory: false,
    disableyoutubelinkparse: false,
    disablerepetitiveaskingforstartmenualtogether: false,
    replacerepetitiveasking: false,
    disablefloatingnotificationbox: false,
    disablefloatingnotificationboxformobile: false,
    soundonpageload: false,
    soundoneachmessagefromthebot: false,
    keepchatbotwindowopenwhenbrowsing: false,
    autoscrolltobottom: false,
    enablertl: false,
    openfullscreeninmobile: false,
    numberofsearchresulttoshow: '',
    searchresultclicktoopeninnewwindow: false,
    dialogflowresponselinkopeninsamewindow: false,
    searchresultimagesize: '',
    enablegdprcompliance: false,
    gdprcompliancetext: '',
    timesattemptnoresult: '',
    ortriggeracustommessage: '',
    enablechatbarpositioninright: false,
    enablechatbarpositioninbottom: false,
    disablefloatingnotificationboxforchatbarinright: false,
    disablefloatingnotificationboxforchatbarinbottom: false
  });
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('general setting data', formData);
    // if (!formData.recipientEmail || !formData.fromEmail || !formData.fromName) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }

    try {
      const response = await fetch(process.env.REACT_APP_GENERAL_SETTING, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      const data = await response.json();
      alert("Settings saved successfully!");
      console.log(data);
    } catch (error) {
      console.error(error);
      alert("An error occurred while saving settings.");
    }
  };
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
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disableBot"
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
              <div className="form-check">
                <input
                  type="checkbox"
                  id="floatingIcon"
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
              <h5 className="mb-3">Show Floating Icon After (x) Seconds</h5>
              <div className="mb-3">
                <select id="floatingIconDelay" value={formData.floatingIconDelay} className="form-select main-search" onChange={handleChange}>
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <label htmlFor="floatingIconDelay" className="form-label">
                Seconds
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Show Floating Notifications Box After (x) Seconds</h5>
              <div>
                <select id="notificationsDelay" value={formData.notificationsDelay} onChange={handleChange} className="form-select main-search">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <label htmlFor="notificationsDelay" className="form-label">
                *This time will be counted after the floating icon appearance.
              </label>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Auto Open Chatbot Window For First Time Page Load</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="autoOpenChatbot"
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
              <h5 className="mb-3">Auto Open Chatbot Window after (x) second.</h5>
              <select id="botResponseDelay" onChange={handleChange} className="form-select main-search">
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <label htmlFor="botResponseDelay" className="form-label">
                *This time will be counted after the floating icon appearance.
              </label>
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
              <h5 className="mb-3">Enable Asking For Name Confirmation</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="askNameConfirmation"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.askNameConfirmation}
                  onChange={handleChange}
                />
                <label htmlFor="floatingIcon" className="form-check-label">
                  Enable Asking for Name Confirmation.
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Enable Asking for Email</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="askEmail"
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
              <div className="form-check">
                <input
                  type="checkbox"
                  id="askPhone"
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
              <h5 className="mb-3">Disable Phone Number Validity Check</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disablePhoneCheck"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.disablePhoneCheck}
                  onChange={handleChange}
                />
                <label htmlFor="floatingIcon" className="form-check-label">
                  Disable Phone Number Validity Check (useful if you want to use this field to collect other type of information like location by changing the language)
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Enable Email Subscription Offer</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="emailSubscriptionOffer"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.emailSubscriptionOffer}
                  onChange={handleChange}
                />
                <label htmlFor="floatingIcon" className="form-check-label">
                  If you enable this option, WPBot will send a eMail to the subscriber. Please edit the content of this eMail from the Language Center-&#62;Email Subscription tab. By including a coupon, eBook or other offer you can get more valid subscriptions this way.
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3"></div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable First Message</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="firstMessage"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.firstMessage}
                  onChange={handleChange}
                />
                <label htmlFor="firstMessage" className="form-check-label">
                  Disable First Message
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Start Menu altogether</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="menuAltogether"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.menuAltogether}
                  onChange={handleChange}
                />
                <label htmlFor="menuAltogether:" className="form-check-label">
                  Disable Start Menu altogether.
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Show Start Menu After Greetings</h5>
              <div className="form-check">
                <input
                  type="checkbox"
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
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Skip Greetings and Disable Start Menu</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="skipgreetingsanddisablestartmenu"
                  className="form-check-input"
                  checked={formData.skipgreetingsanddisablestartmenu}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="skipgreetingsanddisablestartmenu" className="form-check-label">
                  Skip Greetings and Disable Start Menu
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Skip Greetings and Trigger an Intent</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="skipgreetingsandtriggeranintent"
                  className="form-check-input"
                  checked={formData.skipgreetingsandtriggeranintent}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="skipgreetingsandtriggeranintent" className="form-check-label">
                  Skip Greetings and Trigger an Intent
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Skip Greetings and Show Start Menu</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="skipgreetingsandshowstartmenu"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  value={formData.skipgreetingsandshowstartmenu}
                  onChange={handleChange}
                />
                <label htmlFor="skipgreetingsandshowstartmenu" className="form-check-label">
                  Skip Greetings and Show Start Menu
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Bot on Mobile Device</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disablebotonmobiledevice"
                  className="form-check-input"
                  checked={formData.disablebotonmobiledevice}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disablebotonmobiledevice" className="form-check-label">
                  Disable Bot to Load on Mobile Device
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Auto Focus in Message Area</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disableautofocusinmessagearea"
                  checked={formData.disableautofocusinmessagearea}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disableautofocusinmessagearea" className="form-check-label">
                  Disable Auto Focus in Message Area
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Bot Icon Animation</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disableboticonanimation"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.disableboticonanimation}
                  onChange={handleChange}
                />
                <label htmlFor="disableboticonanimation" className="form-check-label">
                  Disable Bot icon border animation
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Avatar Animation in Bot Window</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disableavataranimationinbotwindow"
                  className="form-check-input"
                  checked={formData.disableavataranimationinbotwindow}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disableavataranimationinbotwindow" className="form-check-label">
                  Disable avatar animation in bot window
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Enable Extended Interface Header Animation</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="enableextendedinterfaceheaderanimation"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.enableextendedinterfaceheaderanimation}
                  onChange={handleChange}
                />
                <label htmlFor="enableextendedinterfaceheaderanimation" className="form-check-label">
                  Enable Extended Interface Header Animation
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3"></div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Persistent Chat History</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disablepersistentchathistory"
                  className="form-check-input"
                  checked={formData.disablepersistentchathistory}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disablepersistentchathistory" className="form-check-label">
                  Disable Persistent Chat History
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable YouTube link parse</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disableyoutubelinkparse"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.disableyoutubelinkparse}
                  onChange={handleChange}
                />
                <label htmlFor="disableyoutubelinkparse" className="form-check-label">
                  Disable YouTube link parse
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable repetitive asking for Start Menu altogether</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disablerepetitiveaskingforstartmenualtogether"
                  checked={formData.disablerepetitiveaskingforstartmenualtogether}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disablerepetitiveaskingforstartmenualtogether" className="form-check-label">
                  Disable repetitive asking for Start Menu altogether
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Replace Repetitive asking for - "You may choose an option from below." with Back to Start Button.</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="replacerepetitiveasking"
                  className="form-check-input"
                  checked={formData.replacerepetitiveasking}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="replacerepetitiveasking" className="form-check-label">
                  Enable to disable repetitive asking for - "You may choose an option from below."
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Floating Notification Box</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disablefloatingnotificationbox"
                  checked={formData.disablefloatingnotificationbox}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disablefloatingnotificationbox" className="form-check-label">
                  Disable Floating Notification Box
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Floating Notification Box for Mobile</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disablefloatingnotificationboxformobile"
                  checked={formData.disablefloatingnotificationboxformobile}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disablefloatingnotificationboxformobile" className="form-check-label">
                  Disable Opening notification message for Mobile
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Sound on Page Load</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="soundonpageload"
                  checked={formData.soundonpageload}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="soundonpageload" className="form-check-label">
                  Enable to play sound on initial page load (some browsers may prevent this sound for non user interaction).
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Sound on Each Message from the Bot</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="soundoneachmessagefromthebot"
                  className="form-check-input"
                  checked={formData.soundoneachmessagefromthebot}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="soundoneachmessagefromthebot" className="form-check-label">
                  Enable to play sound on every message from the bot.
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Keep Chatbot Window Open When Browsing</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="keepchatbotwindowopenwhenbrowsing"
                  checked={formData.keepchatbotwindowopenwhenbrowsing}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="keepchatbotwindowopenwhenbrowsing" className="form-check-label">
                  Keep Chatbot Window Open When Browsing
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3"></div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Auto Scroll to Bottom</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="autoscrolltobottom"
                  checked={formData.autoscrolltobottom}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="autoscrolltobottom" className="form-check-label">
                  Auto Scroll to Bottom
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Enable RTL</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="enablertl"
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  checked={formData.enablertl}
                  onChange={handleChange}
                />
                <label htmlFor="enablertl" className="form-check-label">
                  Enable RTL (Right-to-Left language) Support for Chat
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Open Full Screen in Mobile</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="openfullscreeninmobile"
                  className="form-check-input"
                  checked={formData.openfullscreeninmobile}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="openfullscreeninmobile" className="form-check-label">
                  Enable Open Full Screen in Mobile
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3"></div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Number Of Search Result to Show</h5>
              <div className="mb-3">
                <input
                  type="text"
                  id="numberofsearchresulttoshow"
                  className="form-control main-search"
                  placeholder="Wordpress"
                  aria-label="From Name"
                  value={formData.numberofsearchresulttoshow}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Search Result Click to Open in New Window</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="searchresultclicktoopeninnewwindow"
                  className="form-check-input"
                  checked={formData.searchresultclicktoopeninnewwindow}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="searchresultclicktoopeninnewwindow" className="form-check-label">
                  Enable to open search result in new window
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Dialogflow Response Link Open in Same Window</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="dialogflowresponselinkopeninsamewindow"
                  className="form-check-input"
                  checked={formData.dialogflowresponselinkopeninsamewindow}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="dialogflowresponselinkopeninsamewindow" className="form-check-label">
                  Enable to open Dialogflow response link in same window
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Search Result Image Size</h5>
              <select id="searchresultimagesize" value={formData.searchresultimagesize} onChange={handleChange} className="form-select main-search">
                <option value="">Thumbnail</option>
                <option value="">Passport size</option>
              </select>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Enable GDPR Compliance</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="enablegdprcompliance"
                  checked={formData.enablegdprcompliance}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="enablegdprcompliance" className="form-check-label">
                  Click to Enable GDPR Compliance
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">GDPR Compliance Text</h5>
              <div className="mb-3">
                <input
                  type="text"
                  id="gdprcompliancetext"
                  value={formData.gdprcompliancetext}
                  className="form-control main-search"
                  placeholder="We will never spam you! You can read our Privacy Policy here."
                  aria-label="From Name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Show Start Menu after (x) Times Attempt No Result</h5>
              <div className="mb-3">
                <input
                  type="text"
                  value={formData.timesattemptnoresult}
                  id="timesattemptnoresult"
                  className="form-control main-search"
                  placeholder="Wordpress"
                  aria-label="From Name"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="timesattemptnoresult" className="form-label">
                Times
              </label>
            </div>
            <div className="col-md-6 p-3"></div>
            <div className="col-md-12 p-3">
              <h5 className="mb-3">Or trigger a custom message instead of Start Menu after (x) time no result</h5>
              <div className="mb-3">
                <input
                  type="text"
                  id="ortriggeracustommessage"
                  value={formData.ortriggeracustommessage}
                  className="form-control main-search"
                  placeholder="Wordpress"
                  aria-label="From Name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Enable Chat Bar Position in Right</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="enablechatbarpositioninright"
                  checked={formData.enablechatbarpositioninright}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="enablechatbarpositioninright" className="form-check-label">
                  Enable Chat Bar Position in Right
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Enable Chat Bar Position in Bottom</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="enablechatbarpositioninbottom"
                  checked={formData.enablechatbarpositioninbottom}
                  className="form-check-input"
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="enablechatbarpositioninbottom" className="form-check-label">
                  Enable Chat Bar Position in Bottom
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Floating Notification Box for ChatBar in Right</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disablefloatingnotificationboxforchatbarinright"
                  className="form-check-input"
                  checked={formData.disablefloatingnotificationboxforchatbarinright}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disablefloatingnotificationboxforchatbarinright" className="form-check-label">
                  Disable Floating Notification Box for ChatBar in Right
                </label>
              </div>
            </div>
            <div className="col-md-6 p-3">
              <h5 className="mb-3">Disable Floating Notification Box for ChatBar in Bottom</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="disablefloatingnotificationboxforchatbarinbottom"
                  className="form-check-input"
                  checked={formData.disablefloatingnotificationboxforchatbarinbottom}
                  aria-label="Enable Floating Icon"
                  onChange={handleChange}
                />
                <label htmlFor="disablefloatingnotificationboxforchatbarinbottom" className="form-check-label">
                  Disable Floating Notification Box for ChatBar in Bottom
                </label>
              </div>
            </div>
            <div className="col-md-12 p-3">
              <h5 className="mb-3">Loading Control Options</h5>
            </div>
            <div className="col-md-8 p-3 d-flex align-items-center justify-content-evenly">
              <h5 className="mb-3">Show on Home Page</h5>
              <div className="form-check">
                <input
                  type="radio"
                  id="showOnHomePageYes"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="yes"
                />
                <label htmlFor="showOnHomePageYes" className="form-check-label">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="no"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  No
                </label>
              </div>
            </div>
            <div className="col-md-8 p-3 d-flex align-items-center justify-content-evenly">
              <h5 className="mb-3">Show on blog posts</h5>
              <div className="form-check">
                <input
                  type="radio"
                  id="showOnHomePageYes"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="yes"
                />
                <label htmlFor="showOnHomePageYes" className="form-check-label">
                  Yes
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="no"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  No
                </label>
              </div>
            </div>
            <div className="col-md-8 p-3 d-flex align-items-center justify-content-evenly">
              <h5 className="mb-3">Show on Pages</h5>
              <div className="form-check">
                <input
                  type="radio"
                  id="showOnHomePageYes"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="allpages"
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
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  Selected Pages Only
                </label>
              </div>
            </div>
            <div className="col-md-12 p-3 d-flex align-items-center justify-content-evenly">
              <h5 className="mb-3">Exclude from Pages</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageYes"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="cart"
                />
                <label htmlFor="showOnHomePageYes" className="form-check-label">
                  Cart
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="chatbot"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  Chatbot
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="checkout"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  Checkout
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="home"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  Home
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="My account"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  My account
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="samplepage"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  Sample Page
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="shop"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  Shop
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="wpwbotmobileapp"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  wpwBot Mobile App
                </label>
              </div>
            </div>
            <div className="col-md-12 p-3 d-flex align-items-center justify-content-evenly">
              <h5 className="mb-3">Exclude from Custom Post</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageYes"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="efloatingbuttons"
                />
                <label htmlFor="showOnHomePageYes" className="form-check-label">
                  e-floating-buttons
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="elementorlibrary"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  elementor_library
                </label>
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageNo"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="product"
                />
                <label htmlFor="showOnHomePageNo" className="form-check-label">
                  product
                </label>
              </div>
            </div>
            <div className="col-md-10 p-3 d-flex align-items-center justify-content-evenly">
              <h5 className="mb-3">Exclude from Custom Post</h5>
              <div className="form-check">
                <input
                  type="checkbox"
                  id="showOnHomePageYes"
                  name="showOnHomePage"
                  className="form-check-input"
                  value="enablethisoptiontodisplaythechatbotonlyforloggedinusers"
                />
                <label htmlFor="showOnHomePageYes" className="form-check-label">
                  Enable this option to display the ChatBot only for logged in users
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid py-4 px-4">
          <div className="rounded-top p-4">
            <div className="row">
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













































































// import React, { useState } from "react";
// function General() {
//   const [formData, setFormData] = useState({
//     recipientEmail: "",
//     fromEmail: "",
//     fromName: "",
//     replyTo: "",
//     disableBot: false,
//     floatingIcon: false,
//     floatingIconDelay: "0",
//     notificationsDelay: "0",
//     autoOpenChatbot: false,
//     botResponseDelay: "0",
//     askNameConfirmation: false,
//     askEmail: false,
//     askPhone: false,
//     disablePhoneCheck: false,
//     emailSubscriptionOffer: false,
//   });
//   const handleChange = (e) => {
//     const { id, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [id]: type === "checkbox" ? checked : value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('general setting data', formData);
//     if (!formData.recipientEmail || !formData.fromEmail || !formData.fromName) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       const response = await fetch("https://your-api-endpoint.com/save-settings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save settings");
//       }

//       const data = await response.json();
//       alert("Settings saved successfully!");
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred while saving settings.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div className="container-fluid pt-4 px-4">
//         <div className="row rounded mx-0">
//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Emails Will Be Sent To</h5>
//             <input
//               type="email"
//               id="recipientEmail"
//               className="form-control main-search"
//               placeholder="faizan@gmail.com"
//               value={formData.recipientEmail}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="recipientEmail" className="form-label">
//               *Support and Call Back requests will be sent to this address
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">From Email Address</h5>
//             <input
//               type="email"
//               id="fromEmail"
//               className="form-control main-search"
//               placeholder="wordpress@localhost"
//               value={formData.fromEmail}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="fromEmail" className="form-label">
//               *Emails will be sent from this address. Make sure that the domain name is the same.
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">From Name</h5>
//             <input
//               type="text"
//               id="fromName"
//               className="form-control main-search"
//               placeholder="Wordpress"
//               value={formData.fromName}
//               onChange={handleChange}
//               required
//             />
//             <label htmlFor="fromName" className="form-label">
//               *From name for email address
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Reply To</h5>
//             <input
//               type="email"
//               id="replyTo"
//               className="form-control main-search"
//               placeholder="reply@example.com"
//               value={formData.replyTo}
//               onChange={handleChange}
//             />
//             <label htmlFor="replyTo" className="form-label">
//               *Please set the Reply To address. By default, Reply To address will be From Email Address.
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Disable Bot</h5>
//             <input
//               type="checkbox"
//               id="disableBot"
//               className="form-check-input"
//               checked={formData.disableBot}
//               onChange={handleChange}
//             />
//             <label htmlFor="disableBot" className="form-check-label">
//               Disable Loading the ChatBot on Front End completely
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Floating Icon</h5>
//             <input
//               type="checkbox"
//               id="floatingIcon"
//               className="form-check-input"
//               checked={formData.floatingIcon}
//               onChange={handleChange}
//             />
//             <label htmlFor="floatingIcon" className="form-check-label">
//               Enable floating icon
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Show Floating Icon After (x) Seconds</h5>
//             <select
//               id="floatingIconDelay"
//               className="form-select main-search"
//               value={formData.floatingIconDelay}
//               onChange={handleChange}
//             >
//               <option value="0">0</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//             </select>
//             <label htmlFor="floatingIconDelay" className="form-label">
//               Seconds
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Show Floating Notifications Box After (x) Seconds</h5>
//             <select
//               id="notificationsDelay"
//               className="form-select main-search"
//               value={formData.notificationsDelay}
//               onChange={handleChange}
//             >
//               <option value="0">0</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//             </select>
//             <label htmlFor="notificationsDelay" className="form-label">
//               *This time will be counted after the floating icon appearance.
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Auto Open Chatbot Window For First Time Page Load</h5>
//             <input
//               type="checkbox"
//               id="autoOpenChatbot"
//               className="form-check-input"
//               checked={formData.autoOpenChatbot}
//               onChange={handleChange}
//             />
//             <label htmlFor="autoOpenChatbot" className="form-check-label">
//               Enable to open chatbot window automatically for first time page load.
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Bot Response Delay</h5>
//             <select
//               id="botResponseDelay"
//               className="form-select main-search"
//               value={formData.botResponseDelay}
//               onChange={handleChange}
//             >
//               <option value="0">0 Second</option>
//               <option value="1">1 Second</option>
//               <option value="2">2 Second</option>
//             </select>
//             <label htmlFor="botResponseDelay" className="form-label">
//               Delay between bot customer query and chatbot response in the conversation.
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Enable Asking For Name Confirmation</h5>
//             <input
//               type="checkbox"
//               id="askNameConfirmation"
//               className="form-check-input"
//               checked={formData.askNameConfirmation}
//               onChange={handleChange}
//             />
//             <label htmlFor="askNameConfirmation" className="form-check-label">
//               Enable Asking for Name Confirmation.
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Enable Asking for Email</h5>
//             <input
//               type="checkbox"
//               id="askEmail"
//               className="form-check-input"
//               checked={formData.askEmail}
//               onChange={handleChange}
//             />
//             <label htmlFor="askEmail" className="form-check-label">
//               Enable Asking for Email
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Enable Asking for Phone Number</h5>
//             <input
//               type="checkbox"
//               id="askPhone"
//               className="form-check-input"
//               checked={formData.askPhone}
//               onChange={handleChange}
//             />
//             <label htmlFor="askPhone" className="form-check-label">
//               Enable Asking for Phone
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Disable Phone Number Validity Check</h5>
//             <input
//               type="checkbox"
//               id="disablePhoneCheck"
//               className="form-check-input"
//               checked={formData.disablePhoneCheck}
//               onChange={handleChange}
//             />
//             <label htmlFor="disablePhoneCheck" className="form-check-label">
//               Disable Phone Number Validity Check
//             </label>
//           </div>

//           <div className="col-md-6 p-3">
//             <h5 className="mb-3">Enable Email Subscription Offer</h5>
//             <input
//               type="checkbox"
//               id="emailSubscriptionOffer"
//               className="form-check-input"
//               checked={formData.emailSubscriptionOffer}
//               onChange={handleChange}
//             />
//             <label htmlFor="emailSubscriptionOffer" className="form-check-label">
//               Enable Email Subscription Offer
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="container-fluid py-4 px-4">
//         <button type="submit" className="btn btn-primary mt-3">
//           Save Settings
//         </button>
//       </div>
//     </form>
//   );
// }
// export default General;


















































































