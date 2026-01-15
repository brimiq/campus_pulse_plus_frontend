import { useState } from 'react';

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
          `${import.meta.env.VITE_API_URL}/reactions/post/${postId}/user/${currentUser.id}`,
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
      } else {
        // ADD or UPDATE reaction
        const response = await fetch(`${import.meta.env.VITE_API_URL}/reactions`, {
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

        setUserReaction(reactionType);
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
      alert('Failed to update reaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
          ${userReaction === 'like' 
            ? 'bg-blue-600 border-blue-600 text-white' 
            : 'bg-white border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        onClick={() => handleReaction('like')}
        disabled={isLoading}
      >
        <span className="text-lg">👍</span>
        <span className="text-sm font-medium">Like</span>
      </button>

      <button
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all
          ${userReaction === 'dislike' 
            ? 'bg-red-600 border-red-600 text-white' 
            : 'bg-white border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
        onClick={() => handleReaction('dislike')}
        disabled={isLoading}
      >
        <span className="text-lg">👎</span>
        <span className="text-sm font-medium">Dislike</span>
      </button>
    </div>
  );
}

export default ReactionButtons;
