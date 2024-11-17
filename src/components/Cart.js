import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const handleRemove = (productToRemove) => {
    const updatedCart = cart.filter(item => item.title !== productToRemove.title);
    setCart(updatedCart);
  };

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove(item); 
      return;
    }

    const updatedCart = cart.map(cartItem => 
      cartItem.title === item.title ? { ...cartItem, quantity: newQuantity } : cartItem
    );
    setCart(updatedCart);
  };

  const totalCost = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

  const handleCheckout = () => {
    navigate('/checkout', { state: { cart, totalCost } });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Tu carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            <h3 className="item-count">{cart.length} Productos</h3>
            {cart.map((item) => (
              <div key={item.title} className="cart-item">
                <div className="item-details">
                  <h4 className="item-title">{item.title}</h4>
                  <div className="quantity-container">
                    <button onClick={() => handleQuantityChange(item, item.quantity - 1)}>-</button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item, item.quantity + 1)}>+</button>
                    <button className="remove-button" onClick={() => handleRemove(item)}>Eliminar</button>
                  </div>
                  <p className="item-price">Precio: ${item.price.toFixed(2)}</p>
                  <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-summary">
            <h3 className="summary-title">Resumen del Pedido</h3>
            <p className="item-count">Productos: {cart.length}</p>
            <p className="total-cost">Costo Total: ${totalCost}</p>
            <div className="checkout-section">
              <button className="checkout-button" onClick={handleCheckout}>Ir a Pagar</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
