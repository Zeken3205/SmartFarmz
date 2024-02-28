import React, { useContext, useState } from 'react';
import LogoAnimation from './Logoanimation';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logincontext from '../Context/Logincontext';

function Navbar() {
    const [iconName, setIconName] = useState('menu');
    const [showNavLinks, setShowNavLinks] = useState(false);
    const logincontext = useContext(Logincontext);
    let location = useLocation();
    let navigate = useNavigate();

    const toggleMenu = () => {
        setIconName(iconName === 'menu' ? 'close' : 'menu');
        setShowNavLinks(!showNavLinks);
    };

    const handlelogin = () => {
        navigate('/login');
    };

    const handlelogout = () => {
        localStorage.removeItem('token');
        logincontext.setlogincheck(false);
    };

    return (
        <nav className="flex justify-between items-center w-[92%] mx-auto rounded">
            <div className="w-16 cursor-pointer">
                <LogoAnimation />
            </div>
            <div
                className={`nav-links duration-500 md:static ${showNavLinks ? 'absolute' : 'hidden md:block'} bg-white md:min-h-fit min-h-[60vh] left-0 top-[9%] md:w-auto w-full flex items-center px-5`}
            >
                <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                            aria-current="page"
                            to="/"
                            style={
                                location.pathname === "/"
                                    ? { fontWeight: "bold", color: "#000000" }
                                    : {}
                            }
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`nav-link ${location.pathname === "/services" ? "active" : ""}`}
                            to="/services"
                            style={
                                location.pathname === "/services"
                                    ? { fontWeight: "bold", color: "#000000" }
                                    : {}
                            }
                        >
                            Services
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
                            to="/about"
                            style={
                                location.pathname === "/about"
                                    ? { fontWeight: "bold", color: "#000000" }
                                    : {}
                            }
                        >
                            About
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-6">
                <button
                    className="bg-[#a6c1ee] text-white px-5 py-2 rounded-full hover:bg-[#87acec]"
                    onClick={logincontext.logincheck ? handlelogout : handlelogin} // Check if logincheck is true
                >
                    {logincontext.logincheck ? 'Logout' : 'Sign in'}
                </button>
                <div>
                    <ion-icon
                        onClick={toggleMenu}
                        name={iconName}
                        className="text-3xl cursor-pointer hidden sm:block md:hidden" // This will hide the icon on screens larger than md
                    ></ion-icon>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;