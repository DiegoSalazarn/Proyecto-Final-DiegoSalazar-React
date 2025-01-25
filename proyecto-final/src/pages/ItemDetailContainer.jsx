import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import ItemCount from "../components/ItemCount/ItemCount";

const ItemDetailContainer = () => {
  const { productId } = useParams();
  const { products } = useContext(ProductsContext);
  const { addToCart } = useContext(CartContext);
  const product = products.find((p) => p.id === productId);
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const handleAddToCart = (quantity) => {
    addToCart(product, quantity);
    setAddedToCart(true);  // Ocultar ItemCount después de agregar
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
            <ItemCount stock={product.stock} initial={1} onAdd={handleAddToCart} />
          ) : (
            <p className="text-success">Producto agregado al carrito </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailContainer;

