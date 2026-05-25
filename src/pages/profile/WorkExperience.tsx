import type { Profile } from "../../pages/ProfilePage";
import "../../styles/experienceSection.scss";

type WorkExperienceProps = {
  profile: Profile;
};

const WorkExperience = ({ profile }: WorkExperienceProps) => {
  const work = profile.work || [];

  if (!work.length) return null;

  return (
    <section className="experience-section" id="work" style={{ "--profile-color": profile.color } as React.CSSProperties}>
      <div className="experience-section__header">
        <p>Work History</p>
      </div>

      <div className="experience-section__timeline">
        {work.map((item, index) => (
          <div className="experience-card" key={index}>
            <span className="experience-card__year">
                {[
                    item.start_month,
                    item.start_year,
                ]
                    .filter(Boolean)
                    .join(" ")}

                {(item.end_month || item.end_year) && " - "}

                {[
                    item.end_month,
                    item.end_year,
                ]
                    .filter(Boolean)
                    .join(" ")}
            </span>

            <div>
              <h3>{item.job_title}</h3>
              <h4>{item.employer}</h4>

              {item.task?.filter(Boolean).length > 0 && (
                <ul>
                  {item.task.filter(Boolean).map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;