import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/booking/:trainId"
          element={<Booking />}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;