
const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-blue-600">
      <section className="max-w-7xl mx-auto text-white py-24 px-6  text-center mb-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
          Discover & Manage Your Next Unforgettable Event
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-10 opacity-90">
          From intimate gatherings to grand conferences, Event Manager equips
          you with everything you need to plan, promote, and participate.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/events"
            className="btn btn-lg bg-white text-blue-700 font-semibold px-8 rounded-full hover:bg-gray-200"
          >
            Explore Events
          </a>
          <a
            href="/create-event"
            className="btn btn-lg border-white border text-white font-semibold px-8 rounded-full hover:bg-[#111010] transition"
          >
            Create Event
          </a>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
