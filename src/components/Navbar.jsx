import { useState, useEffect } from "react";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (toggle && !e.target.closest('.sidebar') && !e.target.closest('.menu-toggle')) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [toggle]);

  return (
    <nav className={`w-full flex py-4 md:py-6 justify-between items-center navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-black/80 backdrop-blur-md shadow-lg" : "bg-black/60 backdrop-blur-sm"
    }`}>
      {/* Fluorescent glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-sm"></div>
      
      {/* Content positioned above the glow */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <img src={logo} alt="hoobank" className="w-[80px] h-[32px] sm:w-[100px] sm:h-[40px]" />

        {/* Desktop Navigation */}
        <ul className="list-none hidden md:flex justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[14px] lg:text-[16px] hover:text-[#7df9ff] transition-all duration-300 ${
                active === nav.title 
                  ? "text-[#7df9ff] drop-shadow-[0_0_6px_rgba(125,249,255,0.9)]" 
                  : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-6 lg:mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain filter drop-shadow-[0_0_3px_rgba(125,249,255,0.8)] menu-toggle"
            onClick={() => setToggle(!toggle)}
          />

          {/* Mobile Menu */}
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black/80 backdrop-blur-lg border border-[#7df9ff]/30 absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-xl sidebar shadow-[0_0_15px_rgba(125,249,255,0.3)] transition-all duration-300 ease-in-out`}
          >
            <ul className="list-none flex justify-start items-start flex-1 flex-col w-full">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] w-full hover:bg-[#7df9ff]/10 hover:text-[#7df9ff] py-2 px-3 rounded transition-all duration-300 ${
                    active === nav.title 
                      ? "text-[#7df9ff] bg-[#7df9ff]/20 drop-shadow-[0_0_6px_rgba(125,249,255,0.9)]" 
                      : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-2"}`}
                  onClick={() => {
                    setActive(nav.title);
                    setToggle(false);
                  }}
                >
                  <a href={`#${nav.id}`} className="block w-full">{nav.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;