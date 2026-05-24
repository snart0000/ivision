import "../styles/home.scss";
import homeVideo from "../assets/media/home-vid.mp4";
import Cursor from "../components/Cursor";
import Candle from "../components/Candle";
// import BgMusic from "../components/BgMusic";


const Home = () => {

    const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
        <div className="home__brand">
          <h1>
            {/* <span>IV</span>ision */}
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
            {/* <span className="home__words"> */}
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
              {/* </span> */}
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