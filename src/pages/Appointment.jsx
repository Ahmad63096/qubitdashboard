import React, { useState, useEffect } from "react";
import { convertTo12HourFormat } from "../components/Functions";
import EditAppointmentModal from "../components/EditAppointmentModal";
function Appointment() {
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [sortDateAsc, setSortDateAsc] = useState(true);
  const [sortTimeAsc, setSortTimeAsc] = useState(true);
  const fetchAppointments = async () => {
    try {
      const response = await fetch("https://bot.devspandas.com/api/appointment/get_appointments");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      const fetchedAppointments = data.appointments.map((item, index) => ({
        id: item.id, 
        name: item.client_name,
        date: item.preferred_date,
        time: item.preferred_time,
        email: item.client_email,
        necessity: item.service,
        status: item.demo_status.charAt(0).toUpperCase() + item.demo_status.slice(1),
      }));
      setAppointments(fetchedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };
  useEffect(() => {
    fetchAppointments();
  }, []);
  const handleView = (data) => {
    setSelectedData(data);
    setViewModal(true);
  };
  const handleEdit = (data) => {
    setSelectedData(data);
    setEditModal(true);
  };
  const handleClose = () => {
    setViewModal(false);
    setEditModal(false);
    setSelectedData(null);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://bot.devspandas.com/api/appointment/delete_appointment?id=${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete appointment");
      }
      await fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert("Failed to delete appointment.");
    }
  };
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return "btn btn-outline-success";
      case "pending":
        return "btn btn-outline-warning";
      case "cancel":
        return "btn btn-outline-danger";
      case "waiting":
        return "btn btn-outline-info";
      default:
        return "btn btn-outline-secondary";
    }
  };
  const handleSortByDate = () => {
    const sortedAppointments = [...appointments].sort((a, b) =>
      sortDateAsc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date)
    );
    setAppointments(sortedAppointments);
    setSortDateAsc(!sortDateAsc);
  };
  const handleSortByTime = () => {
    const sortedAppointments = [...appointments].sort((a, b) =>
      sortTimeAsc ? a.time.localeCompare(b.time) : b.time.localeCompare(a.time)
    );
    setAppointments(sortedAppointments);
    setSortTimeAsc(!sortTimeAsc);
  };
  return (
    <>
      <div className="container-fluid pt-4 px-4">
        <div className="rounded h-100 p-4">
          <h6 className="mb-4">Appointment Table</h6>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>
                    Date
                    <button onClick={handleSortByDate} style={{ fontSize: "16px" }}>
                      {sortDateAsc ? <i className="fa-solid fa-arrow-up" /> : <i className="fa-solid fa-arrow-down" />}
                    </button>
                  </th>
                  <th>
                    Time
                    <button onClick={handleSortByTime} style={{ fontSize: "16px" }}>
                      {sortTimeAsc ? <i className="fa-solid fa-arrow-up" /> : <i className="fa-solid fa-arrow-down" />}
                    </button>
                  </th>
                  <th>Email</th>
                  <th>Necessity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment, index) => (
                  <tr key={appointment.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{appointment.name}</td>
                    <td>{appointment.date}</td>
                    <td>{convertTo12HourFormat(appointment.time)}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.necessity}</td>
                    <td>
                      <button
                        type="button"
                        className={getStatusClass(appointment.status)}
                        style={{ padding: "0px 10px" }}
                      >
                        {appointment.status}
                      </button>
                    </td>
                    <td>
                      <button style={{ fontSize: "14px" }} onClick={() => handleView(appointment)}>
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button style={{ fontSize: "14px" }} onClick={() => handleEdit(appointment)}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                      <button
                        style={{ fontSize: "14px" }}
                        onClick={() => handleDelete(appointment.id)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* View Modal */}
      {viewModal && selectedData && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Appointment Details</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedData.name}</p>
                <p><strong>Date:</strong> {selectedData.date}</p>
                <p><strong>Time:</strong> {selectedData.time}</p>
                <p><strong>Email:</strong> {selectedData.email}</p>
                <p><strong>Necessity:</strong> {selectedData.necessity}</p>
                <p><strong>Status:</strong> {selectedData.status}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {editModal && selectedData && (
        <EditAppointmentModal
          appointment={selectedData}
          onClose={handleClose}
          onSave={() => {
            fetchAppointments();
          }}
        />
      )}
    </>
  );
}
export default Appointment;