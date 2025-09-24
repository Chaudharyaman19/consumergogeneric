import "../../css/Footer.css";
import newlogo from "../../assets/newlogo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaPaperPlane,
} from "react-icons/fa";

const FooterSection = () => {
  return (
    <footer className="ak-footer-section">
      <div className="ak-container">
        <div className="ak-footer-content">
          <div className="ak-footer-col">
            <div className="ak-footer-logo">
              <img src={newlogo} alt="Logo" />
            </div>
            <p className="ak-footer-text">
              Go Generic is an informational platform dedicated to spreading
              awareness about generic medicines and healthcare. We do not sell
              medicines — we only share knowledge.
            </p>
            <div className="ak-footer-social-icon">
              <span>Follow us</span>
              <a
                href="https://www.facebook.com/profile.php?id=61575015842306&mibextid=ZbWKwL"
                className="ak-facebook-bg"
              >
                <FaFacebookF />
              </a>
              <a href="https://x.com/GoGenericPharma" className="ak-twitter-bg">
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/gogenericpharma?igsh=Z3RmbmVjaHlubHg2"
                className="ak-google-bg"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com/@go_generic?si=VHoumOyIDEtEWDMI"
                className="ak-youtube-bg"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="ak-footer-col">
            <h3 className="ak-footer-widget-heading">Useful Links</h3>
            <ul className="ak-footer-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
              <li>
                <a href="#">FAQ</a>
              </li>
              <li>
                <a href="#">Support</a>
              </li>
            </ul>
          </div>

          <div className="ak-footer-col">
            <h3 className="ak-footer-widget-heading">Subscribe</h3>
            <p className="ak-footer-text">
              Stay updated with the latest news and health awareness tips.
            </p>
            <form className="ak-subscribe-form">
              <input type="email" placeholder="Enter your email" />
              <button type="submit">
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="ak-copyright-area">
        <p className="ak-copyright-text">
          © {new Date().getFullYear()} Go Generic | All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
