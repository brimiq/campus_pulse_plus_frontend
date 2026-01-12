import { useState, useEffect } from 'react';
import './ReactionCounter.css';

function ReactionCounter({ postId, initialLikes = 0, initialDislikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);

  // This will fetch real counts from backend later
  useEffect(() => {
    const fetchReactionCounts = async () => {
      try {
        // const response = await fetch(`/api/posts/${postId}/reactions`);
        // const data = await response.json();
        // setLikes(data.likes);
        // setDislikes(data.dislikes);
        console.log(`Fetching reaction counts for post ${postId}`);
      } catch (error) {
        console.error('Error fetching reaction counts:', error);
      }
    };

    // Uncomment when backend is ready
    // fetchReactionCounts();
  }, [postId]);

  return (
    <div className="reaction-counter">
      <div className="reaction-count like-count">
        <span className="emoji">👍</span>
        <span className="count">{likes}</span>
      </div>

      <div className="reaction-count dislike-count">
        <span className="emoji">👎</span>
        <span className="count">{dislikes}</span>
      </div>
    </div>
  );
}

export default ReactionCounter;