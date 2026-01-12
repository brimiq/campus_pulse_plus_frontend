import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Campus Pulse+</h3>
            <p>Empowering students to voice campus issues anonymously</p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/posts/new">Create Post</a></li>
              <li><a href="/admin/login">Admin Login</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>About</h4>
            <p>A platform for students to share and vote on campus issues.</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Campus Pulse+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;