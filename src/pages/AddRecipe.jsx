import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    description: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const { title, ingredients, description, image } = formData;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(token);
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", title);
    data.append("ingredients", ingredients);
    data.append("description", description);
    if (image) {
      data.append("image", image);
    }

    try {
      const response = await axios.post(
        "https://the-recipe-app-backend-1.onrender.com/api/recipe",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(response.data.message);
    } finally {
      setLoading(false);
      setFormData({
        title: "",
        ingredients: "",
        description: "",
        image: null,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="mt-10  bg-white w-4/12 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-600">
          Add Recipe
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="ingredients">
              Ingredients
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={ingredients}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-yellow-500"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-yellow-500"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="image">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              accept="image/*"
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-yellow-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-white p-2 rounded w-full hover:bg-yellow-600"
          >
            {loading ? "Loading..." : "Add Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
