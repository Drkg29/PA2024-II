import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  // Estado para manejar el mensaje de éxito
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Función para manejar cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de recargar la página

    // Aquí puedes agregar lógica para enviar los datos al servidor
    console.log('Datos enviados:', formData);

    // Muestra un mensaje de éxito
    setIsSubmitted(true);

    // Limpiar el formulario
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="contact-container">
      <h2>CONTACTO</h2>
      <div className="image-container">
        <img src="/lyfefuel.jpg" alt="Productos" />
      </div>

      <h3 className='Titulo-Formulario'>LLENE EL FORMULARIO DE CONTACTO</h3>

      {isSubmitted ? (
        <div className="success-message">¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.</div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='label-contact' htmlFor="name">NOMBRE</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Tu Nombre Completo"
              required
            />
          </div>

          <div className="form-group">
            <label className='label-contact' htmlFor="email">E-MAIL</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Tu Email"
              required
            />
          </div>

          <div className="form-group">
            <label className='label-contact' htmlFor="phone">TELÉFONO</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Tu Teléfono"
              required
            />
          </div>

          <div className="form-group">
            <label className='label-contact' htmlFor="message">¿NECESITAS AYUDA?</label>
            <textarea
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Escribe tu mensaje aquí..."
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-button">ENVIAR</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
