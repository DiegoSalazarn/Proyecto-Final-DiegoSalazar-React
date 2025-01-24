import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products from '../products';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="product-detail">

      <img src={product.image} alt={product.name} />

      <div className="info">
        <h2>{product.name}</h2>
        <p className="price">Precio: ${product.price}</p>
        <p className="category">Categoría: {product.category}</p>
      </div>

      <button onClick={() => navigate(-1)}>Volver</button>
    </div>
  );
}

export default ProductDetail;

