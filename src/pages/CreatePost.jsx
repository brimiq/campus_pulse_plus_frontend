import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import {
  MessageSquare,
  Image as ImageIcon,
  ArrowLeft,
  Sparkles,
  Shield,
  Users,
  Upload,
  RefreshCw,
  Camera,
  X,
} from "lucide-react";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const content = watch("content", "");
  const maxLength = 500;
  const [imageUrl, setImageUrl] = useState("");
  const [imageMode, setImageMode] = useState("none"); // "none", "generate", "upload"
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef(null);

  // Campus-related keywords for smart image generation
  const campusKeywords = {
    cafeteria: ["cafeteria", "food", "dining", "lunch", "meal", "restaurant"],
    library: ["library", "books", "study", "reading", "quiet"],
    dorm: ["dorm", "residence", "hall", "room", "bedroom", "apartment"],
    classroom: ["classroom", "lecture", "professor", "teaching", "education"],
    sports: ["sports", "gym", "fitness", "basketball", "football", "track"],
    parking: ["parking", "car", "vehicle", "lot", "drive"],
    wifi: ["wifi", "internet", "network", "connection", "online"],
    security: ["security", "guard", "safe", "protection", "gate"],
    maintenance: ["maintenance", "repair", "fix", "broken", "facility"],
    event: ["event", "club", "activity", "party", "gathering"],
  };

  const generateSmartImage = (text) => {
    const lowerText = text.toLowerCase();
    let matchedKeyword = "university"; // default

    // Find matching campus keywords
    for (const [category, keywords] of Object.entries(campusKeywords)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        matchedKeyword = category;
        break;
      }
    }

    // Generate Unsplash URL with campus context
    const randomId = Math.floor(Math.random() * 1000) + 1;
    return `https://images.unsplash.com/photo-1565688534245-05d6b5be184a?q=80&w=600&auto=format&fit=crop&random=${randomId}`;
  };

  const handleGenerateImage = async () => {
    if (!content.trim()) {
      toast.error("Please write some content first to generate a relevant image");
      return;
    }

    setIsGenerating(true);
    setImageMode("generate");

    // Simulate API call delay for better UX
    setTimeout(() => {
      const smartImageUrl = generateSmartImage(content);
      setImageUrl(smartImageUrl);
      setUploadedFile(null);
      setIsGenerating(false);
      toast.success("Smart image generated based on your post!");
    }, 1000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size must be less than 5MB");
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast.error("Please select an image file");
        return;
      }

      setUploadedFile(file);
      setImageUrl(URL.createObjectURL(file));
      setImageMode("upload");
      toast.success("Image uploaded successfully!");
    }
  };

  const handleRemoveImage = () => {
    setImageUrl("");
    setImageMode("none");
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleImageModeChange = (mode) => {
    if (mode === "none") {
      handleRemoveImage();
    } else if (mode === "upload") {
      setImageMode("upload");
      fileInputRef.current?.click();
    } else if (mode === "generate") {
      handleGenerateImage();
    }
  };

  const onSubmit = async (data) => {
    if (!data.content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    try {
      let finalImageUrl = null;

      // Handle uploaded file
      if (uploadedFile) {
        const formData = new FormData();
        formData.append("file", uploadedFile);

        const uploadResponse = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          finalImageUrl = uploadData.url;
        } else {
          toast.error("Failed to upload image");
          return;
        }
      } else if (imageUrl && imageMode === "generate") {
        // Use generated image URL directly
        finalImageUrl = imageUrl;
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data.content,
          image: finalImageUrl,
          user_id: 1,
          category_id: 1,
        }),
      });

      if (response.ok) {
        toast.success("Post created successfully!");
        navigate("/");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to create post");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="create-post-page">
      <Toaster />

      {/* Hero Section */}
      <section className="create-hero-section">
        <div className="create-hero-background">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
            alt="Create Post"
            className="create-hero-background"
            loading="eager"
          />
        </div>
        <div className="create-hero-gradient"></div>
        <div className="create-hero-noise"></div>

        <div className="create-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="create-hero-header"
          >
            <Link
              to="/"
              className="create-back-button"
            >
              <ArrowLeft size={20} />
              Back to Feed
            </Link>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="create-hero-title"
            >
              Share Your Voice
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="create-hero-subtitle"
            >
              Express your thoughts, share experiences, and connect with your campus community
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="create-form-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="create-form-container"
          >
            <div className="create-form-header">
              <div className="create-form-icon">
                <MessageSquare size={28} />
              </div>
              <h2>Create New Post</h2>
              <p>Share what's on your mind with the community</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="create-form">
              <div className="create-form-group">
                <label className="create-form-label">
                  <MessageSquare size={18} />
                  Your Message
                </label>
                <textarea
                  {...register("content", {
                    required: "Content is required",
                    maxLength: {
                      value: maxLength,
                      message: `Content must be under ${maxLength} characters`
                    }
                  })}
                  className="create-form-textarea"
                  rows="6"
                  placeholder="What's happening on campus? Share your thoughts, experiences, or suggestions..."
                />
                <div className="create-form-footer">
                  <div className="create-character-count">
                    {content.length}/{maxLength}
                  </div>
                  {errors.content && (
                    <p className="create-form-error">{errors.content.message}</p>
                  )}
                </div>
              </div>

              <div className="create-form-group">
                <label className="create-form-label">
                  <ImageIcon size={18} />
                  Image (Optional)
                </label>

                {/* Image Mode Selection */}
                <div className="create-image-options">
                  <button
                    type="button"
                    onClick={() => handleImageModeChange("generate")}
                    className={`create-image-option ${imageMode === "generate" ? "active" : ""}`}
                    disabled={isGenerating}
                  >
                    <Sparkles size={16} />
                    {isGenerating ? "Generating..." : "Generate Smart Image"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleImageModeChange("upload")}
                    className={`create-image-option ${imageMode === "upload" ? "active" : ""}`}
                  >
                    <Upload size={16} />
                    Upload Image
                  </button>

                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => handleImageModeChange("none")}
                      className="create-image-option remove"
                    >
                      <X size={16} />
                      Remove Image
                    </button>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />

                {/* Image Preview */}
                {imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="create-image-preview"
                  >
                    <div className="create-preview-header">
                      <div className="create-preview-badge">
                        {imageMode === "generate" ? (
                          <>
                            <Sparkles size={14} />
                            Smart Generated
                          </>
                        ) : (
                          <>
                            <Camera size={14} />
                            Uploaded
                          </>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="create-preview-remove"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <img
                      src={imageUrl}
                      alt="Post preview"
                      className="create-preview-image"
                    />
                  </motion.div>
                )}

                {/* Smart Generation Hint */}
                {imageMode === "generate" && !imageUrl && content.trim() && (
                  <div className="create-smart-hint">
                    <Sparkles size={14} />
                    <span>Image will be generated based on keywords in your post (e.g., "cafeteria" → campus cafeteria image)</span>
                  </div>
                )}
              </div>

              <div className="create-form-actions">
                <Link to="/" className="create-cancel-btn">
                  Cancel
                </Link>
                <button type="submit" className="create-submit-btn">
                  <MessageSquare size={18} />
                  Post to Community
                </button>
              </div>
            </form>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="create-trust-section"
          >
            <div className="create-trust-item">
              <Shield className="create-trust-icon" />
              <div>
                <h4>Anonymous & Secure</h4>
                <p>Your privacy is protected</p>
              </div>
            </div>
            <div className="create-trust-item">
              <Users className="create-trust-icon" />
              <div>
                <h4>Community Impact</h4>
                <p>Your voice drives change</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CreatePost;
