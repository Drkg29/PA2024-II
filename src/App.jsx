import React, { useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Proteins from './pages/Proteins';
import Creatines from './pages/Creatine';
import Combos from './pages/Combos';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import NavBar from './components/Header';
import Footer from './components/Footer';
import Auth from './pages/Auth';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useState(false); // Estado de autenticación
  const [userRole, setUserRole] = useState(null); // Rol de usuario ('admin' o 'client')

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    const updatedCart = [...cart];
    const existingProductIndex = updatedCart.findIndex((item) => item.title === product.title);

    if (existingProductIndex > -1) {
      updatedCart[existingProductIndex].quantity += product.quantity;
    } else {
      updatedCart.push(product);
    }

    setCart(updatedCart);
  };

  // Función para autenticar al usuario y definir su rol
  const authenticateUser = (role) => {
    setAuth(true); // Establece autenticación en verdadero
    setUserRole(role); // Establece el rol del usuario
  };

  // Componente para rutas protegidas
  const ProtectedRoute = ({ element, role }) => {
    if (!auth) {
      return <Navigate to="/auth" />; // Redirige a login si no está autenticado
    }
    if (role && userRole !== role) {
      return <Navigate to="/" />; // Redirige a home si el rol no coincide
    }
    return element;
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/proteins" element={<Proteins addToCart={addToCart} />} />
        <Route path="/creatines" element={<Creatines addToCart={addToCart} />} />
        <Route path="/combos" element={<Combos addToCart={addToCart} />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth authenticateUser={authenticateUser} />} />

        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Ruta protegida para AdminDashboard */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedRoute element={<AdminDashboard />} role="admin" />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
