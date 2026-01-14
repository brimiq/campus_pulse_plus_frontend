import { useState, useEffect } from "react";

function ReactionCounter({ postId, initialLikes = 0, initialDislikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReactionCounts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/api/reactions/post/${postId}/counts`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reaction counts");
        }

        const data = await response.json();
        setLikes(data.likes);
        setDislikes(data.dislikes);
      } catch (error) {
        console.error("Error fetching reaction counts:", error);
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
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>⏳ Loading reactions...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6 text-sm text-gray-700">
      <div className="flex items-center gap-1">
        <span>👍</span>
        <span className="font-medium">{likes}</span>
      </div>

      <div className="flex items-center gap-1">
        <span>👎</span>
        <span className="font-medium">{dislikes}</span>
      </div>
    </div>
  );
}

export default ReactionCounter;
