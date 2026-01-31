import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-600 to-purple-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-white flex items-center gap-2 hover:scale-105 transition-transform"
          onClick={() => setIsOpen(false)}
        >
          <img src="/src/assets/logo.png" className="size-12" />
          Shruva
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-8">
          {["Home", "Features", "About", "Demo"].map((item) => (
            <li key={item}>
              <Link
                to={
                  item === "Home"
                    ? "/"
                    : item === "Features"
                    ? "/features"
                    : `/${item.toLowerCase()}`
                }
                className="text-white font-semibold hover:text-yellow-300 transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-300 group-hover:w-full transition-all"></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <>
              <Link
                to="/chat"
                className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-full hover:shadow-md transition-all"
              >
                Chat
              </Link>
              <span className="text-white font-medium">{user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                className="px-6 py-2 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-purple-600 transition-all"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 bg-white text-purple-600 font-semibold rounded-full hover:bg-transparent hover:text-white border-2 border-white transition-all"
              >
                Login
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button (Mobile) */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-700 px-6 py-6 space-y-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-white font-semibold">
            Home
          </Link>
          <Link to="/features" onClick={() => setIsOpen(false)} className="block text-white font-semibold">
            Features
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block text-white font-semibold">
            About
          </Link>
          <Link to="/demo" onClick={() => setIsOpen(false)} className="block text-white font-semibold">
            Demo
          </Link>

          <hr className="border-purple-400" />

          {user ? (
            <>
              <Link
                to="/chat"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-white text-purple-600 font-semibold rounded-full text-center"
              >
                Chat
              </Link>
              <p className="text-white text-center font-medium">{user.name}</p>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 bg-red-500 text-white font-semibold rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 border-2 border-white text-white font-semibold rounded-full text-center"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 bg-white text-purple-600 font-semibold rounded-full text-center"
              >
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
