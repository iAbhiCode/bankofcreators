import { useState } from "react";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar bg-black/60 backdrop-blur-md shadow-lg relative">
      {/* Fluorescent glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-sm"></div>
      
      {/* Content positioned above the glow */}
      <div className="relative z-10 w-full flex justify-between items-center">
        <img src={logo} alt="hoobank" className="w-[100px] h-[40px]" />

        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[16px] hover:text-[#7df9ff] transition-all duration-300 ${
                active === nav.title 
                  ? "text-[#7df9ff] drop-shadow-[0_0_6px_rgba(125,249,255,0.9)]" 
                  : "text-dimWhite"
              } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain filter drop-shadow-[0_0_3px_rgba(125,249,255,0.8)]"
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } p-6 bg-black/60 backdrop-blur-md border border-[#7df9ff]/30 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar shadow-[0_0_15px_rgba(125,249,255,0.3)]`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] hover:text-[#7df9ff] transition-all duration-300 ${
                    active === nav.title 
                      ? "text-[#7df9ff] drop-shadow-[0_0_6px_rgba(125,249,255,0.9)]" 
                      : "text-dimWhite"
                  } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                  onClick={() => setActive(nav.title)}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
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