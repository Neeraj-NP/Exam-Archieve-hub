
import React from 'react';
import { MailIcon, PhoneIcon, LocationMarkerIcon } from '../components/icons/Icons';

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Contact Us</h2>
          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 sm:text-5xl">
            We'd love to hear from you
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-500">
            Whether you have a question, feedback, or a partnership inquiry, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="mt-20 max-w-lg mx-auto grid grid-cols-1 gap-10">
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <MailIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-slate-900">Email</h3>
              <p className="mt-2 text-base text-slate-500">
                For general inquiries and support, please email us. We aim to respond within 24 hours.
              </p>
              <a href="mailto:support@examarchive.hub" className="mt-2 text-base font-medium text-blue-600 hover:text-blue-500">
                support@examarchive.hub
              </a>
            </div>
          </div>
          <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <PhoneIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-slate-900">Phone</h3>
              <p className="mt-2 text-base text-slate-500">
                You can reach us by phone during standard business hours (9 AM - 5 PM).
              </p>
              <a href="tel:+1234567890" className="mt-2 text-base font-medium text-blue-600 hover:text-blue-500">
                +1 (234) 567-890
              </a>
            </div>
          </div>
           <div className="flex">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                <LocationMarkerIcon className="h-6 w-6" />
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-slate-900">Office</h4>
              <p className="mt-2 text-base text-slate-500">
                123 University Ave, Learning City, 45678
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
