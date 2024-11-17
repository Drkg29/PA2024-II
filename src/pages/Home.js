import React from 'react';
import './Home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-background"></div>
      <div className="home-content">
        <h1 className="home-title">Bienvenido a Fitness Store Online</h1>
        <p className="home-quote">
          "El éxito no se mide por lo que logras, sino por el esfuerzo que pones en alcanzar tus metas."
        </p>
        <div className="home-btns">
          <a href="/blog" className="btn-primary">Blog</a>
          <a href="/contact" className="btn-secondary">Contacto</a>
        </div>

      </div>
    </div>
  );
};

export default Home;
