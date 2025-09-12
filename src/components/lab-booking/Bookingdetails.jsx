import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import "../../css/bookdetail.css";

export default function BookingDetails({ bookings, onBack }) {
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filteredBookings = bookings.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.testName.toLowerCase().includes(search.toLowerCase()) ||
      b.labName.toLowerCase().includes(search.toLowerCase())
  );

  const MAX_DEFAULT = 4;
  const bookingsToShow = showAll
    ? filteredBookings
    : filteredBookings.slice(0, MAX_DEFAULT);

  const extraCount =
    !showAll && filteredBookings.length > MAX_DEFAULT
      ? filteredBookings.length - MAX_DEFAULT
      : 0;

  const handleDownloadCard = (booking) => {
    let textData = `
Booking ID: ${booking.bookingId}
Name: ${booking.name}
Age: ${booking.age} years
Phone: ${booking.phone}
Lab: ${booking.labName}
Test: ${booking.testName}
Price: ₹${booking.price}
Date: ${booking.date}
Booking Time: ${booking.bookingTime}
Slots: ${booking.slots.join(", ")}
Prescription: ${
      booking.prescriptionFile && booking.prescriptionFile.name
        ? booking.prescriptionFile.name
        : "Not Uploaded"
    }
`;
    const blob = new Blob([textData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `booking_${booking.bookingId}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bd-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <button className="bd-back-btn" onClick={onBack}>
          ← Back to Labs
        </button>

        {extraCount > 0 && (
          <button
            className="bd-back-btn"
            onClick={() => setShowAll(true)}
            style={{ position: "relative", backgroundColor: "#28a745" }}
          >
            View All
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {extraCount}
            </span>
          </button>
        )}
      </div>

      <h1 className="bd-title">🎯 Booking Details</h1>
      <p>Total Bookings: {filteredBookings.length}</p>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Name, Test, or Lab..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowAll(true);
          }}
          style={{
            width: "60%",
            maxWidth: "400px",
            padding: "8px 12px",
            fontSize: "14px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {bookingsToShow.length === 0 ? (
        <div style={{ textAlign: "center", color: "#555", marginTop: "20px" }}>
          No bookings found.
        </div>
      ) : (
        <div className="bd-bookings-grid">
          {bookingsToShow.map((booking, index) => (
            <div key={index} className="bd-booking-card">
              <div className="bd-booking-id">#{booking.bookingId}</div>
              <div className="bd-booking-header">{booking.testName}</div>

              <div className="bd-info-item">
                <div>Price:</div>
                <div>₹{booking.price}</div>
              </div>
              <div className="bd-info-item">
                <div>Lab:</div>
                <div>{booking.labName}</div>
              </div>
              <div className="bd-info-item">
                <div>Name:</div>
                <div>{booking.name}</div>
              </div>
              <div className="bd-info-item">
                <div>Age:</div>
                <div>{booking.age} years</div>
              </div>
              <div className="bd-info-item">
                <div>Phone:</div>
                <div>{booking.phone}</div>
              </div>
              <div className="bd-info-item">
                <div>Date:</div>
                <div>{booking.date}</div>
              </div>

              <div className="bd-slots">
                <div style={{ fontWeight: "600", marginBottom: "5px" }}>
                  Slots:
                </div>
                {booking.slots.map((s) => (
                  <span key={s}>{s}:00</span>
                ))}
              </div>

              <div className="bd-booking-time">
                Booking Time: {booking.bookingTime}
              </div>

              <div className="bd-prescription">
                Prescription:{" "}
                {booking.prescriptionFile ? (
                  <a
                    href={URL.createObjectURL(booking.prescriptionFile)}
                    download={booking.prescriptionFile.name}
                    style={{
                      marginLeft: "5px",
                      color: "#007bff",
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      fontWeight: "600",
                    }}
                  >
                    <FontAwesomeIcon icon={faDownload} />{" "}
                    {booking.prescriptionFile.name}
                  </a>
                ) : (
                  "Not Uploaded"
                )}
              </div>

              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => handleDownloadCard(booking)}
                  style={{
                    backgroundColor: "#ffc107",
                    border: "none",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontWeight: "600",
                    borderRadius: "4px",
                  }}
                >
                  <FontAwesomeIcon icon={faDownload} /> Download Card Info
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showAll && filteredBookings.length > MAX_DEFAULT && (
        <div style={{ textAlign: "center", marginTop: "15px", color: "#555" }}>
          Only showing first {MAX_DEFAULT} bookings. Use search or "View All" to
          see more.
        </div>
      )}
    </div>
  );
}
