import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow">
      <img
        src={product.image || "/images/default-placeholder.png"}
        className="card-img-top"
        alt={product.name}
        style={{ height: "200px", objectFit: "cover" }} // 👈 Todas las imágenes del mismo tamaño
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Precio: ${product.price}</p>
        <div className="mt-auto">
          <Link to={`/product/${product.id}`} className="btn btn-primary w-100">
            Ver detalles
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;

