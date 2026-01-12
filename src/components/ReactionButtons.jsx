import { useState } from 'react';
import './ReactionButtons.css';

function ReactionButtons({ postId, currentUser, initialUserReaction = null }) {
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
        const response = await fetch(
          `http://localhost:5000/api/reactions/post/${postId}/user/${currentUser.id}`,
          { 
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to remove reaction');
        }

        setUserReaction(null);
        console.log(`Removed ${reactionType} from post ${postId}`);
      } else {
        // ADD or UPDATE reaction
        const response = await fetch('http://localhost:5000/api/reactions', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify({ 
            post_id: postId, 
            user_id: currentUser.id,
            reaction_type: reactionType 
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update reaction');
        }

        const data = await response.json();
        setUserReaction(reactionType);
        console.log(`Added/Updated ${reactionType} to post ${postId}`, data);
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
      alert('Failed to update reaction. Please try again.');
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
        title={userReaction === 'like' ? 'Remove like' : 'Like this post'}
      >
        👍 Like
      </button>

      <button
        className={`reaction-btn dislike-btn ${userReaction === 'dislike' ? 'active' : ''}`}
        onClick={() => handleReaction('dislike')}
        disabled={isLoading}
        title={userReaction === 'dislike' ? 'Remove dislike' : 'Dislike this post'}
      >
        👎 Dislike
      </button>
    </div>
  );
}

export default ReactionButtons;