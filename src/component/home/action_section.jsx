const ActionSection = () => {
  return (
    <div>
      <section
        className="bg-gradient-to-r from-pink-500 to-fuchsia-600
       text-white py-20 px-6 text-center "
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
          className="bg-white text-pink-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100"
        >
          Get Started Now
        </a>
      </section>
    </div>
  );
};

export default ActionSection;
