// Importar módulos necesarios
const express = require('express');
const cors = require('cors');
const app = express();

// Habilitar CORS para permitir solicitudes desde el cliente React en http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

// Middleware para analizar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Ruta de ejemplo para recibir pedidos
app.post('/api/orders', (req, res) => {
    console.log('Datos del pedido:', req.body); // Imprime los datos recibidos

    // Aquí puedes procesar el pedido o guardarlo en una base de datos
    res.json({ message: 'Pedido recibido correctamente' }); // Respuesta de éxito
});

// Iniciar el servidor en el puerto 8080
app.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
});
