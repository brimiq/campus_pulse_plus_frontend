import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Campus Pulse+</h3>
            <p className="text-gray-300">Empowering students to voice campus issues anonymously</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home Feed
                </Link>
              </li>
              <li>
                <Link to="/posts/new" className="text-gray-300 hover:text-white transition-colors">
                  Create Post
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">About</h4>
            <p className="text-gray-300">A platform for students to share and vote on campus issues.</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; {currentYear} Campus Pulse+. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;