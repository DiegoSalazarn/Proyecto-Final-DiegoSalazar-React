import React, { useContext } from "react";
import "./CartSidebar.css";
import Swal from "sweetalert2";
import { CartContext } from "../../context/CartContext";

const CartSidebar = ({ isOpen, toggleCart }) => {
  const { cart, setCart, updateQuantity } = useContext(CartContext);

  const clearCart = () => {
    setCart([]); // Vaciar carrito
  };

  const MAX_UNITS_PER_PRODUCT = 4;
  const MIN_UNITS_PER_PRODUCT = 1;

  const handleIncreaseQuantity = (item) => {
    if (item.quantity >= MAX_UNITS_PER_PRODUCT) {
      Swal.fire({
        title: "Límite alcanzado ⚠️",
        text: `No puedes agregar más de ${MAX_UNITS_PER_PRODUCT} unidades de "${item.name}".`,
        icon: "warning",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
        timer: 2000,
      });
    } else {
      updateQuantity(item.id, 1);
    }
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity <= MIN_UNITS_PER_PRODUCT) {
      Swal.fire({
        title: "Cantidad mínima alcanzada ⚠️",
        text: `No puedes reducir a menos de ${MIN_UNITS_PER_PRODUCT} unidad de "${item.name}".`,
        icon: "warning",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
        timer: 2000,
      });
    } else {
      updateQuantity(item.id, -1);
    }
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleCart}>✖</button>
      <h2>🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-info">
                <p>{item.name}</p>
                <p>Precio: ${item.price * item.quantity}</p>
                <div className="quantity-controls">
                  <button className="btn btn-secondary" onClick={() => handleDecreaseQuantity(item)}>
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="btn btn-secondary" onClick={() => handleIncreaseQuantity(item)}>
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="btn btn-danger w-100 mt-3" onClick={clearCart}>
            Vaciar Carrito 🗑
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;







