import { useState } from "react";
import axios from "axios";
import "../../css/resetpass.css";

function Resetpassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleReset = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match ❌");
      setShowModal(true);
      return;
    }

    try {
      const api = await axios.put(
        "http://localhost:5000/api/v1/userapp/auth/reset-password",
        {
          password,
          confirmPassword,
        }
      );
      setMessage("Password reset successfully ✅");
      setShowModal(true);
      console.log(api.data);
      setPassword("");
      setConfirmPassword("");
    } catch (e) {
      setMessage("Failed to reset password ❌");
      setShowModal(true);
      console.log(e);
    }
  };

  return (
    <div className="reset-container">
      <div className="reset-box">
        <h2 className="reset-title">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="reset-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="reset-input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleReset} className="reset-btn">
          Reset Password
        </button>
      </div>

      {showModal && (
        <div className="reset-modal">
          <div className="reset-modal-content">
            <p>{message}</p>
            <button
              className="reset-modal-btn"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resetpassword;
