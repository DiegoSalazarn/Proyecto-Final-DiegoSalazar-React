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
      const filtered = products.filter(
        (product) => product.category.toLowerCase() === categoryId.toLowerCase()
      );
      console.log(`📂 Productos filtrados para ${categoryId}:`, filtered);
      setFilteredProducts(filtered);
    }
  }, [categoryId, products]);

  return (
    <div className="container mt-4">
      <h2 className="text-center">{greeting}</h2>
      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="col d-flex align-items-stretch">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-center">No hay productos disponibles en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ItemListContainer;




