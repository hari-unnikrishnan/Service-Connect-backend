import React, { useState } from "react";
import "./ComplaintForm.css";
import avatar from "./assets/Ellipse 309.png";
import {
  ArrowLeft,
  Image,
  CircleAlert,
  Loader2,
  X
} from "lucide-react";
import { createComplaint } from "./api.js";

export default function ComplaintForm({ onNavigateBack, onNavigateToComplaintList, bookingId = 1, bookingData }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Convert uploaded files to base64 data URLs
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove a selected image
  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit complaint to backend
  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      setError("Please fill in both title and description.");
      return;
    }
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await createComplaint({
        booking: bookingId,
        title: title.trim(),
        description: description.trim(),
        images: images,
      });
      setSuccess("Complaint submitted successfully!");
      setTimeout(() => {
        if (onNavigateToComplaintList) onNavigateToComplaintList();
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to submit complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-page">
      <div className="complaint-container">

        {/* HEADER */}
        <div className="cf-header">
          <button className="back-btn" onClick={onNavigateBack}>
            &#8249;
          </button>
          <h2>COMPLAINT FORM</h2>
        </div>

        {/* USER */}
        <div className="user-section">
          <div className="avatar">
            <img src={avatar} alt="user" />
          </div>
          <div>
            <h4>{bookingData?.provider_name || "Nazrul Islam"}</h4>
            <p className="servicename">{bookingData?.service_name || "Electrification 💪"}</p>
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="card">
          <p className="booking-id">Booking Id : {bookingData?.booking_id || "12aa21w"}</p>

          <label className="tittlename">Title</label>
          <p className="values">{bookingData?.service_title || "Bulb Change"}</p>

          <label className="Desc">Description</label>
          <p className="value">{bookingData?.service_description || "Service description"}</p>

          <label className="Desc">Appointment</label>
          <div className="date-row">
            <span className="Desc">{bookingData?.date || "Jun 10, 2024"}</span>
            <span className="Desc">{bookingData?.time || "9:41 AM"}</span>
          </div>

          <h4 className="invoice-title">Invoice</h4>

          <table>
            <thead>
              <tr className="Desc">
                <th>Sl.no</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="Desc">
                <td>1</td>
                <td>{bookingData?.service_title || "Bulb Change"}</td>
                <td>1</td>
                <td>{bookingData?.price || "300"}</td>
                <td>{bookingData?.price || "300"}</td>
              </tr>
            </tbody>
          </table>

          <div className="total">Grand Total : {bookingData?.price || "300"}</div>

          <p className="terms">Valid up to 1 month</p>

          <div className="alert">
            <CircleAlert size={16} />
            <span>Additional Requirements</span>
          </div>

          <p className="req">
            Provide Ladder <br />
            Bulb should be provided
          </p>
        </div>

        {/* STATUS BUTTONS */}
        <button className="status-btn">Service Status</button>
        <button className="status-btn">Payment Status</button>

        {/* INPUT */}
        <div className="input-card">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter complaint title"
          />
        </div>

        <div className="input-card">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your complaint"
          />
        </div>

        {/* UPLOAD */}
        <div className="upload-card" onClick={() => document.getElementById("complaint-images").click()}>
          <span className="Images">Images & Videos</span>
          <Image size={20} color="black" />
          <input
            id="complaint-images"
            type="file"
            accept="image/*,video/*"
            multiple
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </div>

        {/* IMAGE PREVIEWS */}
        {images.length > 0 && (
          <div className="image-previews" style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
            {images.map((img, idx) => (
              <div key={idx} style={{ position: "relative" }}>
                <img
                  src={img}
                  alt={`preview-${idx}`}
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                />
                <button
                  onClick={() => removeImage(idx)}
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    background: "#ff4444",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    cursor: "pointer",
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ERROR / SUCCESS MESSAGES */}
        {error && (
          <p style={{ color: "#d32f2f", marginTop: "8px", fontSize: "14px", textAlign: "center" }}>
            {error}
          </p>
        )}
        {success && (
          <p style={{ color: "#2e7d32", marginTop: "8px", fontSize: "14px", textAlign: "center" }}>
            {success}
          </p>
        )}

        {/* BUTTON */}
        <button className="submit-btnsz" onClick={ onNavigateToComplaintList} disabled={loading}>
          <span className="book-text">
            {loading ? "Submitting..." : "Confirm Complaint"}
          </span>
          {loading ? (
            <Loader2 size={18} className="arrow" style={{ animation: "spin 1s linear infinite" }} />
          ) : (
            <span className="arrow">→</span>
          )}
        </button>

      </div>
    </div>
  );
}

