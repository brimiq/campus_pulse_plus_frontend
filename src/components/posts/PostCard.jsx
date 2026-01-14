import React from 'react';

const CategoryBadge = ({ categoryId }) => (
  <span className="category-badge">
    Category {categoryId}
  </span>
);

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  return (
    <div className="post-card">
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full h-48 object-cover rounded-2xl mb-4"
          style={{
            boxShadow: "inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.8)",
          }}
        />
      )}
      <p>{post.content}</p>
      <CategoryBadge categoryId={post.category_id} />
      <div className="post-meta">
        {formatDate(post.created_at)}
      </div>
    </div>
  );
};

export default PostCard;