import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://the-recipe-app-backend-1.onrender.com/api/auth/register",
        formData
      );
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    } finally {
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-600">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-yellow-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
              className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:border-yellow-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-white p-2 rounded w-full hover:bg-yellow-600"
          >
            {loading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
