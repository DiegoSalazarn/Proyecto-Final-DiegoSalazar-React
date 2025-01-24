import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard/ProductCard";

const validCategories = ["remeras", "pantalones", "buzos"];

function Catalog() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (!validCategories.includes(categoryId)) {
      navigate("/404");
      return;
    }

    // Filtrar productos por categoría desde el contexto
    const filtered = products.filter((product) => product.category === categoryId);
    setFilteredProducts(filtered);
  }, [categoryId, products, navigate]);

  return (
    <div>
      <h2>Catálogo de {categoryId}</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p>No hay productos en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Catalog;

