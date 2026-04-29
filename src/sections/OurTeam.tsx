import { useEffect, useState } from "react";
import "../styles/ourTeam.scss";

type TeamMember = {
  id: string;
  face_image: string;
  full_image: string;
  color: string;
  name: string;
  role: string;
};

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

            <a href="#" className="team-card__btn">
              LEARN MORE ↗
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;