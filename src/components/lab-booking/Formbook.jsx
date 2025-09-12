import React, { useState } from "react";
import "../../css/bookingform.css";

export default function FormBook({
  selectedTest,
  onCancel,
  onBookingComplete,
}) {
  const [form, setForm] = useState({
    name: "",
    age: "",
    phone: "",
    prescriptionFile: null,
    date: "",
    slots: [],
  });

  const slots = [
    "6-8 AM",
    "8-10 AM",
    "10-12 AM",
    "12-2 PM",
    "2-4 PM",
    "4-6 PM",
    "6-8 PM",
  ];

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type! Only PNG, JPG, JPEG, and PDF allowed.");
      e.target.value = null;
      return;
    }

    setForm({ ...form, prescriptionFile: file });
  };

  const toggleSlot = (slot) => {
    setForm((prev) => ({
      ...prev,
      slots: prev.slots.includes(slot)
        ? prev.slots.filter((s) => s !== slot)
        : [...prev.slots, slot],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.age || !form.phone.trim() || !form.date) {
      alert("Please fill all required fields!");
      return;
    }

    if (form.age <= 0 || form.age > 120) {
      alert("Please enter a valid age.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    if (form.slots.length === 0) {
      alert("Please select at least one time slot!");
      return;
    }

    const newBooking = {
      ...form,
      testName: selectedTest.testName,
      price: selectedTest.price,
      labName: selectedTest.labName || "Selected Lab",
      bookingId: "LAB" + Date.now(),
      bookingTime: new Date().toLocaleString(),
    };

    onBookingComplete(newBooking);
    onCancel();
  };

  return (
    <div className="fb-layout">
      <h2 className="fb-title">Book Your Test</h2>
      <form className="fb-form" onSubmit={handleSubmit}>
        <div className="fb-row">
          <input
            className="fb-input"
            placeholder="Full Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            className="fb-input"
            placeholder="Age"
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fb-row">
          <input
            className="fb-input"
            placeholder="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            className="fb-input"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="fb-row">
          <label className="fb-file-label">
            Upload Prescription
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileChange}
              className="fb-file"
            />
          </label>
        </div>

        <div className="fb-slots">
          <h4>Select Time Slots</h4>
          {slots.map((s) => (
            <label key={s} className="fb-slot">
              <input
                type="checkbox"
                checked={form.slots.includes(s)}
                onChange={() => toggleSlot(s)}
              />
              {s}
            </label>
          ))}
        </div>

        <div className="fb-actions">
          <button className="fb-submit" type="submit">
            Submit Booking
          </button>
          <button type="button" className="fb-cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
