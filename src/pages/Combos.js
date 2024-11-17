import React, { useState } from 'react'; 
import './Category.css';

const Supplements = ({ addToCart }) => {
  const [quantities, setQuantities] = useState({});

  const products = [
    { 
      title: "Hiper Mass + Creatine", 
      price: 24.99, 
      image: "./Combos1.png", 
      description: "Aminoácidos de cadena ramificada para mejorar el rendimiento.", 
      rating: 4.6 // Calificación
    },
    { 
      title: "Whey Isopro + Creatine", 
      price: 19.99, 
      image: "./Combos2.png", 
      description: "Ayuda en la recuperación muscular.", 
      rating: 4.5 // Calificación
    },
    { 
      title: "Nitro Whey + Creatine Cell_Tech", 
      price: 29.99, 
      image: "./Combos3.png", 
      description: "Aumenta tu energía y enfoque antes de entrenar.", 
      rating: 4.8 // Calificación
    },
    { 
      title: "WheyPro Hers + Sonic Energy", 
      price: 34.99, 
      image: "./Combos4.png", 
      description: "Mejora el rendimiento y la fuerza.", 
      rating: 4.7 // Calificación
    },
    { 
      title: "Black Series Whey + Creatine + BCAPS", 
      price: 22.99, 
      image: "./Combos5.png", 
      description: "Ayuda en la pérdida de grasa.", 
      rating: 4.4 // Calificación
    },
    { 
      title: "Whey RT + BCAA + Creatine", 
      price: 27.99, 
      image: "./Combos6.png", 
      description: "Aumenta la resistencia y el rendimiento.", 
      rating: 4.6 // Calificación
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
      <h2>Combos</h2>
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

export default Supplements;
