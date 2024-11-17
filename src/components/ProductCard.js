// src/components/ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onDelete }) => {
  return (
    <div className="product-card">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Estrellas: {product.stars}</p>
      <Link to={`/admin/edit-product/${product.id}`} className="btn">Editar</Link>
      <button onClick={() => onDelete(product.id)} className="btn btn-delete">Eliminar</button>
    </div>
  );
};

export default ProductCard;
