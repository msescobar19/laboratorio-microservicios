const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    try {
        const day = new Date().toLocaleDateString('es-ES');
        // Docker nos permite usar el nombre del servicio "mi-backend" como DNS interno
        const respuesta = await fetch('http://mi-backend:5000/api/datos');
        const datos = await respuesta.json();
        const servidor = datos.servidor;
        res.send(
            `<!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Microservicio Frontend</title>
                <style>
                    body { margin: 0; min-height: 100vh; display: grid; place-items: center; padding: 24px; box-sizing: border-box; background: #eef3ef; color: #18332d; font-family: Arial, sans-serif; }
                    main { width: min(100%, 560px); padding: 32px; box-sizing: border-box; background: #fff; border-top: 5px solid #28745e; border-radius: 8px; box-shadow: 0 14px 36px #18332d18; }
                    .status { color: #28745e; font-size: 13px; font-weight: 700; text-transform: uppercase; }
                    h1 { margin: 10px 0; font-size: 28px; }
                    .message { margin: 24px 0; padding: 18px; background: #f3f7f4; border-left: 4px solid #e4a83c; line-height: 1.5; }
                    .details { display: flex; flex-wrap: wrap; gap: 10px; }
                    .detail { padding: 10px 12px; background: #f7f5ef; border-radius: 5px; font-size: 14px; }
                    .detail strong { display: block; margin-bottom: 4px; color: #61736c; font-size: 11px; text-transform: uppercase; }
                    .success { margin-top: 22px; color: #28745e; font-weight: 700; line-height: 1.5; }
                </style>
            </head>
            <body>
                <main>
                    <span class="status">Frontend activo</span>
                    <h1>Respuesta del backend</h1>
                    <p class="message">${datos.mensaje}</p>
                    <section class="details" aria-label="Detalles de la respuesta">
                        <div class="detail"><strong>Servidor de origen</strong>${servidor}</div>
                        <div class="detail"><strong>Fecha</strong>${day}</div>
                    </section>
                    <p class="success">El estudiante Martín Salazar Escobar ha logrado completar el laboratorio 3 con éxito!</p>
                </main>
            </body>
            </html>`
        );
    } catch (error) {
        res.send(
            `<h1>Error al conectar con el Backend</h1>
            <p>${error.message}</p>`
        );
    }
});

app.listen(PORT, () =>
    console.log(`Frontend corriendo en puerto ${PORT}`)
);