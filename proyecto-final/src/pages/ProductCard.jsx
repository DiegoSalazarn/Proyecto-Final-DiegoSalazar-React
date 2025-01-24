import React from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">Precio: ${product.price}</p>
        <Link to={`/product/${product.id}`} className="btn btn-primary">
          Ver detalles
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;


