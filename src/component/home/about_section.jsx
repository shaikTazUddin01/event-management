import { FaEdit, FaSearch, FaUsers } from "react-icons/fa";

const AboutSection = () => {
  const whyUs = [
    {
      title: "Effortless Discovery",
      detail:
        "Find events tailored to your interests with precise filters and smart search.",
      iconColor: "bg-blue-100 text-blue-600",
      icon: <FaSearch size={36} />,
    },
    {
      title: "Seamless Management",
      detail:
        "Create and manage events with ease using our intuitive dashboard.",
      iconColor: "bg-green-100 text-green-600",
      icon: <FaEdit size={36} />,
    },
    {
      title: "Community Focused",
      detail:
        "Connect with attendees and organizers to grow your network and share experiences.",
      iconColor: "bg-purple-100 text-purple-600",
      icon: <FaUsers size={36} />,
    },
  ];
  return (
    <div className="max-w-7xl mx-auto ">
      <section className="py-20 px-6 mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose Event Manager?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {whyUs.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 shadow-md hover:shadow-lg transition"
            >
              <div className={`${feature.iconColor} p-4 rounded-full mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
