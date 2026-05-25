import { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import type { Profile } from "../../pages/ProfilePage";
import "../../styles/project.scss";
import LetterGlitch from "../../components/LetterGlitch";
import LogoLoop from "../../components/LogoLoop";
import {
  SiHtml5,
  SiJavascript,
  SiSass,
  SiTailwindcss,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiGo,
  SiMysql,
  SiPhp,
  SiFigma,
  SiCanva,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbBrandCpp, TbBrandAdobePhotoshop } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const techLogos = [
  { node: <SiHtml5 />, title: "HTML" },
  { node: <FaJava />, title: "Java" },
  { node: <SiJavascript />, title: "JavaScript" },
  { node: <SiSass />, title: "Sass" },
  { node: <SiTailwindcss />, title: "Tailwind" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiReact />, title: "React.js" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiGo />, title: "Go" },
  { node: <SiMysql />, title: "MySQL" },
  { node: <TbBrandCpp />, title: "C++" },
  { node: <SiPhp />, title: "PHP" },
  { node: <VscVscode />, title: "VS Code" },
  { node: <SiFigma />, title: "Figma" },
  { node: <SiCanva />, title: "Canva" },
  { node: <TbBrandAdobePhotoshop />, title: "Photoshop" },
];

type ProjectProps = {
  profile: Profile;
};

const Project = ({ profile }: ProjectProps) => {
  const projects = profile.projects || [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      setItemsToShow(window.innerWidth <= 900 ? 1 : 4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedImage ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  useEffect(() => {
    if (!projects.length || selectedImage) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [projects.length, selectedImage]);

  const visibleProjects = useMemo(() => {
    if (!projects.length) return [];

    return Array.from({ length: Math.min(itemsToShow, projects.length) }).map(
      (_, offset) => {
        const index = (activeIndex + offset) % projects.length;
        return projects[index];
      }
    );
  }, [activeIndex, projects, itemsToShow]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleViewProject = (
    e: React.MouseEvent<HTMLAnchorElement>,
    project: (typeof projects)[number]
  ) => {
    if (project.type === "image") {
      e.preventDefault();
      setSelectedImage(project.project_image);
    }
  };

  if (!projects.length) return null;

  return (
    <section className="profile-projects" id="projects">
      <div className="profile-projects__letter-bg">
        <LetterGlitch
          glitchSpeed={70}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
          glitchColors={["#ffffff", profile.color, "#ffffff"]}
        />
      </div>

      <h2>PROJECTS</h2>

      <button
        className="profile-projects__arrow profile-projects__arrow--left"
        onClick={handlePrev}
        aria-label="Previous project"
      >
        <IoIosArrowBack />
      </button>

      <div className="profile-projects__grid">
        {visibleProjects.map((project) => (
          <a
            href={
              project.type === "image"
                ? project.project_image
                : project.link ?? undefined
            }
            target="_blank"
            rel="noopener noreferrer"
            className="profile-projects__card"
            key={project.id}
            onClick={(e) => handleViewProject(e, project)}
          >
            <img src={project.project_image} alt={project.project_title} />

            <div className="profile-projects__overlay">
              <p>{project.project_title}</p>
              <span>VIEW↗</span>
            </div>
          </a>
        ))}
      </div>

      <button
        className="profile-projects__arrow profile-projects__arrow--right"
        onClick={handleNext}
        aria-label="Next project"
      >
        <IoIosArrowForward />
      </button>

      <div className="profile-projects__dots">
        {projects.map((project, index) => (
          <button
            key={project.id}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {selectedImage && (
        <div
          className="profile-projects__modal"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="profile-projects__modal-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close image modal"
          >
            <IoClose />
          </button>

          <img
            src={selectedImage}
            alt="Full project preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <footer className="profile-projects__footer">
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={34}
          gap={44}
          hoverSpeed={10}
          scaleOnHover
          fadeOut
          fadeOutColor={profile.color}
          ariaLabel="Technology stack and tools"
        />
      </footer>
    </section>
  );
};

export default Project;