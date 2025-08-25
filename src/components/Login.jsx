import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.logo}>Login</h1>
        <form style={styles.form} onSubmit={handleLogin}>
          <input
            style={styles.input}
            type="email"
            placeholder="Phone number, username, or email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={styles.button} type="submit">
            Log In
          </button>
        </form>
        <div style={styles.divider}>
          <span style={styles.line}></span>
          <span style={styles.or}>OR</span>
          <span style={styles.line}></span>
        </div>
        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <span style={styles.signup} onClick={() => navigate("/register")}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fafafa",
  },
  card: {
    background: "#fff",
    border: "1px solid #dbdbdb",
    padding: "40px",
    borderRadius: "8px",
    width: "100%",
    maxWidth: "350px",
    textAlign: "center",
  },
  logo: {
    fontFamily: "'Billabong', cursive",
    fontSize: "40px",
    marginBottom: "30px",
    color: "#262626",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #dbdbdb",
    borderRadius: "4px",
    background: "#fafafa",
    outline: "none",
  },
  button: {
    padding: "10px",
    fontSize: "14px",
    background: "#0095f6",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0",
  },
  line: {
    flex: 1,
    height: "1px",
    background: "#dbdbdb",
  },
  or: {
    margin: "0 10px",
    fontSize: "12px",
    color: "#8e8e8e",
    fontWeight: "bold",
  },
  linkText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#262626",
  },
  signup: {
    color: "#0095f6",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Login;
