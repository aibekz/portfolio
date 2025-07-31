import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { PostsProvider } from './contexts/PostsContext.jsx';
import { AdminProvider } from './contexts/AdminContext.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Posts from './pages/Posts.jsx';
import PostDetail from './pages/PostDetail.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminCreatePost from './pages/AdminCreatePost.jsx';
import AdminEditPost from './pages/AdminEditPost.jsx';
import NotFound from './pages/NotFound.jsx';
import useGoogleAnalytics from './hooks/useGoogleAnalytics.js';

function AppContent() {
  useGoogleAnalytics();

  return (
    <AdminProvider>
      <PostsProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:slug" element={<PostDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/posts/create" element={<AdminCreatePost />} />
            <Route path="/admin/posts/:id/edit" element={<AdminEditPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </PostsProvider>
    </AdminProvider>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}
