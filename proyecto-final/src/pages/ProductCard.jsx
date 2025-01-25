import React from "react";
import "./ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card product-card">
      <img
        src={product.image || "/images/default-placeholder.png"} // 👈 Si no hay imagen, usa un placeholder
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Precio: ${product.price}</p>
        <div className="button-group">
          <Link to={`/product/${product.id}`} className="btn btn-primary">
            Ver detalles
          </Link>
          <button className="btn btn-success">Añadir al carrito</button> {/* 👈 Botón extra */}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;



