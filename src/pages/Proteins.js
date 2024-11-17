import React, { useState } from 'react'; 
import './Category.css';

const Proteins = ({ addToCart }) => {
  const [quantities, setQuantities] = useState({});

  const products = [
    { 
      title: "Mega Gainer", 
      price: 19.99, 
      image: "./MegaGainer.png", 
      description: "Mejora tu salud general y energía.", 
      rating: 4
    },
    { 
      title: "Nitro Tech", 
      price: 14.99, 
      image: "./NitroTech.png", 
      description: "Apoya la salud ósea y del sistema inmunológico.", 
      rating: 5
    },
    { 
      title: "Performance", 
      price: 12.99, 
      image: "./Performance.png", 
      description: "Potente antioxidante que mejora la salud.", 
      rating: 4 
    },
    { 
      title: "Isolate Whey Zero", 
      price: 29.99, 
      image: "./IsoWheyZ.png", 
      description: "Beneficioso para la salud cardiovascular.", 
      rating: 4.8 // Agrega la calificación
    },
    { 
      title: "Isolate Fresa", 
      price: 17.99, 
      image: "./ProteinIsolate.png", 
      description: "Ayuda a convertir los alimentos en energía.", 
      rating: 4.4 // Agrega la calificación
    },
    { 
      title: "Gainer Gold", 
      price: 21.99, 
      image: "./GainerGold.png", 
      description: "Antioxidante que protege las células.", 
      rating: 4.5 
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
      <h2>Proteinas</h2>
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

export default Proteins;
