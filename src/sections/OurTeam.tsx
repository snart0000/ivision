import { useEffect, useState } from "react";
import "../styles/ourTeam.scss";
import LogoLoop from "../components/LogoLoop";
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
import { TbBrandCpp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";
import { TbBrandAdobePhotoshop } from "react-icons/tb";
import { Link } from "react-router-dom";

type TeamMember = {
  id: string;
  face_image: string;
  full_image: string;
  color: string;
  name: string;
  role: string;
};

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

const OurTeam = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setMembers(data.details))
      .catch((err) => console.error("Failed to fetch team data:", err));
  }, []);

  return (
    <section className="our-team" id="our-team">
      <div className="our-team__header">
        <h2>OUR TEAM</h2>
      </div>

      <div className="our-team__grid">
        {members.map((member) => (
          <div
            className="team-card"
            key={member.id}
            style={{ "--member-color": member.color } as React.CSSProperties}
          >
            <div className="team-card__info">
              <span>{member.id}</span>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>

            <img
              src={member.face_image}
              alt={member.name}
              className="team-card__face"
            />

            <img
              src={member.full_image}
              alt={member.name}
              className="team-card__full"
            />

            <Link 
            to={`/profile/${member.id}`} 
            state={{ fromOurTeam: true }}
            className="team-card__btn">
              LEARN MORE ↗
            </Link>
          </div>
        ))}
      </div>
       <footer className="our-team__footer">
        <LogoLoop
          logos={techLogos}
          speed={80}
          direction="left"
          logoHeight={34}
          gap={44}
          hoverSpeed={10}
          scaleOnHover
          fadeOut
          fadeOutColor="#111111"
          ariaLabel="Technology stack and tools"
        />
      </footer>
    </section>
  );
};

export default OurTeam;

