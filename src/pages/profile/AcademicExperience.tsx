import type { Profile } from "../../pages/ProfilePage";
import "../../styles/experienceSection.scss";

type AcademicExperienceProps = {
  profile: Profile;
};

const AcademicExperience = ({ profile }: AcademicExperienceProps) => {
  const acads = profile.acads || [];

  if (!acads.length) return null;

  return (
    <section className="experience-section" id="academic" style={{ "--profile-color": profile.color } as React.CSSProperties}>
      <div className="experience-section__header">
        <p>Academic History</p>
      </div>

      <div className="experience-section__timeline">
        {acads.map((acad, index) => {
          const achievements = acad.academic_achievement?.filter(Boolean) || [];
          const leadership = acad.leadership?.filter(Boolean) || [];

          return (
            <div className="experience-card" key={index}>
              <span className="experience-card__year">{acad.year_end}</span>

              <div>
                <h3>{acad.program}</h3>
                <h4>{acad.school}</h4>

                {achievements.length > 0 && (
                  <ul>
                    {achievements.map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}

                {leadership.length > 0 && (
                  <ul>
                    {leadership.map((lead, i) => (
                      <li key={i}>{lead}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AcademicExperience;