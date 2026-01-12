import { useState } from 'react';
import './ReactionButtons.css';

function ReactionButtons({ postId, currentUser, initialUserReaction = null }) {
  // Track user's current reaction
  const [userReaction, setUserReaction] = useState(initialUserReaction);
  const [isLoading, setIsLoading] = useState(false);

  const handleReaction = async (reactionType) => {
    if (!currentUser) {
      alert('Please log in to react to posts');
      return;
    }

    setIsLoading(true);

    try {
      // If clicking same reaction, remove it
      if (userReaction === reactionType) {
        // DELETE request - will connect to backend later
        console.log(`Removing ${reactionType} from post ${postId}`);
        // await fetch(`/api/reactions/${postId}`, { method: 'DELETE' });
        setUserReaction(null);
      } else {
        // ADD or UPDATE reaction
        console.log(`Adding/Updating ${reactionType} to post ${postId}`);
        // await fetch(`/api/reactions`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ 
        //     post_id: postId, 
        //     user_id: currentUser.id,
        //     reaction_type: reactionType 
        //   })
        // });
        setUserReaction(reactionType);
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
      alert('Failed to update reaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reaction-buttons">
      <button
        className={`reaction-btn like-btn ${userReaction === 'like' ? 'active' : ''}`}
        onClick={() => handleReaction('like')}
        disabled={isLoading}
      >
        👍 Like
      </button>

      <button
        className={`reaction-btn dislike-btn ${userReaction === 'dislike' ? 'active' : ''}`}
        onClick={() => handleReaction('dislike')}
        disabled={isLoading}
      >
        👎 Dislike
      </button>
    </div>
  );
}

export default ReactionButtons;