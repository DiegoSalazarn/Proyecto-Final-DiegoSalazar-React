import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Navbar from "./components/navbar/Navbar";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import { ProductsProvider } from "./context/ProductsContext";

import "./App.css";

function App() {
  return (
    <ProductsProvider>
      <Router>
        <Navbar />

        <div className="app-content">
          <Routes>
            {/* Página de inicio */}
            <Route
              path="/"
              element={
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <h1>¡Bienvenido a nuestra tienda!</h1>
                  <ItemListContainer greeting="Explora nuestras categorías y encuentra lo que necesitas." />
                </div>
              }
            />

            {/* Página de categorías */}
            <Route path="/category/:categoryId" element={<Catalog />} />

            {/* Página de detalle de producto */}
            <Route path="/product/:productId" element={<ProductDetail />} />

            {/* Ruta para la página 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ProductsProvider>
  );
}

export default App;


