
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon } from './icons/Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="h-7 w-7 text-blue-600" />
            <span className="font-bold text-lg text-slate-800">Exam Archive Hub</span>
          </div>
          <div className="text-sm text-slate-500 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/about" className="hover:text-blue-600">About</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
          </div>
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Exam Archive Hub. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
