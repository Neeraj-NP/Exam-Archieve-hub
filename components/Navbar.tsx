
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BookOpenIcon, MenuIcon, XIcon, ShieldCheckIcon } from './icons/Icons';

const NavLinks: React.FC = () => {
    const linkStyle = "px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors";
    const activeLinkStyle = "bg-blue-100 text-blue-700";
    return (
        <>
            <NavLink to="/" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`} end>Home</NavLink>
            <NavLink to="/find" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Find Papers</NavLink>
            <NavLink to="/submit" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Submit Paper</NavLink>
            <NavLink to="/about" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>About Us</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`}>Contact</NavLink>
            <NavLink to="/admin" className={({ isActive }) => `ml-4 px-3 py-2 rounded-md text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 flex items-center gap-1.5 ${isActive ? 'ring-2 ring-purple-400' : ''}`}>
                <ShieldCheckIcon className="w-4 h-4" />
                Admin Panel
            </NavLink>
        </>
    );
}

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <BookOpenIcon className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl text-slate-800">Exam Archive Hub</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline">
                <NavLinks />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-100 inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <MenuIcon className="block h-6 w-6" />
              ) : (
                <XIcon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <NavLinks />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
