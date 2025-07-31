import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';
import Button from '../components/ui/Button';

export default function AdminSignup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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
      <SEO 
        title="Admin Signup - Aibek Z."
        description="Create admin account"
        url={`${siteConfig.url}/admin/signup`}
      />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-header font-mono font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
              Create Admin Account
            </h1>
            <p className="text-body font-mono" style={{ color: 'var(--text-color)' }}>
              Create your admin account to manage the site
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-body font-mono font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                minLength={3}
                maxLength={30}
                className="w-full px-3 py-2 rounded-md font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)'
                }}
                placeholder="Enter username (3-30 characters)..."
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-body font-mono font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 rounded-md font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)'
                }}
                placeholder="Enter email address..."
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-body font-mono font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
                className="w-full px-3 py-2 rounded-md font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)'
                }}
                placeholder="Enter password (min 6 characters)..."
              />
            </div>

            {error && (
              <p className="text-red-600 font-mono text-sm">{error}</p>
            )}

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-3">
            <Link
              to="/admin/login"
              className="nav-link underline font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
            >
              Already have an account? Login
            </Link>
            
            <div>
              <button
                onClick={() => navigate('/')}
                className="nav-link underline font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
