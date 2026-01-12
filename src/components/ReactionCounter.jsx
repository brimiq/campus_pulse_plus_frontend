import { useState, useEffect } from 'react';
import './ReactionCounter.css';

function ReactionCounter({ postId, initialLikes = 0, initialDislikes = 0 }) {
  const [likes, setLikes] = useState(initialLikes);
  const [dislikes, setDislikes] = useState(initialDislikes);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReactionCounts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/reactions/post/${postId}/counts`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reaction counts');
        }
        
        const data = await response.json();
        setLikes(data.likes);
        setDislikes(data.dislikes);
      } catch (error) {
        console.error('Error fetching reaction counts:', error);
        // Keep initial values on error
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
      <div className="reaction-counter">
        <div className="reaction-count">
          <span className="emoji">⏳</span>
          <span className="count">...</span>
        </div>
      </div>
    );
  }

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