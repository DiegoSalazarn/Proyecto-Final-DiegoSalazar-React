import "./ItemListContainer.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../../context/ProductsContext";
import ProductCard from "../ProductCard/ProductCard";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();
  const { products, loading } = useContext(ProductsContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      // Filtrar productos por categoría
      const filtered = products.filter((product) => product.category === categoryId);
      setFilteredProducts(filtered);
    }
  }, [categoryId, products]);

  return (
    <div className="container mt-4">
      <h2>{greeting}</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No hay productos en esta categoría.</p>
      )}
    </div>
  );
};

export default ItemListContainer;



