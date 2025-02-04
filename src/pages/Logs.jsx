import React, { useState, useEffect, useRef } from 'react';
import { formatTimeAgo } from '../components/Chatlog';
import handleDownload from '../components/Functions';

function Logs() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageCount, setPageCount] = useState(0);
  const [activePage, setActivePage] = useState(0);

  const chatLogRef = useRef(null);
  const messagesPerPage = 50;

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    fetch(process.env.REACT_APP_API_CHATURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        const reversedChats = data.chats.reverse();
        setMessages(reversedChats);
        setFilteredMessages(reversedChats);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const regex = new RegExp(query, 'i');
    setFilteredMessages(
      messages.filter((msg) => {
        const nameMatches = regex.test(msg.client_name || '');
        const messageMatches = msg.messages.some(
          (chat) =>
            regex.test(chat.client_message || '') ||
            regex.test(chat.representative_message || '')
        );

        return nameMatches || messageMatches;
      })
    );
  };

  useEffect(() => {
    setPageCount(Math.ceil(filteredMessages.length / messagesPerPage));
    setActivePage(0);
  }, [filteredMessages]);

  const handlePageChange = (newPage) => {
    setActivePage(newPage);
  };

  const getCurrentPageMessages = () => {
    const startIndex = activePage * messagesPerPage;
    const endIndex = startIndex + messagesPerPage;
    return filteredMessages.slice(startIndex, endIndex);
  };
  const renderPaginationNumbers = () => {
    const paginationNumbers = [];
    const totalPages = pageCount;

    if (totalPages <= 2) {
      for (let i = 0; i < totalPages; i++) {
        paginationNumbers.push(i);
      }
    } else {
      paginationNumbers.push(0);
      if (activePage > 2) paginationNumbers.push('...');
      const startPage = Math.max(1, activePage - 1);
      const endPage = Math.min(totalPages - 2, activePage + 1);

      for (let i = startPage; i <= endPage; i++) {
        paginationNumbers.push(i);
      }
      if (activePage < totalPages - 3) paginationNumbers.push('...');
      paginationNumbers.push(totalPages - 1);
    }

    return paginationNumbers.map((page, index) => (
      <span
        key={index}
        onClick={() => typeof page === 'number' && handlePageChange(page)}
        className={`dot ${page === activePage ? 'active active-peg' : ''}`}
        style={{
          cursor: typeof page === 'number' ? 'pointer' : 'default',
          display: 'inline-block',
          width: '30px',
          textAlign: 'center',
          paddingTop: '2px',
        }}
      >
        {typeof page === 'number' ? page + 1 : page}
      </span>
    ));
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="container-fluid pt-4 px-4" >
        <div className="row g-4">
          <div className="col-sm-12 col-md-6 col-xl-4">
            <div className="h-100 rounded p-4" id="style-3">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <h6 className="mb-1" style={{ textTransform: 'capitalize' }}>
                  Sessions
                </h6>
              </div>
              <div className="form-group">
                <select
                  name="dataSource"
                  id="dataSource"
                  className="form-select form-control main-search"
                >
                  <option value="">Lead Gen Bot</option>
                  <option value="">Customer Support Bot</option>
                  <option value="">Recruitment Bot</option>
                  <option value="">E-commerce Bot</option>
                </select>
              </div>
              <div className="log-search my-3">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search chat logs..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              <div
                className="chat-log-scroll"
                ref={chatLogRef}
                style={{
                  height: '100%',
                  maxHeight: 'calc(100vh - 330px)',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  paddingRight: '20px'
                }}
              >
                {getCurrentPageMessages().map((msg, index) => (
                  <div
                    key={`${msg.session_id}-${index}`}
                    className={`d-flex align-items-center border-bottom py-3 ${selectedChat === index ? 'bg-darks' : ''
                      }`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedChat(index)}
                  >
                    <div className="w-100 ms-3">
                      <div className="d-flex w-100 justify-content-between">
                        <h6 className="mb-0" style={{ textTransform: 'capitalize' }}>
                          {msg.client_name || 'Unknown Person'}
                        </h6>
                        <small>{formatTimeAgo(msg.date_created)}</small>
                      </div>
                      <p className="first-message">{msg.messages[0]?.client_message}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pagination-controls mt-3 d-flex justify-content-center">
                {pageCount > 1 && (
                  <>
                    <button
                      onClick={() => handlePageChange(Math.max(activePage - 1, 0))}
                      disabled={activePage === 0}
                      className="btn btn-sm btn-secondary me-2"
                    >
                      Prev
                    </button>
                    {renderPaginationNumbers()}
                    <button
                      onClick={() => handlePageChange(Math.min(activePage + 1, pageCount - 1))}
                      disabled={activePage === pageCount - 1}
                      className="btn btn-sm btn-secondary ms-2"
                    >
                      Next
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-xl-8">
            <div className="h-100 rounded p-4">
              {filteredMessages[selectedChat] ? (
                <>
                  <div className="d-flex align-items-center justify-content-between mb-4 border">
                    <h6 className="m-3" style={{ textTransform: 'capitalize' }}>
                      {filteredMessages[selectedChat].client_name}
                    </h6>
                    {filteredMessages[selectedChat].ip_address && (
                      <p style={{ marginRight: '20px', marginTop: '11px' }}>
                        IP Address: {filteredMessages[selectedChat].ip_address}
                      </p>
                    )}
                    {filteredMessages[selectedChat].preferred_date && filteredMessages[selectedChat].preferred_time && (
                      <span>
                        Demo Scheduled: {filteredMessages[selectedChat].preferred_date} at{' '}
                        {new Date(`1970-01-01T${filteredMessages[selectedChat].preferred_time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </span>
                    )}
                    <span className="icons-margin" style={{ marginRight: '10px' }}>
                      <i
                        className="fa-solid fa-ellipsis ellipsis-pointer"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></i>
                      <ul
                        className="dropdown-menu dropdown-menu-end"
                        style={{ backgroundColor: "white", color: "black" }}
                      >
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleDownload(filteredMessages[selectedChat]._id, "pdf")}
                          >
                            <i className="fa-solid fa-file-pdf"></i> Download PDF
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => handleDownload(filteredMessages[selectedChat]._id, "csv")}
                          >
                            <i className="fa-solid fa-file-csv"></i> Download CSV
                          </button>
                        </li>
                      </ul>
                    </span>
                  </div>
                  <div className="chat-history scrollable-container">
                    {filteredMessages[selectedChat].messages.map((chat, index) => (
                      <div key={index} className="mb-3">
                        <div className="d-flex mb-4" id="self">
                          <span className="user-name">{filteredMessages[selectedChat].client_name}</span>
                          <p className="self">{chat.client_message}</p>
                        </div>
                        {chat.representative_message && (
                          <div className="d-flex mb-4" id="other">
                            <span className="bot-name">AI Representative</span>
                            <p className="other">{chat.representative_message}</p>
                            <small className="time-color">
                              {new Date(chat.timestamp).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true,
                              })}
                            </small>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>Please select a session to view the chat.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logs;
