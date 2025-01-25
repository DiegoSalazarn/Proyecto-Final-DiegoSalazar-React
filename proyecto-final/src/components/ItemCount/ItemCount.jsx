import React, { useState } from "react";

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increaseQuantity = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="item-count">
      <div className="count-controls">
        <button className="btn btn-secondary" onClick={decreaseQuantity} disabled={quantity <= 1}>-</button>
        <span className="quantity">{quantity}</span>
        <button className="btn btn-secondary" onClick={increaseQuantity} disabled={quantity >= stock}>+</button>
      </div>
      <button className="btn btn-primary mt-2 w-100" onClick={() => onAdd(quantity)} disabled={stock === 0}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
