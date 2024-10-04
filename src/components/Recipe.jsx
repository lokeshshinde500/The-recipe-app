import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Recipe = ({ recipe, onDelete, onUpdate, onView }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState(recipe.title);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(", "));
  const [description, setDescription] = useState(recipe.description);
  const [image, setImage] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("ingredients", ingredients.split(", "));
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.patch(
        `https://the-recipe-app-backend-1.onrender.com/api/recipe/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onUpdate(response.data.recipe);
      setIsModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between bg-yellow-100 p-4 rounded-lg shadow-md m-4">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-24 h-24 rounded-md object-cover"
      />
      <h3 className="flex-1 mx-4 text-xl font-semibold">{recipe.title}</h3>
      <div className="flex space-x-2">
        <button
          onClick={() => onView(recipe._id)}
          className="bg-yellow-300 hover:bg-yellow-400 text-white py-1 px-3 rounded"
        >
          View
        </button>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setId(recipe._id);
          }}
          className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(recipe._id)}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Update Recipe</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Ingredients
                </label>
                <input
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border rounded-md p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md"
              >
                {loading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-2 bg-gray-300 hover:bg-gray-400 text-black py-2 rounded-md"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipe;
