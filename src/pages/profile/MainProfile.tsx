import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import ProfileCard from "../../components/ProfileCard";
import type { Profile } from "../../pages/ProfilePage";
import "../../styles/mainprofile.scss";
import LetterGlitch from "../../components/LetterGlitch";

type MainProfileProps = {
  profile: Profile;
};

const MainProfile = ({ profile }: MainProfileProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleName = profile.name.toLowerCase().replace(/\s+/g, "");

  return (
    <section className="main-profile">

      <div className="main-profile__letter-bg">
        <LetterGlitch
          glitchSpeed={70}
          centerVignette={false}
          outerVignette={false}
          smooth={true}
          glitchColors={["#ffffff", profile.color, "#ffffff"]}
        />
      </div>
      
      <button
        className="main-profile__back"
        onClick={() => {
          navigate("/", {
            state: {
              scrollTo: "our-team",
            },
          });
        }}
      >
        <IoArrowBack />
        Back
      </button>

       {profile.cv && (
        <a
          href={profile.cv}
          download
          className="main-profile__resume"
        >
          Download Resume ↗
        </a>
      )}

      <div className="main-profile__image">
        <ProfileCard
          name={profile.name}
          avatarUrl={profile.profile_image}
          enableTilt={true}
          enableMobileTilt={false}
          behindGlowEnabled={true}
          behindGlowColor={profile.color}
          innerGradient={`linear-gradient(145deg, ${profile.color}cc 0%, #ffffff22 100%)`}
        />
      </div>

      <div className="main-profile__content">
        <div className="main-profile__top">
          <div>
            <p className="main-profile__intro">Hi! I’m</p>
            <h1>{profile.name}</h1>
            <h2>{profile.role}</h2>

            

            {/* <div className="main-profile__buttons">
              <a href="#work">VIEW WORK HISTORY</a>
              <a href="#academic">VIEW ACADEMIC HISTORY</a>
            </div> */}
          </div>
         

          <div className="main-profile__socials">

            <div>
              {profile.facebook && (
                <a href={profile.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook />
                </a>
              )}

              {profile.instagram && (
                <a href={profile.instagram} target="_blank" rel="noopener noreferrer">
                  <FaInstagram />
                </a>
              )}

              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin />
                </a>
              )}

              {profile.github && (
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              )}
            </div>
          </div>
        </div>
         <hr className="main-profile__divider" />

        <p className="main-profile__bio">{profile.bio}</p>

        <div className="main-profile__stats">
          <div>
            <h3>
              {profile.completed_projects}
              <span>+</span>
            </h3>
            <p>Completed Projects</p>
          </div>

          <div>
            <h3>
              {profile.experience}
              <span>+</span>
            </h3>
            <p>Year/s of Experience</p>
          </div>
        </div>

        <div className="main-profile__skills">
          {profile.skills.map((skill, index) => (
            <div className="skill" key={index}>
              <div className="skill__info">
                <p>{skill.title}</p>
                <span>{skill.percentage}</span>
              </div>

              <div className="skill__line">
                <span style={{ width: skill.percentage.replace("&", "%") }} />
              </div>
            </div>
          ))}
        </div>
      </div>    
    </section>
  );
};

export default MainProfile;