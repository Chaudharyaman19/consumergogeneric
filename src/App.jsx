import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Landing/Homepage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Forgotpass from "./components/Auth/Forgotpass";
import Sendotp from "./components/Auth/Sendotp";
import Resetpassword from "./components/Auth/Resetpassword";
import Labdata from "./components/lab-booking/Labdata";
import Formbook from "./components/lab-booking/Formbook";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
        <Route path="/sendotp" element={<Sendotp />} />
        <Route path="/resetpassword" element={<Resetpassword />} />

        <Route
          path="/labdata"
          element={
            <ProtectedRoute>
              <Labdata />
            </ProtectedRoute>
          }
        />
        <Route
          path="/formbook"
          element={
            <ProtectedRoute>
              <Formbook />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
