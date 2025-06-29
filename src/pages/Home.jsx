import AboutSection from "../component/home/about_section";
import ActionSection from "../component/home/action_section";
import HeroSection from "../component/home/hero_section";

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ActionSection />
    </div>
  );
};

export default Home;
