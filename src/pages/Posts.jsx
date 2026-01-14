import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MessageSquare,
  Calendar,
  User,
  Image as ImageIcon,
  ArrowLeft,
  Sparkles,
  TrendingUp,
  Users,
  Heart,
} from "lucide-react";
import useFetchPosts from "../hooks/useFetchPosts";
import PostCard from "../components/posts/PostCard";

const Posts = () => {
  const { posts, loading, error } = useFetchPosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (posts) {
      let filtered = posts.filter((post) =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort posts
      filtered.sort((a, b) => {
        if (sortBy === "newest") {
          return new Date(b.created_at) - new Date(a.created_at);
        } else if (sortBy === "oldest") {
          return new Date(a.created_at) - new Date(b.created_at);
        }
        return 0;
      });

      setFilteredPosts(filtered);
    }
  }, [posts, searchTerm, sortBy]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " at " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">Error loading posts</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posts-page">
      {/* HERO SECTION */}
      <section className="posts-hero-section">
        <div className="posts-hero-background">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
            alt="Community Posts"
            className="posts-hero-background"
            loading="eager"
          />
        </div>
        <div className="posts-hero-gradient"></div>
        <div className="posts-hero-noise"></div>

        <div className="posts-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="posts-hero-header"
          >
            <Link
              to="/"
              className="posts-back-button"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="posts-hero-title"
            >
              Community <br />
              <span className="gradient-text">Voice</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="posts-hero-subtitle"
            >
              Discover what your fellow students are saying. Every post matters in building a better campus community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* SEARCH & FILTERS SECTION */}
      <section className="posts-filters-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="posts-filters-container"
          >
            {/* Search Bar */}
            <div className="posts-search-wrapper">
              <div className="posts-search-input-wrapper">
                <Search className="posts-search-icon" size={20} />
                <input
                  type="text"
                  placeholder="Search posts by content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="posts-search-input"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="posts-filters-row">
              <div className="posts-filter-group">
                <Filter size={16} className="posts-filter-icon" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="posts-filter-select"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              <Link to="/posts/new" className="posts-create-btn">
                <MessageSquare size={18} />
                Share Your Voice
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="posts-stats-grid">
              <div className="posts-stat-card">
                <div className="posts-stat-icon">
                  <MessageSquare size={24} />
                </div>
                <div className="posts-stat-content">
                  <div className="posts-stat-value">{posts?.length || 0}</div>
                  <div className="posts-stat-label">Total Posts</div>
                </div>
              </div>

              <div className="posts-stat-card">
                <div className="posts-stat-icon">
                  <ImageIcon size={24} />
                </div>
                <div className="posts-stat-content">
                  <div className="posts-stat-value">
                    {posts?.filter(p => p.image).length || 0}
                  </div>
                  <div className="posts-stat-label">With Images</div>
                </div>
              </div>

              <div className="posts-stat-card">
                <div className="posts-stat-icon">
                  <Search size={24} />
                </div>
                <div className="posts-stat-content">
                  <div className="posts-stat-value">{filteredPosts.length}</div>
                  <div className="posts-stat-label">Showing</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* POSTS GRID SECTION */}
      <section className="posts-grid-section">
        <div className="container">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="posts-empty-state"
            >
              <div className="posts-empty-icon">
                <MessageSquare size={64} />
              </div>
              <h3 className="posts-empty-title">
                {searchTerm ? "No posts match your search" : "No posts yet"}
              </h3>
              <p className="posts-empty-description">
                {searchTerm
                  ? "Try adjusting your search terms or browse all posts"
                  : "Be the first to share your thoughts and start the conversation!"
                }
              </p>
              {!searchTerm && (
                <Link to="/posts/new" className="posts-empty-cta">
                  <Sparkles size={20} />
                  Create First Post
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="posts-grid"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="posts-grid-item"
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* LOAD MORE SECTION */}
      {filteredPosts.length > 0 && filteredPosts.length >= 12 && (
        <section className="posts-load-more">
          <div className="container">
            <button className="posts-load-more-btn">
              Load More Posts
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Posts;