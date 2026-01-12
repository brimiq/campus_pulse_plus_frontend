import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ currentUser }) {
  const navigate = useNavigate();
  const isAdmin = currentUser && currentUser.role === 'admin';

  const handleLogout = () => {
    // Will connect to real logout later
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-brand">
          <h1>Campus Pulse+</h1>
        </Link>

        {/* Navigation Links */}
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          
          <Link to="/posts/new" className="nav-link">
            Create Post
          </Link>

          {isAdmin && (
            <>
              <Link to="/admin/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link to="/analytics" className="nav-link">
                Analytics
              </Link>
            </>
          )}
        </div>

        {/* User Actions */}
        <div className="navbar-actions">
          {currentUser ? (
            <div className="user-info">
              <span className="user-role">{currentUser.role}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/admin/login" className="btn-login">
              Admin Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;