const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-accent">
      <section className="max-w-7xl mx-auto text-primary-content py-24 px-6 text-center mb-20">
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
           
            className="btn btn-lg btn-neutral text-neutral-content font-semibold px-8 shadow-md hover:shadow-lg transition-all duration-300"
          >
            Explore Events
          </a>
          <a
            href="/create-event"
            className="btn btn-lg btn-outline text-primary-content border-primary-content font-semibold px-8 hover:bg-primary-content hover:text-primary shadow-md hover:shadow-lg transition-all duration-300"
          >
            Create Event
          </a>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;