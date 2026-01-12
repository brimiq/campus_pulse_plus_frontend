import React from 'react';
import useFetchPosts from '../hooks/useFetchPosts';
import PostCard from '../components/posts/PostCard';

const HomeFeed = () => {
  const { posts, loading, error } = useFetchPosts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="feed-grid">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default HomeFeed;