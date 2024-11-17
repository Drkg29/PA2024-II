import React, { useState, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, category: 'proteína' });
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/products');
      if (!response.ok) throw new Error('Error al obtener los productos');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addProduct = async () => {
    if (!newProduct.name || newProduct.price <= 0) return;
    try {
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error('Error al agregar producto');
      const addedProduct = await response.json();
      setProducts([...products, addedProduct]);
      setNewProduct({ name: '', price: 0, category: 'proteína' });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/products/${id}`, { method: 'DELETE' });
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });
      if (!response.ok) throw new Error('Error al actualizar producto');
      const updatedProduct = await response.json();
      setProducts(products.map(product =>
        product.id === updatedProduct.id ? updatedProduct : product
      ));
      setEditingProduct(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    navigate('/auth');
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const chartDataByCategory = {
    labels: ['Proteína', 'Creatina', 'Combo'],
    datasets: [
      {
        label: 'Productos por Categoría',
        data: [
          products.filter(p => p.category === 'proteína').length,
          products.filter(p => p.category === 'creatina').length,
          products.filter(p => p.category === 'combo').length,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const chartDataByPrice = {
    labels: products.map(p => p.name),
    datasets: [
      {
        label: 'Precios de Productos',
        data: products.map(p => p.price),
        borderColor: '#36A2EB',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Panel de Admin</h2>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </aside>

      <main className="main-content">
        <header className="header">
          <h3>Gestión de Suplementos</h3>
          <input
            type="text"
            placeholder="Buscar suplemento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </header>

        <div className="product-form">
          <input
            type="text"
            placeholder="Nombre del suplemento"
            value={editingProduct ? editingProduct.name : newProduct.name}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, name: e.target.value })
                : setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Precio"
            value={editingProduct ? editingProduct.price : newProduct.price}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })
                : setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })
            }
          />
          <select
            value={editingProduct ? editingProduct.category : newProduct.category}
            onChange={(e) =>
              editingProduct
                ? setEditingProduct({ ...editingProduct, category: e.target.value })
                : setNewProduct({ ...newProduct, category: e.target.value })
            }
          >
            <option value="proteína">Proteína</option>
            <option value="creatina">Creatina</option>
            <option value="combo">Combo</option>
          </select>
          {editingProduct ? (
            <button onClick={updateProduct} className="update-button">Actualizar</button>
          ) : (
            <button onClick={addProduct} className="add-button">Agregar</button>
          )}
        </div>

        <ul className="product-list">
          {filteredProducts.map((product) => (
            <li key={product.id} className="product-card">
              <span>{product.name} - ${product.price.toFixed(2)} [{product.category}]</span>
              <button onClick={() => setEditingProduct(product)} className="edit-button">Editar</button>
              <button onClick={() => deleteProduct(product.id)} className="delete-button">Eliminar</button>
            </li>
          ))}
        </ul>

        <div className="chart-grid">
          <div className="chart-item">
            <h3>Productos por Categoría</h3>
            <div className="chart-container">
              <Bar data={chartDataByCategory} options={chartOptions} />
            </div>
          </div>
          <div className="chart-item">
            <h3>Precios de Productos</h3>
            <div className="chart-container">
              <Line data={chartDataByPrice} options={chartOptions} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
