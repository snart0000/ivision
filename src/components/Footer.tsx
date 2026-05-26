import "../styles/footer.scss";
import logo from "../assets/media/iv-logo.png";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { TbBrandTiktok } from "react-icons/tb";
import ParticleBg from "./ParticleBg";

const Footer = () => {
  return (
    <footer className="footer" id="contact-us">
      <ParticleBg />

      <div className="footer__brand">
        <img src={logo} alt="IVision Logo" />

        <h2>
          <span>IV</span>ision
        </h2>
      </div>

      <div className="footer__right">
        <div className="footer__socials">
          <a
            href="https://www.facebook.com/profile.php?id=61590330754287"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
             <FiFacebook />
          </a>

          <a
            href="https://www.instagram.com/ivision.0426/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FiInstagram />
          </a>

          <a
            href="https://www.tiktok.com/@ivision27"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <TbBrandTiktok/>
          </a>

          {/*
          <a
            href="#"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          */}
        </div>

        <p className="footer__copyright">
          Copyright © 2026 IVision. All rights reserve.
        </p>
      </div>
    </footer>
  );
};

export default Footer;