import React from 'react';
import { Calendar, MessageSquare, Image as ImageIcon } from 'lucide-react';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post-card">
      {/* Image Section */}
      {post.image && (
        <div className="post-image-container">
          <img
            src={post.image}
            alt="Post content"
            className="post-image"
            loading="lazy"
          />
          <div className="post-image-overlay">
            <div className="post-image-badge">
              <ImageIcon size={16} />
            </div>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="post-content">
        <div className="post-text-section">
          <p className="post-text">{post.content}</p>
        </div>

        {/* Meta Information */}
        <div className="post-meta">
          <div className="post-meta-item">
            <MessageSquare size={16} className="post-meta-icon" />
            <span className="post-meta-label">Post</span>
          </div>

          <div className="post-meta-item">
            <Calendar size={16} className="post-meta-icon" />
            <div className="post-date-info">
              <span className="post-date">{formatDate(post.created_at)}</span>
              <span className="post-time">{formatTime(post.created_at)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;