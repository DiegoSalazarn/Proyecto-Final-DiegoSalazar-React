import { createContext, useState } from "react";
import Swal from "sweetalert2"; //  Importamos SweetAlert2

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const MAX_UNITS_PER_PRODUCT = 4; // Límite máximo de unidades por producto

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    const newQuantity = existingProduct ? existingProduct.quantity + quantity : quantity;

    if (newQuantity > MAX_UNITS_PER_PRODUCT) {
      Swal.fire({
        title: "Límite alcanzado ",
        text: `Solo puedes comprar hasta ${MAX_UNITS_PER_PRODUCT} unidades de "${product.name}".`,
        icon: "warning",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
        timer: 2000,
      });
      return;
    }

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const updateQuantity = (productId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Math.max(1, Math.min(item.quantity + amount, MAX_UNITS_PER_PRODUCT)),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, cartQuantity, setCart }}>
      {children}
    </CartContext.Provider>
  );
};




