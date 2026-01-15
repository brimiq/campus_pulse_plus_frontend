import { useState, useEffect } from 'react';

function ReactionCounter({ postId, initialLikes = 0, initialDislikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReactionCounts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/reactions/post/${postId}/counts`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reaction counts');
        }
        
        const data = await response.json();
        setLikes(data.likes);
        setDislikes(data.dislikes);
      } catch (error) {
        console.error('Error fetching reaction counts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchReactionCounts();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">⏳</span>
          <span className="text-sm font-medium text-gray-500">...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
        <span className="text-lg">👍</span>
        <span className="text-sm font-bold text-blue-600">{likes}</span>
      </div>

      <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
        <span className="text-lg">👎</span>
        <span className="text-sm font-bold text-red-600">{dislikes}</span>
      </div>
    </div>
  );
}

export default ReactionCounter;