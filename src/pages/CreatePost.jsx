import React, { useState } from "react";
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
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) {
        setImageUrl(data.secure_url);
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

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
          image: imageUrl,
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

        <div className="mb-6">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-3 bg-gray-50/50 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {uploading && <p className="text-blue-500 text-sm mt-1">Uploading image...</p>}
          {imageUrl && (
            <div className="mt-4">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-2xl shadow-inner"
                style={{
                  boxShadow: "inset 4px 4px 8px rgba(0, 0, 0, 0.1), inset -4px -4px 8px rgba(255, 255, 255, 0.8)",
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-2xl transition duration-300"
        >
          {uploading ? "Uploading..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
