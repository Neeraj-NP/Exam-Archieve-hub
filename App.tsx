
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
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import { PaperProvider } from './PaperContext';
import { AuthProvider } from './AuthContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/find" element={<FindPapersPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/admin-login" element={<AdminLoginPage />} />

                {/* Student Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={['student']} redirectTo="/login" />}>
                  <Route path="/submit" element={<SubmitPaperPage />} />
                </Route>

                {/* Admin Protected Routes */}
                <Route element={<ProtectedRoute allowedRoles={['admin']} redirectTo="/admin-login" />}>
                  <Route path="/admin" element={<AdminPage />} />
                </Route>
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
