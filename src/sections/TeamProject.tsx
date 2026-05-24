import { useEffect, useMemo, useState } from "react";
import "../styles/teamProject.scss";

type TeamProjectItem = {
  project_id: string;
  team_project_title: string;
  team_project_image: string;
  team_project_bg_image: string;
  team_project_description: string;
  team_project_type: string;
  team_project_link: string;
};

const TeamProject = () => {
  const [projects, setProjects] = useState<TeamProjectItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setProjects(data.team_project || []))
      .catch((err) => console.error("Failed to load team projects:", err));
  }, []);

  const activeProject = projects[activeIndex];

  const visibleProjects = useMemo(() => {
    if (!projects.length) return [];

    return [0, 1, 2].map((offset) => {
      const index = (activeIndex + offset) % projects.length;
      return {
        ...projects[index],
        realIndex: index,
      };
    });
  }, [projects, activeIndex]);

  const nextSlide = () => {
    if (!projects.length) return;

    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % projects.length);
    setAnimationKey((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!projects.length) return;

    setDirection("prev");
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    setAnimationKey((prev) => prev + 1);
  };

  const goToSlide = (index: number) => {
    if (!projects.length || index === activeIndex) return;

    setDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <section
      className="team-project"
      id="team-project"
      style={{
        backgroundImage: activeProject
          ? `url(${activeProject.team_project_bg_image})`
          : undefined,
      }}
    >
      <div className="team-project__overlay"></div>

      <h2 className="team-project__title">Team Project</h2>

      <div className="team-project__content">
        <div className="team-project__info">
          {activeProject && (
            <>
              <a
                href={activeProject.team_project_link}
                target="_blank"
                rel="noreferrer"
                className="team-project__label"
              >
                {activeProject.team_project_title}
              </a>

              <p>{activeProject.team_project_description}</p>
            </>
          )}
        </div>

        <div
          key={animationKey}
          className={`team-project__carousel team-project__carousel--${direction}`}
        >
          {visibleProjects.map((project, index) => (
            <div
              className={`team-project__card ${
                index === 0 ? "team-project__card--active" : ""
              }`}
              key={`${project.project_id}-${project.realIndex}`}
              onClick={() => goToSlide(project.realIndex)}
            >
              <img
                src={project.team_project_image}
                alt={project.team_project_title}
              />
              <h3>{project.team_project_title}</h3>
            </div>
          ))}
        </div>
      </div>

      <div className="team-project__controls">
        <button type="button" onClick={prevSlide}>
          ←
        </button>
        <button type="button" onClick={nextSlide}>
          →
        </button>
      </div>
    </section>
  );
};

export default TeamProject;