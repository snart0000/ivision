import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainProfile from "./profile/MainProfile";
import Project from "./profile/Project";
import Loading from "../components/Loading";
import "../styles/profilepage.scss";
import WorkExperience from "./profile/WorkExperience";
import AcademicExperience from "./profile/AcademicExperience";

// export type Skill = {
//   title: string;
//   percentage: string;
// };

// export type Project = {
//   id: string;
//   project_title: string;
//   project_image: string;
//   type: string;
//   link: string | null;
// };

// export type Work = {
//   job_title: string;
//   employer: string;
//   task: string[];
//   start_month: string;
//   start_year: string;
//   end_month: string;
//   end_year: string;
// };

// export type Acad = {
//   program: string;
//   school: string;
//   year_end: string;
//   academic_achievement?: string[];
//   leadership?: string[];
// };

// export type Profile = {
//   id: string;
//   profile_image: string;
//   color: string;
//   cv: string;
//   name: string;
//   role: string;
//   bio: string;
//   completed_projects: string;
//   experience: string;
//   facebook: string;
//   instagram: string;
//   linkedin: string;
//   github: string;
//   skills: Skill[];
//   projects: Project[];
//   work: Work[];
//   acads: Acad[];
// };

export type Profile = {
  id: string;
  profile_image: string;
  face_image: string;
  full_image: string;
  color: string;
  cv?: string;
  name: string;
  role: string;
  bio: string;
  completed_projects: string;
  experience: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;

  skills: {
    title: string;
    percentage: string;
  }[];

  projects?: {
    id: string;
    project_title: string;
    project_image: string;
    type: string;
    link?: string;
  }[];

  work?: {
    job_title: string;
    employer: string;
    task: string[];
    start_month: string;
    start_year: string;
    end_month: string;
    end_year: string;
  }[];

  acads?: {
    program: string;
    school: string;
    year_end: string;
    academic_achievement: string[];
    leadership?: string[];
  }[];
};

const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [id]);

  useEffect(() => {
    setIsLoading(true);

    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedProfile = data.details.find(
          (member: Profile) => member.id === id
        );

        setProfile(selectedProfile || null);
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
        setProfile(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!profile) {
    return <div className="profile-page__loading">Profile not found.</div>;
  }

  return (
    <main
      className="profile-page"
      style={{ "--profile-color": profile.color } as React.CSSProperties}
    >
      <div className="profile-page__content">
        <MainProfile profile={profile} />
        <Project profile={profile} />
        <WorkExperience profile={profile} />
        <AcademicExperience profile={profile} />
      </div>
    </main>
  );
};

export default ProfilePage;