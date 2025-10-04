import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate(currentUser.role === 'admin' ? '/admin' : '/find');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match.');
    }
    setError('');
    setLoading(true);
    try {
      await register(email, password);
      navigate('/find');
    } catch (err: any) {
      setError(err.message || 'Failed to register.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900">Create an Account</h1>
          <p className="mt-4 text-lg text-slate-500">
            Join our community and start sharing and finding exam papers.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-xl border border-slate-200">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
            <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700">Confirm Password</label>
            <input type="password" id="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Register'}
            </button>
          </div>
           <div className="text-sm text-center">
            <p className="text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                    Log in
                </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;