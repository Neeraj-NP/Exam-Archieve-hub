
import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BookOpenIcon, MenuIcon, XIcon, ShieldCheckIcon } from './icons/Icons';
import { useAuth } from '../AuthContext';

const NavLinks: React.FC<{ onLinkClick: () => void }> = ({ onLinkClick }) => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const linkStyle = "px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors";
    const activeLinkStyle = "bg-blue-100 text-blue-700";

    const handleLogout = () => {
        logout();
        onLinkClick();
        navigate('/');
    };

    return (
        <>
            <NavLink to="/" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`} onClick={onLinkClick} end>Home</NavLink>
            <NavLink to="/find" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`} onClick={onLinkClick}>Find Papers</NavLink>
            {currentUser?.role === 'student' && (
                <NavLink to="/submit" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`} onClick={onLinkClick}>Submit Paper</NavLink>
            )}
            <NavLink to="/about" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`} onClick={onLinkClick}>About Us</NavLink>
            <NavLink to="/contact" className={({ isActive }) => `${linkStyle} ${isActive ? activeLinkStyle : ''}`} onClick={onLinkClick}>Contact</NavLink>
            {currentUser?.role === 'admin' && (
                <NavLink to="/admin" className={({ isActive }) => `ml-0 md:ml-4 px-3 py-2 rounded-md text-sm font-medium text-purple-700 bg-purple-100 hover:bg-purple-200 flex items-center gap-1.5 ${isActive ? 'ring-2 ring-purple-400' : ''}`} onClick={onLinkClick}>
                    <ShieldCheckIcon className="w-4 h-4" />
                    Admin Panel
                </NavLink>
            )}
            <div className="mt-2 md:mt-0 md:ml-4 border-t border-slate-200 md:border-none pt-2 md:pt-0">
                {currentUser ? (
                    <div className="flex items-center gap-3 px-3">
                        <span className="text-sm text-slate-600 truncate">{currentUser.email}</span>
                        <button onClick={handleLogout} className="px-3 py-2 rounded-md text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200">Logout</button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link to="/login" className={`${linkStyle}`} onClick={onLinkClick}>Login</Link>
                        <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700" onClick={onLinkClick}>Register</Link>
                    </div>
                )}
            </div>
        </>
    );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => setIsOpen(false);

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
                <NavLinks onLinkClick={handleLinkClick} />
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-slate-100 inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
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
            <NavLinks onLinkClick={handleLinkClick} />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
