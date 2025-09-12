import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateUser = async () => {
      const user = localStorage.getItem("user");

      if (!user) {
        console.log("No user in localStorage");
        redirectToLogin();
        return;
      }

      try {
        const userData = JSON.parse(user);

        if (userData.token) {
          const response = await axios.get(
            `http://localhost:5000/api/v1/userapp/auth/me`,
            {
              headers: {
                Authorization: `Bearer ${userData.token}`,
              },
              timeout: 5000,
            }
          );

          if (response.data && response.data.status === "SUCCESS") {
            console.log("User validation successful");
            setIsAuthenticated(true);
          } else {
            console.log("User validation failed - clearing localStorage");
            localStorage.removeItem("user");
            redirectToLogin();
            return;
          }
        } else {
          console.log("No token found, redirecting to login");
          localStorage.removeItem("user");
          redirectToLogin();
          return;
        }
      } catch (error) {
        console.log("User validation error:", error.response?.status);

        if (error.response?.status === 401 || error.response?.status === 404) {
          console.log("Unauthorized or user not found - clearing localStorage");
          localStorage.removeItem("user");
          redirectToLogin();
          return;
        }

        if (
          error.code === "ECONNABORTED" ||
          error.message === "Network Error"
        ) {
          console.log("Network error - allowing access");
          setIsAuthenticated(true);
        } else {
          console.log("Unknown error - clearing localStorage");
          localStorage.removeItem("user");
          redirectToLogin();
          return;
        }
      }

      setIsLoading(false);
    };

    const redirectToLogin = () => {
      navigate("/login", {
        replace: true,
        state: { from: location.pathname, ...location.state },
      });
    };

    validateUser();
  }, [navigate, location]);

  if (isLoading) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          minHeight: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Checking user status...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div
        style={{
          padding: "20px",
          textAlign: "center",
          backgroundColor: "#ffebee",
          border: "1px solid #f44336",
        }}
      >
        <p>Access denied. Redirecting to login...</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
