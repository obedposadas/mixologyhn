const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Cambia esto si usas otro proveedor de correo
    auth: {
        user: 'mixologyhn2@gmail.com', // Tu correo electrónico
        pass: '504Mixologyhn200' // Tu contraseña o app password
    }
});

// Ruta para manejar el formulario de contacto
app.post('/enviar-contacto', (req, res) => {
    const { nombre, ciudad, telefono, mensaje } = req.body;

    // Validación básica
    if (!nombre || !telefono || !mensaje) {
        return res.status(400).json({ success: false, message: 'Por favor, completa todos los campos obligatorios.' });
    }

    // Configuración del correo
    const mailOptions = {
        from: 'mixologyhn2@gmail.com', // Tu correo electrónico
        to: 'mixologyhn@gmail.com', // Correo del destinatario
        subject: 'Nuevo mensaje de contacto de tu pagina web - MixologyHN',
        text: `Has recibido un nuevo mensaje de contacto de tu pagina web:
        Nombre: ${nombre}
        Ciudad: ${ciudad || 'No especificada'}
        Teléfono: ${telefono}
        Mensaje: ${mensaje}`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ success: false, message: 'Error al enviar el correo.' });
        }
        console.log('Correo enviado:', info.response);
        res.json({ success: true, message: '¡Mensaje enviado con éxito!' });
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});