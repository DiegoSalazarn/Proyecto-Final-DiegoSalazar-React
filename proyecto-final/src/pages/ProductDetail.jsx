import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === productId);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAddedToCart(true);

    Swal.fire({
      title: "Producto agregado 🛒",
      text: `Has añadido "${product.name}" al carrito.`,
      icon: "success",
      confirmButtonColor: "#28a745",
      confirmButtonText: "OK",
      timer: 2000,
    });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>Precio: ${product.price}</p>
          <p>Categoría: {product.category}</p>
          <p>Stock disponible: {product.stock}</p>

          {!addedToCart ? (
            <button className="btn btn-success w-100 mb-2" onClick={handleAddToCart}>
              Agregar al carrito 🛒
            </button>
          ) : (
            <p className="text-success">Producto agregado al carrito </p>
          )}

          <button className="btn btn-secondary w-100" onClick={() => navigate(`/category/${product.category}`)}>
            ← Volver a {product.category}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;






