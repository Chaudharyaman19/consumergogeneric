import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Landing/Homepage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Forgotpass from "./components/Auth/Forgotpass";
import Sendotp from "./components/Auth/Sendotp";
import Resetpassword from "./components/Auth/Resetpassword";

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
      </Routes>
    </Router>
  );
}

export default App;
