import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';
import Button from '../components/ui/Button';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdmin();
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
      const success = await login(formData.username, formData.password);
      if (success) {
        navigate('/admin');
      } else {
        setError('Invalid credentials');
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
        title="Admin Login - Aibek Z."
        description="Admin login page"
        url={`${siteConfig.url}/admin/login`}
      />
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-header font-mono font-semibold mb-2" style={{ color: 'var(--text-color)' }}>
              Admin Login
            </h1>
            <p className="text-body font-mono" style={{ color: 'var(--text-color)' }}>
              Enter your credentials to access admin panel
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
                className="w-full px-3 py-2 rounded-md font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)',
                  ':focus': { ringColor: 'var(--link-color)' }
                }}
                placeholder="Enter username or email..."
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
                className="w-full px-3 py-2 rounded-md font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
                style={{ 
                  backgroundColor: 'var(--bg-color)',
                  color: 'var(--text-color)',
                  border: '1px solid var(--border-color)',
                  ':focus': { ringColor: 'var(--link-color)' }
                }}
                placeholder="Enter password..."
              />
            </div>

            {error && (
              <p className="text-red-600 font-mono text-sm">{error}</p>
            )}

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="nav-link underline font-mono text-body focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
