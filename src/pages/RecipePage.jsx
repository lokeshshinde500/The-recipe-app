import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getRecipe = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://the-recipe-app-backend-1.onrender.com/api/recipe/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRecipe(response.data.recipe);
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipe();
  }, []);

  if (loading) {
    return (
      <h1 className="mt-10 text-center text-4xl text-green-500">
        Please,Wait..
      </h1>
    );
  }

  return (
    <>
      <section className="section-view-recipe">
        <div className="container mx-auto p-6">
          <button
            onClick={() => {
              navigate("/home");
            }}
            className="mb-4 bg-yellow-300 hover:bg-yellow-400 text-white py-2 px-4 rounded"
          >
            Back
          </button>
          <h1 className="text-4xl font-bold mb-4 text-yellow-700 text-left">
            {recipe.title}
          </h1>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="text-center w-1/2 h-1/2 object-cover rounded-lg mb-4"
          />
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
            <div className="flex flex-wrap">
              {recipe.ingredients?.map((ingredient, index) => (
                <span
                  key={index}
                  className="bg-yellow-200 text-yellow-700 rounded-full px-3 py-1 m-1"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Full Recipes</h2>
            <p className="text-lg text-gray-700">{recipe.description}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default RecipePage;
