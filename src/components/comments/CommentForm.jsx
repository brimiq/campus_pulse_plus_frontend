import { useForm } from "react-hook-form";
import axios from "axios";

const CommentForm = ({ postId, onCommentAdded }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post('/api/comments', {
        content: data.content,
        post_id: postId 
      });
      reset(); 
      onCommentAdded(); 
    } catch (err) {
      console.error("Could not post comment", err);
    }
  };

  return (
    <div className="comment-section">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("content", { required: "You can't post an empty comment!", maxLength: 150 })}
          placeholder="Add an anonymous comment..."
          className="form-control"
        />
        {errors.content && <p className="text-danger">{errors.content.message}</p>}
        <button type="submit" className="btn btn-primary mt-2">Submit Comment</button>
      </form>
    </div>
  );
};

export default CommentForm;
