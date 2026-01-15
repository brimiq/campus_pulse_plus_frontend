import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomeFeed from "./pages/HomeFeed";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
// import PostDetail from './pages/PostDetail'; // Post details not implemented yet
// import Login from './pages/Login'; // Admin authentication handled by another team member
// import AdminDashboard from './pages/AdminDashboard'; // Admin authentication handled by another team member
// import AalyticsDashboard from './pages/AalyticsDashboard'; // Analytics handled by another team member

function App() {
  // Add mock user state for your Navbar and Reaction components
  const [currentUser] = useState({
    id: 1,
    role: 'student' // Change to 'admin' to test admin features
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar currentUser={currentUser} />

        <main className="flex-1">
          <Routes>
            {/* Your main routes - Home Feed and Create Post */}
            <Route path="/" element={<HomeFeed currentUser={currentUser} />} />
            <Route path="/posts" element={<Posts currentUser={currentUser} />} />
            <Route path="/posts/new" element={<CreatePost currentUser={currentUser} />} />

            {/* Other routes commented out - handled by other team members */}
            {/* <Route path="/posts/:id" element={<PostDetail />} /> */}
            {/* <Route path="/admin/login" element={<Login />} /> */}
            {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
            {/* <Route path="/analytics" element={<AalyticsDashboard />} /> */}

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
export default App;