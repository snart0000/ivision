import { useEffect, useState } from "react";
import LetterGlitch from "../components/LetterGlitch";
import "../styles/services.scss";

type ServiceItem = {
  id: string;
  title: string;
  description: string;
};

type ServiceData = {
  header: string;
  description: string;
  services: ServiceItem[];
};

const Services = () => {
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setServiceData(data.service))
      .catch((err) => console.error("Failed to load services:", err));
  }, []);

  useEffect(() => {
    if (!serviceData?.services?.length) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === serviceData.services.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [serviceData]);

  if (!serviceData) return null;

  const activeService = serviceData.services[activeIndex];

   const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="services" id="services">
      <div className="services__left">
        <div className="services__glitch-bg">
          <LetterGlitch
            glitchColors={["#ffffff", "#8f8f8f", "#3f3f3f"]}
            glitchSpeed={60}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
          />
        </div>

        <div className="services__left-content">
          <div>
            <span className="services__label">Services</span>
            <h2>{serviceData.header}</h2>
            <p>{serviceData.description}</p>
          </div>

          <div className="services__cta">
            <a onClick={() => scrollToSection("contact-us")}>GET IN TOUCH ↗</a>
          </div>
        </div>
      </div>

      <div className="services__right">
        <h3>WHAT WE OFFER?</h3>

        <div className="services__slider">
          <div className="services__title">
            <span>{activeService.id}</span>
            <h1>{activeService.title}</h1>
          </div>

          <p>{activeService.description}</p>
        </div>

        <div className="services__dots">
          {serviceData.services.map((_, index) => (
            <button
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;