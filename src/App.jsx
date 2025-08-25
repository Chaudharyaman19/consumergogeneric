import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
// import Register from "./components/Register";
import Homepage from "./components/Homepage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} /> */}
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
