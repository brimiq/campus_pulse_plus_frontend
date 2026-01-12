import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const content = watch("content", "");
  const maxLength = 150;

  const onSubmit = async (data) => {
    if (!data.content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: data.content,
          user_id: 1, // Assuming logged-in user ID
          category_id: parseInt(data.category_id),
        }),
      });

      if (response.ok) {
        toast.success("Post created successfully!");
        navigate("/home");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Failed to create post");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Toaster />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="create-post-form w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Post
        </h2>

        <div className="mb-4">
          <textarea
            {...register("content", { required: true, maxLength })}
            className="post-textarea"
            rows="4"
            placeholder="What's on your mind?"
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {content.length}/{maxLength}
          </div>
          {errors.content && (
            <p className="text-red-500 text-sm mt-1">
              Content is required and must be under 150 characters
            </p>
          )}
        </div>

        <div className="mb-6">
          <input
            {...register("category_id", { required: true })}
            type="number"
            className="w-full p-3 bg-gray-50/50 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Category ID"
          />
          {errors.category_id && (
            <p className="text-red-500 text-sm mt-1">Category ID is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-2xl transition duration-300"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
