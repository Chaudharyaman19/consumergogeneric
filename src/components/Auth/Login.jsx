import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../../css/login.css";

function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    if (!phone.trim() || !password.trim()) {
      setMessage("Please fill in all fields");
      setShowModal(true);
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        phone: phone.trim(),
        password: password.trim(),
      };
      const res = await axios.post(
        "http://localhost:5000/api/v1/userapp/auth/login",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      console.log("Login successful:", res.data);
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setMessage("Login Successful");
      setShowModal(true);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      console.error("Login Error:", e.response?.data || e.message);

      let errorMessage = "Login failed";

      if (e.response?.data?.message) {
        errorMessage = e.response.data.message;
      } else if (e.message === "Network Error") {
        errorMessage =
          "Cannot connect to server. Please check if backend is running.";
      } else if (e.code === "ECONNABORTED") {
        errorMessage = "Login request timed out. Please try again.";
      }

      setMessage(errorMessage);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);

    if (message.includes("Successful")) {
      const redirectTo = location.state?.from || "/labdata";
      const redirectState = {
        test: location.state?.test,
        lab: location.state?.lab,
      };

      navigate(redirectTo, {
        state: redirectState,
        replace: true,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <input
          type="text"
          placeholder="Enter Phone"
          className="login-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="off"
          disabled={isLoading}
        />

        <input
          type="password"
          placeholder="Enter Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
          disabled={isLoading}
        />

        <button
          onClick={handleLogin}
          className="login-btn"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="login-links">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            <Link to="/sendotp">Forgot Password?</Link>
          </p>
        </div>
      </div>

      {showModal && (
        <div className="login-modal">
          <div className="login-modal-content">
            <p>{message}</p>
            <button className="login-modal-btn" onClick={handleCloseModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
