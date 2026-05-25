import { useEffect, useRef, useState } from "react";
import "../styles/about.scss";
import aboutBg from "../assets/media/about-bg.png";
import iVisionLogo from "../assets/media/iv-logo.png";

const skills = [
  "REACT",
  "C++",
  "C#",
  "NODE.JS",
  "JAVASCRIPT",
  "CANVA",
  "FIGMA",
  "PHOTOSHOP",
  "CAPCUT",
  "MICROSOFT TOOLS",
  "GOOGLE WORKSPACE",
];

const AboutUs = () => {
  const aboutRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = aboutRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={aboutRef}
      className={`about-us ${isVisible ? "about-us--show" : ""}`}
      id="about-us"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="about-us__overlay">
        <div className="about-us__content">
          <div className="about-us__text">
            <span>About Us</span>

            <h2>Four minds. One vision.</h2>

            <p>
              We are IVision — a team focused on delivering innovative and
              reliable digital solutions.
            </p>

            <p>
              We specialize in Web Development, Web Design, Graphic Design,
              Database Management, and Networking, combining creativity and
              technical expertise to build modern, functional, and user-centered
              systems. Driven by one vision, we aim to turn ideas into impactful
              digital experiences.
            </p>
          </div>

          <div className="about-us__logo">
            <img src={iVisionLogo} alt="iVision Logo" />
          </div>
        </div>
      </div>

      <div className="about-us__skills">
        <div className="about-us__skills-track">
          {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
            <span key={index}>{skill}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;