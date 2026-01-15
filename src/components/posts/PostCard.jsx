import React from "react";

const CategoryBadge = ({ categoryId }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white">
    Category {categoryId}
  </span>
);

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="p-6">
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="w-full h-48 object-cover rounded-2xl mb-4 shadow-lg"
        />
      )}
      <p className="text-gray-700 text-base leading-relaxed mb-4">
        {post.content}
      </p>
      <div className="flex items-center justify-between">
        <CategoryBadge categoryId={post.category_id} />
        <div className="text-sm text-gray-500">
          {formatDate(post.created_at)}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
