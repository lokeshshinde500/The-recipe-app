import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <AllRoutes />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
