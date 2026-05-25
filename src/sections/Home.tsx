import { useEffect, useRef, useState } from "react";
import "../styles/home.scss";
import homeVideo from "../assets/media/home-vid.mp4";
import Cursor from "../components/Cursor";
import Candle from "../components/Candle";
// import BgMusic from "../components/BgMusic";

const Home = () => {
  const brandRef = useRef<HTMLDivElement | null>(null);
  const [brandVisible, setBrandVisible] = useState(false);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const brand = brandRef.current;
    if (!brand) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setBrandVisible(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );

    observer.observe(brand);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="home" id="home">
      {/* <BgMusic /> */}
      <Cursor targetSelector=".home" />
      <Candle />

      <video className="home__video" autoPlay loop muted playsInline>
        <source src={homeVideo} type="video/mp4" />
      </video>

      <div className="home__overlay"></div>

      <div className="home__content">
        <div
          ref={brandRef}
          className={`home__brand ${brandVisible ? "home__brand--show" : ""}`}
        >
          <h1>
            <button
              className="home__brand-link"
              onClick={() => scrollToSection("about-us")}
              aria-label="Go to about us section"
            >
              IV
            </button>
            ision
          </h1>

          <p>Engineering the future of digital reality.</p>
        </div>

        <div className="home__intro">
          <h2 className="home__animated-text">
            <span className="home__static-text">WE</span>

            <button
              className="home__words"
              onClick={() => scrollToSection("services")}
              aria-label="Go to services section"
            >
              <span className="home__words-list">
                <span className="home__word">BUILD.</span>
                <span className="home__word">DEVELOP.</span>
                <span className="home__word">DESIGN.</span>
                <span className="home__word">MANAGE DATA.</span>
                <span className="home__word">BUILD.</span>
              </span>
            </button>
          </h2>

          <button
            className="home__button"
            onClick={() => scrollToSection("contact-us")}
            aria-label="Go to contact us section"
          >
            GET IN TOUCH <span>↗</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;