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
    examples: "+2 posts"
  },
  {
    name: "Tech Issues",
    icon: MessageSquare,
    description: "WiFi problems, computer labs, online systems",
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-50",
    examples: "+1 post"
  },
  {
    name: "Safety",
    icon: Shield,
    description: "Campus security, emergency concerns, safety protocols",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    examples: "Active"
  },
  {
    name: "Housing",
    icon: Home,
    description: "Room assignments, maintenance requests, housing policies",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    examples: "Popular"
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
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-background">
          <img
            src="https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=1200&auto=format&fit=crop"
            alt="Campus Life"
            className="hero-background"
            loading="eager"
          />
        </div>
        <div className="hero-gradient-scrim"></div>
        <div className="hero-light-leak"></div>
        <div className="hero-noise"></div>

        <div className="hero-content">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="hero-badge"
          >
            Campus Pulse - Student Voice Platform
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="hero-headline"
          >
            Your Voice <br />
            <span className="gradient-text">Matters Here</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="hero-subtitle"
          >
            Share campus issues, connect with students, and drive positive
            change anonymously and securely.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="minimal-search"
          >
            <Link to="/posts/new" className="hero-cta-button">
              Share Your Voice <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories-section">
        <div className="container">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Explore Topics</h2>
            <p className="section-subtitle">
              Find posts about the issues that matter to you
            </p>
          </motion.div>

          <div className="categories-grid">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="simple-category-card"
                onClick={() => navigate("/posts")}
              >
                <div className="simple-category-content">
                  <h3 className="simple-category-title">{category.name}</h3>
                  <p className="simple-category-description">{category.description}</p>
                  <div className="simple-category-badge">{category.examples}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED POSTS SECTION */}
      <section className="venues-section">
        <div className="container relative z-10">
          <div className="section-header-flex">
            <div>
              <h2 className="section-title">Recent Posts</h2>
              <p className="section-subtitle">
                Latest voices from the campus community
              </p>
            </div>
            <Link to="/posts" className="view-all-venues-btn">
              View All Posts <ArrowRight size={18} />
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="venues-grid"
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
              posts.slice(0, 6).map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={fadeInUp}
                  className="venue-card"
                >
                  <PostCard post={post} />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* WHY CAMPUS PULSE SECTION */}
      <section className="why-us-section">
        <div className="container">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Why Campus Pulse?</h2>
            <p className="section-subtitle">
              A safe space for student voices to be heard and acted upon
            </p>
          </motion.div>

          <div className="why-us-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="why-us-large"
            >
              <div className="why-us-large-content">
                <div className="why-us-icon">
                  <Shield size={28} />
                </div>
                <h3 className="why-us-title">Anonymous & Secure</h3>
                <p className="why-us-description">
                  Share your thoughts without fear. Our platform ensures your
                  privacy while connecting you with the campus community.
                </p>
                <ul className="why-us-checklist">
                  <li className="why-us-check">
                    <CheckCircle className="why-us-check-icon" size={20} />
                    Complete anonymity
                  </li>
                  <li className="why-us-check">
                    <CheckCircle className="why-us-check-icon" size={20} />
                    Secure data handling
                  </li>
                  <li className="why-us-check">
                    <CheckCircle className="why-us-check-icon" size={20} />
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
              className="why-us-card"
            >
              <Clock className="why-us-small-icon" size={36} />
              <h3 className="why-us-small-title">Real-time Updates</h3>
              <p className="why-us-small-description">
                Stay informed about campus issues and see how they're being
                addressed.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="why-us-card"
            >
              <Users className="why-us-small-icon" size={36} />
              <h3 className="why-us-small-title">Community Impact</h3>
              <p className="why-us-small-description">
                Your voice contributes to positive change across campus.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="why-us-social"
            >
              <div className="why-us-social-content">
                <h3 className="why-us-social-title">Join 500+ Students</h3>
                <p className="why-us-social-description">
                  Be part of the growing community making campus better.
                </p>
              </div>
              <div className="why-us-avatars">
                <div className="why-us-avatar">👨‍🎓</div>
                <div className="why-us-avatar">👩‍🎓</div>
                <div className="why-us-avatar">👨‍🎓</div>
                <div className="why-us-avatar-extra">+500</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Simple steps to share your voice and drive change
            </p>
          </div>

          <div className="steps-grid">
            <div className="how-it-works-connector"></div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="step-card"
            >
              <div className="step-icon">
                <MessageSquare className="text-blue-600" size={36} />
                <div className="step-number">1</div>
              </div>
              <h3 className="step-title">Share Your Thoughts</h3>
              <p className="step-description">
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
              className="step-card"
            >
              <div className="step-icon">
                <Users className="text-blue-600" size={36} />
                <div className="step-number">2</div>
              </div>
              <h3 className="step-title">Connect with Community</h3>
              <p className="step-description">
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
              className="step-card"
            >
              <div className="step-icon">
                <TrendingUp className="text-blue-600" size={36} />
                <div className="step-number">3</div>
              </div>
              <h3 className="step-title">Drive Positive Change</h3>
              <p className="step-description">
                Together we can identify issues and work towards solutions that
                improve campus life for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="cta-section">
        <div className="cta-noise"></div>
        <div className="cta-light-1"></div>
        <div className="cta-light-2"></div>

        <div className="container">
          <div className="cta-content">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="cta-title">
                Ready to make your <br />
                <span className="gradient-text">voice heard?</span>
              </h2>
              <p className="cta-subtitle">
                Join the conversation. Share your campus experience and help
                create a better environment for all students.
              </p>
              <div className="cta-buttons">
                <Link to="/posts/new" className="cta-primary">
                  Start Posting
                </Link>
                <div className="cta-secondary">
                  <Search size={20} />
                  Browse Posts
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeFeed;
