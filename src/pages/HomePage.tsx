import Home from "../sections/Home";
import OurTeam from "../sections/OurTeam";
import TeamProject from "../sections/TeamProject";
import AboutUs from "../sections/AboutUs";
import Services from "../sections/Services";
import ContactUs from "../sections/ContactUs";

const HomePage = () => {
  return (
    <>
      <main>
        <Home />
        <TeamProject/>
        <AboutUs/>
        <OurTeam />
        <Services/>
        <ContactUs/>

      </main>
    </>
  );
};

export default HomePage;