import "./CartWidget.css";
import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import CartSidebar from "../CartSidebar/CartSidebar";

function CartWidget() {
  const { cartQuantity } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="cart-widget" onClick={toggleCart}>
        🛒 <span>{cartQuantity}</span>
      </div>
      <CartSidebar isOpen={isOpen} toggleCart={toggleCart} />
    </>
  );
}

export default CartWidget;

