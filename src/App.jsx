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

function App() {
  const [currentUser] = useState({
    id: 1,
    role: 'student'
  });

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar currentUser={currentUser} />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeFeed currentUser={currentUser} />} />
            <Route path="/posts" element={<Posts currentUser={currentUser} />} />
            <Route path="/posts/new" element={<CreatePost currentUser={currentUser} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;