import "../styles/footer.scss";
import logo from "../assets/media/iv-logo.png";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer" id="contact-us">
      <div className="footer__brand">
        <img src={logo} alt="IVision Logo" />
        <h2>
          <span>IV</span>ision
        </h2>
      </div>

      <div className="footer__contact">
        <p>Bucana Malaki, Naic, Cavite</p>
        <p>+63 912 345 6789</p>
        <p>ivision@gmail.com</p>
      </div>

      <div className="footer__right">
        <div className="footer__socials">
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagramSquare />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>

        <p className="footer__copyright">2026 © IVision</p>
      </div>
    </footer>
  );
};

export default Footer;