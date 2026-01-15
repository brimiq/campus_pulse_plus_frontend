import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MessageSquare,
  Users,
  TrendingUp,
  ArrowRight,
  Heart,
  Shield,
  Clock,
  Award,
  BookOpen,
  Building,
  Calendar,
  Coffee,
  CheckCircle,
  Search,
  Home,
} from "lucide-react";
import useFetchPosts from "../hooks/useFetchPosts";
import PostCard from "../components/posts/PostCard";

// Campus categories/topics
const categories = [
  {
    name: "Facilities & Maintenance",
    icon: Building,
    description: "Dorm showers, recycling bins, building repairs",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    examples: "+2 posts",
  },
  {
    name: "Tech Issues",
    icon: MessageSquare,
    description: "WiFi problems, computer labs, online systems",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    examples: "+1 post",
  },
  {
    name: "Safety",
    icon: Shield,
    description: "Campus security, emergency concerns, safety protocols",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    examples: "Active",
  },
  {
    name: "Housing",
    icon: Home,
    description: "Room assignments, maintenance requests, housing policies",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    examples: "Popular",
  },
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const HomeFeed = () => {
  const { posts, loading, error } = useFetchPosts();
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full min-h-screen font-sans">
      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center z-10">
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=1200&auto=format&fit=crop"
            alt="Campus Life"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90 z-10"></div>
        <div className="absolute top-0 right-0 w-full h-1/2 bg-gradient-to-b from-blue-500/20 to-transparent mix-blend-overlay z-10"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-20 pointer-events-none"></div>

        <div className="relative z-30 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto pt-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="mb-8 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/90 text-sm font-bold uppercase tracking-wider shadow-lg"
          >
            Campus Pulse - Student Voice Platform
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-black text-white mb-8 text-shadow-lg leading-tight"
          >
            Your Voice <br />
            <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent font-extrabold">
              Matters Here
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 font-medium leading-relaxed max-w-2xl mb-12"
          >
            Share campus issues, connect with students, and drive positive
            change anonymously and securely.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/posts/new"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold text-lg transition-all hover:from-blue-600 hover:to-blue-700 hover:-translate-y-1 hover:shadow-2xl shadow-lg"
            >
              Share Your Voice <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="py-24 bg-white relative z-20 -mt-8 rounded-t-3xl shadow-[-20px_0_40px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Explore Topics
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find posts about the issues that matter to you
            </p>
          </motion.div>

          <div className="flex gap-6 overflow-x-auto pb-8 px-4 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-64 h-48 bg-white rounded-2xl p-6 shadow-md border border-gray-100 transition-all hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => navigate("/posts")}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold w-fit">
                  {category.examples}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED POSTS SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="flex justify-between items-end mb-16 gap-8 flex-wrap">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">
                Recent Posts
              </h2>
              <p className="text-lg text-gray-600">
                Latest voices from the campus community
              </p>
            </div>
            <Link
              to="/posts"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-bold transition-all hover:from-blue-600 hover:to-blue-700 hover:-translate-y-1 hover:shadow-xl shadow-lg"
            >
              View All Posts <ArrowRight size={18} />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {loading ? (
              <div className="col-span-full text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading posts...</p>
              </div>
            ) : error ? (
              <div className="col-span-full text-center py-12">
                <MessageSquare
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Posts Unavailable
                </h3>
                <p className="text-gray-500 mb-6">
                  We're working to connect you with the latest posts.
                </p>
                <Link
                  to="/posts/new"
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Share Your Thoughts
                </Link>
              </div>
            ) : posts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <MessageSquare
                  size={48}
                  className="mx-auto text-gray-400 mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Be the first to share your thoughts!
                </p>
                <Link
                  to="/posts/new"
                  className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  Create First Post
                </Link>
              </div>
            ) : (
              posts.slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={fadeInUp}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2 border border-gray-200"
                >
                  <PostCard post={post} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* WHY CAMPUS PULSE SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Why Campus Pulse?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A safe space for student voices to be heard and acted upon
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[600px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-1 lg:row-span-2 bg-red-50 rounded-3xl p-8 flex flex-col justify-between border border-red-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Shield size={28} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Anonymous & Secure
                </h3>
                <p className="text-gray-600 leading-relaxed mb-8 max-w-sm">
                  Share your thoughts without fear. Our platform ensures your
                  privacy while connecting you with the campus community.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle
                      className="text-green-500 flex-shrink-0"
                      size={20}
                    />
                    Complete anonymity
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle
                      className="text-green-500 flex-shrink-0"
                      size={20}
                    />
                    Secure data handling
                  </li>
                  <li className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle
                      className="text-green-500 flex-shrink-0"
                      size={20}
                    />
                    Community-driven solutions
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100 transition-all hover:shadow-lg"
            >
              <Clock className="w-12 h-12 text-blue-500 mb-6" size={36} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Real-time Updates
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Stay informed about campus issues and see how they're being
                addressed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-gray-50 rounded-3xl p-8 border border-gray-100 transition-all hover:shadow-lg"
            >
              <Users className="w-12 h-12 text-blue-500 mb-6" size={36} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Impact
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your voice contributes to positive change across campus.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-gray-900 text-white rounded-3xl p-8 flex items-center justify-between gap-8 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light"></div>
              <div className="relative z-10 flex-1">
                <h3 className="text-2xl font-bold mb-2">Join 500+ Students</h3>
                <p className="text-gray-300 leading-relaxed">
                  Be part of the growing community making campus better.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-[-0.5rem]">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg border-3 border-gray-900">
                  👨‍🎓
                </div>
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg border-3 border-gray-900">
                  👩‍🎓
                </div>
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-lg border-3 border-gray-900">
                  👨‍🎓
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold border-3 border-gray-900">
                  +500
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to share your voice and drive change
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-2/3 h-0.5 bg-blue-200 hidden md:block"></div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-white border-4 border-blue-200 rounded-full flex items-center justify-center mb-8 shadow-lg relative">
                <MessageSquare className="text-blue-600" size={36} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Share Your Thoughts
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                Create a post about any campus issue, suggestion, or experience.
                Stay anonymous if you prefer.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-white border-4 border-blue-200 rounded-full flex items-center justify-center mb-8 shadow-lg relative">
                <Users className="text-blue-600" size={36} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Connect with Community
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                See what other students are saying and find common issues
                affecting the campus community.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-white border-4 border-blue-200 rounded-full flex items-center justify-center mb-8 shadow-lg relative">
                <TrendingUp className="text-blue-600" size={36} />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-sky-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Drive Positive Change
              </h3>
              <p className="text-gray-600 leading-relaxed max-w-xs">
                Together we can identify issues and work towards solutions that
                improve campus life for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 bg-gradient-to-r from-blue-500 to-sky-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-yellow-300/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-4xl mx-auto px-8 text-center relative z-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-black text-white mb-8 leading-tight">
              Ready to make your <br />
              <span className="bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent font-extrabold">
                voice heard?
              </span>
            </h2>
            <p className="text-xl text-white/90 font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
              Join the conversation. Share your campus experience and help
              create a better environment for all students.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/posts/new"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-black text-lg transition-all hover:-translate-y-1 hover:shadow-2xl shadow-lg"
              >
                Start Posting
              </Link>
              <div className="flex items-center gap-2 text-white font-bold text-lg">
                <Search size={20} />
                Browse Posts
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomeFeed;
