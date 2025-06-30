const ActionSection = () => {
  return (
    <section
      className="bg-accent text-accent-content py-20 px-6 text-center "
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Plan or Discover Events Like Never Before?
      </h2>
      <p className="text-lg max-w-2xl mx-auto mb-10 opacity-90">
        Join our growing network of event lovers and start creating
        unforgettable memories.
      </p>
      <a
        href="/signup"
        className="btn btn-lg btn-primary text-primary-content shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Get Started Now
      </a>
    </section>
  );
};

export default ActionSection;