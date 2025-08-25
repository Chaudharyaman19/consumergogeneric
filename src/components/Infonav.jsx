import { FiZap, FiMail, FiMapPin } from "react-icons/fi";
import "../css/Infonav.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <>
      <div>
        <nav className="nav-container nav-nav">
          <div className="nav-logo">
            <img src={logo} alt="Gogeneric" />
          </div>
          <div className="nav-right">
            <div className="nav-item">
              <FiZap className="nav-icon" />
              <span>Support: 9211510600 </span>
            </div>

            <div className="nav-item">
              <FiMail className="nav-icon" />
              <span>gogenericmed@gmail.com</span>
            </div>
            <div className="nav-item">
              <FiMapPin className="nav-icon" />
              <span>Ghaziabad ( Sahibabad)</span>
            </div>
          </div>
        </nav>
        <div></div>
      </div>
    </>
  );
};

export default Navbar;
