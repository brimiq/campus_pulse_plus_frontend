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
      <p>{post.content}</p>
      <CategoryBadge categoryId={post.category_id} />
      <div className="post-meta">
        {formatDate(post.created_at)}
      </div>
    </div>
  );
};

export default PostCard;