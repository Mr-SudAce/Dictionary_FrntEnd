import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const menu = [
    { label: "Home", path: "/" },
    // { label: "Words", path: "/word" },
    { label: "About", path: "/about" },
    // { label: "Contact", path: "/contact" },
];


const Navbar = ({ base_url }) => {

    const path = "/api/all/header/"
    const API_URL = `${base_url}${path}`

    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [header, setHeader] = useState([])

    useEffect(() => {
        axios
            .get(API_URL)
            .then((res) => {
                setHeader(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log("Error Fetching Header API Data", err);
            })
    }, [API_URL])


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <div className="shadow-md border-b sticky top-0 z-50" style={{
                backgroundColor: 'var(--main_bg)'
            }}>
                <div className=" mx-auto flex items-center justify-between p-3">
                    <Link to={"/"} className="text-decoration-none">
                        {header.map((headeritem, index) => (

                            <div key={index} className="flex items-center gap-3">
                                <img
                                src={headeritem.logo ? `${base_url}${headeritem.logo}` : `${base_url}/static/default.png` }
                                    alt="Logo"
                                    className="w-auto h-[40px] m-0"
                                />
                            </div>
                        ))}
                    </Link>

                    {/* Hamburger Menu for Mobile */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 focus:outline-none"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={
                                        isMenuOpen
                                            ? "M6 18L18 6M6 6l12 12"
                                            : "M4 6h16M4 12h16M4 18h16"
                                    }
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <ul
                        className={`md:flex items-center space-x-6 m-0 absolute md:relative top-16 md:top-auto left-0 w-full md:w-auto md:bg-transparent  bg-white shadow-md md:shadow-none md:space-x-6  ${isMenuOpen
                            ? "block"
                            : "hidden"
                            }`}
                    >
                        {menu.map((m, index) => (
                            <li key={index} className="border-b md:border-none">
                                <Link
                                    to={m.path}
                                    className="block text-decoration-none text-xl font-bold text-black hover:text-red-600 hover:border-b-2 opacity-100 p-2 uppercase "
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {m.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

Navbar.propTypes = {
    base_url: PropTypes.string.isRequired,
};

export default Navbar;
