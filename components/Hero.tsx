
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './icons/Icons';

const Hero: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
          <span className="block">Your One-Stop</span>
          <span className="block text-blue-600">Exam Archive</span>
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-xl text-slate-500 sm:max-w-3xl">
          Unlock academic success with our extensive collection of previous year exam papers. Find what you need, or contribute to help others.
        </p>
        <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
          <div className="rounded-md shadow">
            <Link
              to="/find"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105"
            >
              Find Papers Now
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Link
              to="/submit"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-transform transform hover:scale-105"
            >
              Submit a Paper
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
