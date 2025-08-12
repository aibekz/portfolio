import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';

export default function AdminSignup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const { signup } = useAdmin();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await signup(formData.username, formData.email, formData.password);
      if (result.success) {
        navigate('/admin');
      } else {
        setError(result.error || 'Signup failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid-pattern"></div>
        </div>
        
        {/* Glowing orb effect */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-matrix-green opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-matrix-green opacity-3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="w-full max-w-md relative z-10">
          {/* Header section */}
          <div className="text-center mb-12">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-matrix-green/10 to-transparent border border-matrix-green/20 mb-6">
              <div className="w-12 h-12 mx-auto">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-matrix-green">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-mono font-bold text-fg-light mb-3">
              Create Admin Account
            </h1>
            <p className="text-fg-light/70 font-mono text-sm">
              Set up your administrative access
            </p>
          </div>

          {/* Signup form */}
          <div className="backdrop-blur-sm bg-bg-dark/50 border border-matrix-green/20 rounded-2xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username field */}
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm font-mono font-medium text-fg-light/90">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField('')}
                    required
                    minLength={3}
                    maxLength={30}
                    className={`w-full px-4 py-3 bg-bg-dark/80 border rounded-xl font-mono text-fg-light placeholder-fg-light/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 focus:border-matrix-green/50 ${
                      focusedField === 'username' ? 'border-matrix-green/50 shadow-lg shadow-matrix-green/10' : 'border-fg-light/20'
                    }`}
                    placeholder="Enter username (3-30 characters)"
                  />
                  <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-matrix-green to-transparent transition-opacity duration-300 ${
                    focusedField === 'username' ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </div>
              </div>

              {/* Email field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-mono font-medium text-fg-light/90">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    required
                    className={`w-full px-4 py-3 bg-bg-dark/80 border rounded-xl font-mono text-fg-light placeholder-fg-light/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 focus:border-matrix-green/50 ${
                      focusedField === 'email' ? 'border-matrix-green/50 shadow-lg shadow-matrix-green/10' : 'border-fg-light/20'
                    }`}
                    placeholder="Enter your email address"
                  />
                  <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-matrix-green to-transparent transition-opacity duration-300 ${
                    focusedField === 'email' ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-mono font-medium text-fg-light/90">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    required
                    minLength={6}
                    className={`w-full px-4 py-3 bg-bg-dark/80 border rounded-xl font-mono text-fg-light placeholder-fg-light/40 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 focus:border-matrix-green/50 ${
                      focusedField === 'password' ? 'border-matrix-green/50 shadow-lg shadow-matrix-green/10' : 'border-fg-light/20'
                    }`}
                    placeholder="Enter password (min 6 characters)"
                  />
                  <div className={`absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-matrix-green to-transparent transition-opacity duration-300 ${
                    focusedField === 'password' ? 'opacity-100' : 'opacity-0'
                  }`}></div>
                </div>
              </div>

              {/* Error message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 animate-fade-in">
                  <p className="text-red-400 font-mono text-sm flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-matrix-green to-matrix-green/80 text-bg-dark font-mono font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-matrix-green/25 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 focus:ring-offset-2 focus:ring-offset-bg-dark disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Create Admin Account
                  </div>
                )}
              </button>
            </form>

            {/* Navigation links */}
            <div className="mt-8 text-center space-y-4">
              <Link
                to="/admin/login"
                className="inline-flex items-center text-matrix-green hover:text-matrix-green/80 font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 rounded-lg px-2 py-1"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Already have an account? Login
              </Link>
              
              <div>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center text-matrix-green hover:text-matrix-green/80 font-mono text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-matrix-green/50 rounded-lg px-2 py-1"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
