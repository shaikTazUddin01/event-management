import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <Link to="/" className="text-[23px] font-bold">
            <span className="text-primary ">Event</span>Manager
          </Link>
          <p className="text-sm mt-1 text-gray-400">
            Seamless Event Planning & Management
          </p>
        </div>

        {/* Footer nav link */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300 text-[16px]">
          <Link to="/" className="hover:text-primary transition">
            Home
          </Link>
          <Link to="/events" className="hover:text-primary transition">
            Events
          </Link>
          <Link to="/add-event" className="hover:text-primary transition">
            Create Event
          </Link>
          <Link to="/about" className="hover:text-primary transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-primary transition">
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500 text-center md:text-right text-[16px]">
          © {new Date().getFullYear()} EventManager. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
