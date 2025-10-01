
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FindPapersPage from './pages/FindPapersPage';
import SubmitPaperPage from './pages/SubmitPaperPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import { PaperProvider } from './PaperContext';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/find" element={<FindPapersPage />} />
              <Route path="/submit" element={<SubmitPaperPage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </PaperProvider>
  );
};

export default App;
