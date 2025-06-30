import { FaEdit, FaSearch, FaUsers } from "react-icons/fa";

const AboutSection = () => {
  const whyUs = [
    {
      title: "Effortless Discovery",
      detail:
        "Find events tailored to your interests with precise filters and smart search.",
      iconBg: "bg-primary/20",
      iconText: "text-primary",
      icon: <FaSearch size={36} />,
    },
    {
      title: "Seamless Management",
      detail:
        "Create and manage events with ease using our intuitive dashboard.",
      iconBg: "bg-success/20",
      iconText: "text-success",
      icon: <FaEdit size={36} />,
    },
    {
      title: "Community Focused",
      detail:
        "Connect with attendees and organizers to grow your network and share experiences.",
      iconBg: "bg-info/20",
      iconText: "text-info",
      icon: <FaUsers size={36} />,
    },
  ];
  return (
    <div className="max-w-7xl mx-auto">
      <section className="py-20 px-6 mb-20 rounded-lg">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-base-content mb-12">
          Why Choose Event Manager?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {whyUs.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300 hover:border-primary"
            >
              <div className={`${feature.iconBg} ${feature.iconText} p-4 rounded-full mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-base-content mb-2">
                {feature.title}
              </h3>
              <p className="text-base-content/80">{feature.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutSection;