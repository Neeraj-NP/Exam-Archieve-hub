
import React from 'react';
import { AcademicCapIcon, UsersIcon, LightBulbIcon } from '../components/icons/Icons';

const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">About Us</h2>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            Empowering Student Success
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-500">
            Exam Archive Hub was born from a simple idea: to make academic resources more accessible for everyone.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <AcademicCapIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-slate-900">Our Mission</h3>
              <p className="mt-2 text-base text-slate-500">
                To provide a centralized, easy-to-use platform for students to find and share previous year exam papers, fostering a collaborative learning environment.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <LightBulbIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-slate-900">Our Vision</h3>
              <p className="mt-2 text-base text-slate-500">
                We envision a world where every student has the resources they need to excel in their studies, breaking down barriers to academic achievement.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white mx-auto">
                <UsersIcon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-medium text-slate-900">Community-Driven</h3>
              <p className="mt-2 text-base text-slate-500">
                Our archive is built by students, for students. Every paper submitted helps grow our collective knowledge base and supports future learners.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
