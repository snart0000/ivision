import "../styles/about.scss";
import aboutBg from "../assets/media/about-bg.png";
import iVisionLogo from "../assets/media/iv-logo.png";
// import GhostCursor from "../components/GhostCursor";

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
  return (
    <section
      className="about-us"
      id="about-us"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      <div className="about-us__overlay">

        {/* <GhostCursor
          color="#ebebeb"
          brightness={1}
          edgeIntensity={0}
          trailLength={50}
          inertia={0.5}
          grainIntensity={0.05}
          bloomStrength={0.1}
          bloomRadius={1}
          bloomThreshold={0.025}
          fadeDelayMs={1000}
          fadeDurationMs={1500}
          zIndex={1}
        /> */}

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