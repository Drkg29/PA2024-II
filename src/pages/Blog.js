import React from 'react';
import './Blog.css';

const Blog = () => {
  return (
    <aside className="blog">
      <h3>NUESTRO BLOG</h3>
      <div className="contenedor">
        <div className="grid">
          {/* Primer artículo */}
          <div className="blog-item">
            <img className="imagen-blog" src="/batidoBanana.jpg" alt="Batido de Banana" />
            <div className="blog-content">
              <p className="text-parrafo">
                Aprende a preparar un delicioso batido de banana lleno de energía. Ideal para un desayuno saludable o un snack post-entrenamiento.
              </p>
            </div>
          </div>

          {/* Segundo artículo */}
          <div className="blog-item">
            <img className="imagen-blog" src="/NatureProtein.jpg" alt="Nature Protein" />
            <div className="blog-content">
              <p className="text-parrafo">
                Descubre los beneficios de la proteína de origen natural. Un suplemento esencial para quienes buscan mejorar su rendimiento físico.
              </p>
            </div>
          </div>

          {/* Tercer artículo */}
          <div className="blog-item">
            <img className="imagen-blog" src="/batido-verde.avif" alt="Batido Verde" />
            <div className="blog-content">
              <p className="text-parrafo">
                ¿Quieres una opción refrescante? Prueba nuestro batido verde detox. ¡Perfecto para limpiar tu organismo y recargar energías!
              </p>
            </div>
          </div>

          {/* Cuarto artículo */}
          <div className="blog-item">
            <img className="imagen-blog" src="/ejercicio.avif" alt="Beneficios del Ejercicio" />
            <div className="blog-content">
              <p className="text-parrafo">
                Conoce los múltiples beneficios de hacer ejercicio regularmente. Desde mejorar tu salud mental hasta aumentar tu longevidad.
              </p>
            </div>
          </div>

          {/* Quinto artículo */}
          <div className="blog-item">
            <img className="imagen-blog" src="/supplements.jpg" alt="Suplementos de Fitness" />
            <div className="blog-content">
              <p className="text-parrafo">
                Explora los diferentes tipos de suplementos de fitness y cómo pueden ayudarte a alcanzar tus metas de acondicionamiento físico.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Blog;
