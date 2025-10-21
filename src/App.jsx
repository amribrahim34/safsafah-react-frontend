import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CatalogPage from "./pages/CatalogPage";
import SkinCareQuize from "./pages/SkinCareQuize";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/quize" element={<SkinCareQuize />} />
        {/* <Route path="/product/:id" element={<Product />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App
