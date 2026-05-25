import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/navbar.scss";
import ParticleBg from "./ParticleBg";

import logo from "../assets/media/iv-logo.png";

const navLinks = [
  { label: "HOME", target: "home" },
  { label: "ABOUT US", target: "about-us" },
  { label: "SERVICES", target: "services" },
  { label: "CONTACT US", target: "contact-us" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNavClick = (id: string) => {
    setIsOpen(false);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    scrollToSection(id);
  };

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;

    if (state?.scrollTo) {
      setTimeout(() => {
        scrollToSection(state.scrollTo as string);
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== "/") {
        setActiveSection("");
        return;
      }

      const sections = navLinks
        .map((link) => document.getElementById(link.target))
        .filter(Boolean) as HTMLElement[];

      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="navbar">
      <div className="navbar__container">
        <button
          className="navbar__logo"
          onClick={() => handleNavClick("home")}
          aria-label="Go to home"
        >
          <img src={logo} alt="IV Logo" />
        </button>

        <nav className={`navbar__menu ${isOpen ? "navbar__menu--open" : ""}`}>
          <ParticleBg />

          {navLinks.map((link) => (
            <button
              key={link.target}
              className={`navbar__link ${
                activeSection === link.target ? "navbar__link--active" : ""
              }`}
              onClick={() => handleNavClick(link.target)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div id="menuToggle" className="navbar__burger">
          <input
            id="checkbox"
            type="checkbox"
            checked={isOpen}
            onChange={() => setIsOpen(!isOpen)}
          />

          <label className="toggle" htmlFor="checkbox">
            <div className="bar bar--top"></div>
            <div className="bar bar--middle"></div>
            <div className="bar bar--bottom"></div>
          </label>
        </div>
      </div>
    </header>
  );
};

export default Navbar;