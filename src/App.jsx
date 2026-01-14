import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import CategoryFilter from "./components/CategoryFilter";
import ReactionCounter from "./components/ReactionCounter";

import HomeFeed from "./pages/HomeFeed";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
// import PostDetail from './pages/PostDetail';
// import Login from './pages/Login';
// import AdminDashboard from './pages/AdminDashboard';
// import AalyticsDashboard from './pages/AalyticsDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/new" element={<CreatePost />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
