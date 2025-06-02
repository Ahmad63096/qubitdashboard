import React, { useState } from "react";
function EditAppointmentModal({ appointment, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...appointment });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
console.log("edit appointment data",appointment);
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `https://bot.devspandas.com/api/appointment/update_appointment?id=${appointment.id}`,
        {
          method: "PUT", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_name: formData.name,
            preferred_date: formData.date,
            preferred_time: formData.time,
            client_email: formData.email,
            service: formData.necessity,
            demo_status: formData.status.toLowerCase(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update appointment");
      }
      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment.");
    }
  };
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Appointment</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Date</label>
                <input type="date" name="date" className="form-control" value={formData.date} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Time</label>
                <input type="time" name="time" className="form-control" value={formData.time} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Necessity</label>
                <input type="text" name="necessity" className="form-control" value={formData.necessity} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Status</label>
                <select name="status" className="form-select" value={formData.status} onChange={handleChange}>
                  <option value="Pending">Pending</option>
                  <option value="Success">Success</option>
                  <option value="Cancel">Cancel</option>
                  <option value="Waiting">Waiting</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditAppointmentModal;