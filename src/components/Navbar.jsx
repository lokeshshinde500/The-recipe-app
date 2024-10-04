import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully.", {
      onClose: () => {
        navigate("/");
      }
    });
  };

  return (
    <>
      <header className="bg-yellow-400 p-4 shadow-lg sticky top-0 left-0">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Logo" className="h-12 mr-3" />
            <h1 className="text-2xl font-bold text-white">Recipe Heaven</h1>
          </div>
          <nav className="space-x-4">
            {token ? (
              <>
                <Link
                  to="/home"
                  className="text-white hover:text-orange-500 transition"
                >
                  Home
                </Link>
                <Link
                  to="/add"
                  className="text-white hover:text-orange-500 transition"
                >
                  Add Recipes
                </Link>
                <Link
                  onClick={handleLogout}
                  className="text-white  hover:bg-orange-700 bg-orange-600 p-2 rounded-md transition"
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-white hover:bg-orange-700 bg-orange-600 p-2 rounded-md transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-white  hover:bg-orange-700 bg-orange-600 p-2 rounded-md transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}

export default Navbar;
