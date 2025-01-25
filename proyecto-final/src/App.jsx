import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import Navbar from "./components/navbar/Navbar";
import Catalog from "./pages/Catalog";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import { ProductsProvider } from "./context/ProductsContext"; // 👈 Contexto de productos
import { CartProvider } from "./context/CartContext"; // 👈 Contexto de carrito

import "./App.css";

function App() {
  return (
    <ProductsProvider>
      <CartProvider> {/* 👈 Ahora el carrito está disponible en toda la app */}
        <Router>
          <Navbar />
          <div className="app-content">
            <Routes>
              {/* Página de inicio */}
              <Route
                path="/"
                element={
                  <h1 style={{ textAlign: "center", marginTop: "20px" }}>
                    ¡Bienvenido a nuestra tienda!
                  </h1>
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
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;




