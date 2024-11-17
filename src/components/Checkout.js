import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf'; 
import './Checkout.css';
import './../App.jsx';

const Checkout = () => {
  const location = useLocation();
  const { cart = [], totalCost = 0 } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });

  const [step, setStep] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
  };

  // Función para generar PDF de la factura
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Factura de Compra", 20, 20);

    doc.setFontSize(12);
    doc.text(`Nombre: ${formData.fullName}`, 20, 30);
    doc.text(`Correo: ${formData.email}`, 20, 40);
    doc.text(`Dirección: ${formData.address}`, 20, 50);
    doc.text(`Ciudad: ${formData.city}`, 20, 60);
    doc.text(`Código Postal: ${formData.postalCode}`, 20, 70);

    doc.text("Resumen de Pedido:", 20, 80);
    let yPosition = 90;

    cart.forEach((item) => {
      doc.text(`${item.title} - Cantidad: ${item.quantity} - Precio: $${item.price.toFixed(2)} - Total: $${(item.price * item.quantity).toFixed(2)}`, 20, yPosition);
      yPosition += 10;
    });

    doc.text(`Costo Total: $${totalCost}`, 20, yPosition);

  
    doc.save("factura de pedido .pdf");
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    
    const order = {
      items: cart.map(item => ({
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalCost: totalCost,
      customer: formData,
      paymentMethod: paymentMethod,
      cardDetails: cardDetails, 
    };

    try {
      const response = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Pedido realizado:', data);
        setOrderSuccess(true);
        setErrorMessage('');
        generatePDF();  
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error al realizar el pedido: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error al conectar con el servidor. Intente nuevamente más tarde.');
    }
  };

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>

      {step === 1 && (
        <div className="checkout-form">
          <form onSubmit={(e) => {
            e.preventDefault();
            setStep(2);
          }}>
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Nombre completo"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="input-field"
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
              <input
                type="text"
                name="address"
                placeholder="Dirección"
                value={formData.address}
                onChange={handleChange}
                required
                className="input-field"
              />
              <input
                type="text"
                name="city"
                placeholder="Ciudad"
                value={formData.city}
                onChange={handleChange}
                required
                className="input-field"
              />
              <input
                type="text"
                name="postalCode"
                placeholder="Código Postal"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="input-field"
              />
            </div>
            <button type="submit" className="checkout-button">Siguiente</button>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="payment-method">
          <h3 className="summary-title">Método de Pago</h3>
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label htmlFor="paymentMethod">Seleccione el método de pago:</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                required
                className="select-field"
              >
                <option value="credit">Tarjeta de Crédito</option>
                <option value="debit">Tarjeta de Débito</option>
                <option value="nequi">Nequi</option>
              </select>
            </div>

            {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
              <div className="card-details">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Número de tarjeta"
                  value={cardDetails.cardNumber}
                  onChange={handleCardChange}
                  required
                  className="input-field"
                />
                <input
                  type="text"
                  name="expirationDate"
                  placeholder="Fecha de vencimiento (MM/YY)"
                  value={cardDetails.expirationDate}
                  onChange={handleCardChange}
                  required
                  className="input-field"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={handleCardChange}
                  required
                  className="input-field"
                />
              </div>
            )}

            <button type="submit" className="checkout-button">Pagar</button>
          </form>
        </div>
      )}

      {orderSuccess && (
        <div className="order-success">
          <p>Su pedido ha sido realizado con éxito.</p>
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}

      {step === 1 && cart.length > 0 && (
        <div className="order-summary">
          <h3 className="summary-title">Resumen del Pedido</h3>
          {cart.map((item, index) => (
            <div key={index} className="order-item">
              <h4 className="item-title">{item.title}</h4>
              <p className="item-price">Precio: ${item.price.toFixed(2)}</p>
              <p className="item-quantity">Cantidad: {item.quantity}</p>
              <p className="item-total">Total: ${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <p className="total-cost">Costo Total: ${totalCost}</p>
        </div>
      )}
    </div>
  );
};

export default Checkout;
