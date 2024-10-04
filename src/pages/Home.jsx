import React, { useEffect, useState } from "react";
import Recipe from "../components/Recipe";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://the-recipe-app-backend-1.onrender.com/api/recipe",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setRecipes(response.data.recipes);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/")
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    setLoading(true);
    const response = await axios.delete(
      `https://the-recipe-app-backend-1.onrender.com/api/recipe/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    const deleteRecipe = recipes.filter((v) => v._id !== id);
    setRecipes(deleteRecipe);
    setLoading(false);
  };

  const onUpdate = (data) => {
    fetchData();
  };

  const onView = (id) => {
    navigate(`/view/${id}`);
  };

  if (loading) {
    return (
      <h1 className="mt-10 text-center text-4xl text-green-500">
        Please,Wait..
      </h1>
    );
  }

  if (recipes.length <= 0) {
    return (
      <>
        <div className="flex flex-col items-center">
          <h1 className="mt-10 text-center text-4xl text-green-500">
            No recipes found!
          </h1>
          <Link
            to="/add"
            className="mt-10 text-center text-4xl bg-yellow-500 text-red-600 rounded-md p-4 shadow-lg hover:bg-yellow-400 transition duration-300"
          >
            Add New Recipe
          </Link>
        </div>
      </>
    );
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <Recipe
          key={recipe._id}
          recipe={recipe}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onView={onView}
        />
      ))}
    </div>
  );
}

export default Home;
