import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import AddRecipe from "../pages/AddRecipe";
import RecipePage from "../pages/RecipePage";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../pages/NotFound";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
        <Route
          path="/add"
          element={
            <PrivateRoutes>
              <AddRecipe />
            </PrivateRoutes>
          }
        />
        <Route
          path="/view/:id"
          element={
            <PrivateRoutes>
              <RecipePage />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </>
  );
}

export default AllRoutes;
