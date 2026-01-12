const CommentList = ({ comments }) => {
  return (
    <div className="mt-4">
      <h6>Comments ({comments.length})</h6>
      {comments.map((comment) => (
        <div key={comment.id} className="border-bottom py-2">
          <p className="mb-0">{comment.content}</p>
          <small className="text-muted">{new Date(comment.created_at).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
