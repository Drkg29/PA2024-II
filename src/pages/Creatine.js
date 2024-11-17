import React, { useState } from 'react'; 
import './Category.css';

const Creatine = ({ addToCart }) => {
  const [quantities, setQuantities] = useState({});

  const products = [
    { 
      title: "Creatina Micronized", 
      price: 24.99, 
      image: "./CreatineMicronized.png", 
      description: "Aumenta la fuerza y mejora el rendimiento.", 
      rating: 4.6 // Agrega la calificación
    },
    { 
      title: "Creatine Amix", 
      price: 29.99, 
      image: "./creatineAmix.png", 
      description: "Forma de creatina altamente soluble.", 
      rating: 4.7 // Agrega la calificación
    },
    { 
      title: "Creatina Powder Minohidrato", 
      price: 34.99, 
      image: "./CreatinePowder.png", 
      description: "Absorción rápida y fácil digestión.", 
      rating: 4.8 // Agrega la calificación
    },
    { 
      title: "Creatine Pure", 
      price: 39.99, 
      image: "./creatineBlack.png", 
      description: "Creatina de pH equilibrado.", 
      rating: 4.5 // Agrega la calificación
    },
    { 
      title: "Creatine Supreme", 
      price: 34.99, 
      image: "./CreatineSupre.png", 
      description: "Mejorar la recuperación y el rendimiento.", 
      rating: 4.6 // Agrega la calificación
    },
    { 
      title: "Creatina Cell Tech", 
      price: 24.99, 
      image: "./CreatineCell_Tech.png", 
      description: "Ideal para mezclar con otras bebidas.", 
      rating: 4.4 // Agrega la calificación
    },
  ];

  const handleQuantityChange = (title, value) => {
    setQuantities((prev) => ({ ...prev, [title]: value }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.title] || 1; 
    addToCart({ ...product, quantity }); 
    handleQuantityChange(product.title, 1); 
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating); // Redondea la calificación al número más cercano
    const stars = [];

    for (let i = 0; i < totalStars; i++) {
      if (i < filledStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }

    return <div className="stars">{stars}</div>;
  };

  return (
    <div>
      <h2>Creatinas</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.title} className="product-item">
            <h4>{product.title}</h4>
            <img src={product.image} alt={product.title}/>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>{product.description}</p>
            {renderStars(product.rating)} {/* Renderiza las estrellas de calificación */}
            <div className="quantity-container">
              <button 
                onClick={() => handleQuantityChange(product.title, Math.max((quantities[product.title] || 1) - 1, 1))}
              >
                -
              </button>
              <span>{quantities[product.title] || 1}</span>
              <button 
                onClick={() => handleQuantityChange(product.title, (quantities[product.title] || 1) + 1)}
              >
                +
              </button>
              <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Creatine;
