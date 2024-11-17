import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import './styles/global.css';
import { CartProvider } from './context/CartContext';
import { Elements } from '@stripe/react-stripe-js'; 
import { loadStripe } from '@stripe/stripe-js'; 

const stripePromise = loadStripe('trabajoproyectoaula');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </CartProvider>
);
