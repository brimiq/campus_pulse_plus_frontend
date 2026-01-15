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
    return (
      date.toLocaleDateString() +
      " at " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
            alt="Community Posts"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        ></div>

        <div className="relative z-30 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white no-underline font-medium text-sm mb-8 transition-all hover:bg-white/20 hover:-translate-x-1"
            >
              <ArrowLeft size={20} />
              Back to Home
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl md:text-7xl font-black text-white mb-4 drop-shadow-lg tracking-tight leading-tight"
            >
              Community <br />
              <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent font-extrabold">
                Voice
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto"
            >
              Discover what your fellow students are saying. Every post matters
              in building a better campus community.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters Section */}
      <section className="py-16 bg-white relative z-20 rounded-t-[3rem] -mt-8 shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Search Bar */}
            <div className="p-8 border-b border-gray-200">
              <div className="relative max-w-md mx-auto">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search posts by content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-4 pr-4 pl-12 border-2 border-gray-200 rounded-full text-base bg-gray-50 transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:bg-white"
                />
              </div>
            </div>

            {/* Filters Row */}
            <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg bg-white text-sm cursor-pointer transition-all focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              <Link
                to="/posts/new"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold text-sm no-underline transition-all hover:from-blue-600 hover:to-blue-700 hover:-translate-y-1 hover:shadow-xl shadow-lg"
              >
                <MessageSquare size={18} />
                Share Your Voice
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-200">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all hover:bg-gray-100 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                  <MessageSquare size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900">
                    {posts?.length || 0}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Total Posts
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all hover:bg-gray-100 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                  <ImageIcon size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900">
                    {posts?.filter((p) => p.image).length || 0}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    With Images
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 transition-all hover:bg-gray-100 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white">
                  <Search size={24} />
                </div>
                <div className="flex-1">
                  <div className="text-2xl font-bold text-gray-900">
                    {filteredPosts.length}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    Showing
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Posts Grid Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24 px-8 bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-lg mx-auto"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl flex items-center justify-center text-gray-400 mx-auto mb-8">
                <MessageSquare size={64} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {searchTerm ? "No posts match your search" : "No posts yet"}
              </h3>
              <p className="text-lg text-gray-500 leading-relaxed mb-8">
                {searchTerm
                  ? "Try adjusting your search terms or browse all posts"
                  : "Be the first to share your thoughts and start the conversation!"}
              </p>
              {!searchTerm && (
                <Link
                  to="/posts/new"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold text-base no-underline transition-all hover:from-blue-600 hover:to-blue-700 hover:-translate-y-1 hover:shadow-xl shadow-lg"
                >
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
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 border border-gray-200"
                >
                  <PostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Load More Section */}
      {filteredPosts.length > 0 && filteredPosts.length >= 12 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-8">
            <button className="block mx-auto px-8 py-4 bg-gray-100 text-gray-700 border-2 border-gray-300 rounded-full font-semibold text-base cursor-pointer transition-all hover:bg-gray-200 hover:border-gray-400 hover:-translate-y-1">
              Load More Posts
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Posts;
