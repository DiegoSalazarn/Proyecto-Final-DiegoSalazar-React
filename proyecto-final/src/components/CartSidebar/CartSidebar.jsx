import React, { useContext, useState } from "react";
import "./CartSidebar.css";
import Swal from "sweetalert2";
import { CartContext } from "../../context/CartContext";
import { db } from "../../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const CartSidebar = ({ isOpen, toggleCart }) => {
  const { cart, setCart, updateQuantity } = useContext(CartContext);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyerInfo, setBuyerInfo] = useState({ name: "", email: "", phone: "" });

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

  const handleInputChange = (e) => {
    setBuyerInfo({ ...buyerInfo, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = async () => {
    if (!buyerInfo.name || !buyerInfo.email || !buyerInfo.phone) {
      Swal.fire({
        title: "Faltan datos ⚠️",
        text: "Por favor, completa todos los campos antes de confirmar la compra.",
        icon: "warning",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
      return;
    }

    const order = {
      buyer: buyerInfo,
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
      date: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), order);
      Swal.fire({
        title: "Compra Confirmada 🎉",
        html: `<p>Gracias por tu compra, <b>${buyerInfo.name}</b>!</p>
               <p>Tu número de orden es: <b>${docRef.id}</b></p>
               <p>Te enviaremos un resumen a <b>${buyerInfo.email}</b>.</p>`,
        icon: "success",
        confirmButtonColor: "#28a745",
        confirmButtonText: "OK",
      });

      setCart([]); // Vaciar carrito después de la compra
      setCheckoutOpen(false);
    } catch (error) {
      Swal.fire({
        title: "Error ❌",
        text: "Hubo un problema al procesar tu orden. Intenta nuevamente.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
      <button className="close-btn" onClick={toggleCart}>✖</button>
      <h2>🛒 Tu Carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : checkoutOpen ? (
        <div className="checkout-form">
          <h3>Resumen de compra</h3>
          {cart.map((item) => (
            <p key={item.id}>{item.quantity} x {item.name} - ${item.price * item.quantity}</p>
          ))}
          <h4>Total a pagar: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h4>

          <h3>Datos del comprador</h3>
          <input
            type="text"
            name="name"
            placeholder="Nombre y Apellido"
            value={buyerInfo.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={buyerInfo.email}
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Número de Teléfono"
            value={buyerInfo.phone}
            onChange={handleInputChange}
          />

          <button className="btn btn-success w-100 mt-3" onClick={handleSubmitOrder}>
            Confirmar Compra ✅
          </button>
          <button className="btn btn-secondary w-100 mt-2" onClick={() => setCheckoutOpen(false)}>
            Volver al Carrito 🔙
          </button>
        </div>
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
          <button className="btn btn-primary w-100 mt-3" onClick={() => setCheckoutOpen(true)}>
            Ir a Pagar 💳
          </button>
          <button className="btn btn-danger w-100 mt-2" onClick={clearCart}>
            Vaciar Carrito 🗑
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;







