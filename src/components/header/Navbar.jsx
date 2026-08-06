import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MENU_ITEMS = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
];

const Navbar = ({ base_url }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [header, setHeader] = useState([]);

  const path = "/api/all/header/";
  const API_URL = `${base_url}${path}`;

  // logo/ header data fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await fetch(API_URL);
        const data = await res1.json();
        setHeader(data);
      } catch (err) {
        console.log("Error Fetching Header API Data", err);
      }
    };
    fetchData();
  }, [API_URL]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div
        className="shadow-md border-b sticky top-0 z-50"
        style={{
          backgroundColor: "var(--main_bg)",
        }}
      >
        <div className="container mx-auto flex items-center justify-between p-3">
          {/* header */}
          <Link to={"/"} className="text-decoration-none">
            {header.map((headeritem, index) => (
              <div key={index} className="flex items-center gap-3">
                <img
                  src={
                    headeritem.logo
                      ? `${headeritem.logo}`
                      : `/static/default.png`
                  }
                  alt="Logo"
                  className="w-auto h-[40px] m-0"
                />
              </div>
            ))}
          </Link>
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {MENU_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-decoration-none text-dark rounded-lg text-md font-medium transition-all duration-200 
                    ${ isActive
                      ? "bg-black/5 text-current font-semibold shadow-xs"
                      : "opacity-75 hover:opacity-100 hover:bg-black/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle Navigation Menu"
              className="p-2 rounded-lg opacity-80 hover:opacity-100 hover:bg-black/5"
            >
              <svg
                className="h-6 w-6 transition-transform duration-200"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden border-t border-gray-200/10 ${
          isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          backgroundColor: "var(--main_bg)",
        }}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-decoration-none text-dark font-medium transition-colors 
                  ${ isActive
                      ? "bg-black/5 font-semibold opacity-100"
                      : "opacity-75 hover:opacity-100 hover:bg-black/5"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  base_url: PropTypes.string.isRequired,
};

export default Navbar;
