const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());  // Habilitar CORS para permitir solicitudes de dominios cruzados

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1', // Si el servidor de la base de datos está en la misma máquina que Node.js
  user: 'root',      // Usuario de MySQL
  password: '',      // Contraseña de MySQL
  database: 'faunavb' // Nombre de la base de datos
});

// Establecer la conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener los datos de las especies
app.get('/datos', (req, res) => {
  const query = `
    SELECT e.nombre_comun, e.nombre_cientifico, b.desc_bandera, d.desc_dieta, ec.desc_estado, m.multimedia FROM especies e JOIN banderas b ON e.id_bandera = b.id_bandera JOIN dietas d ON e.id_dieta = d.id_dieta JOIN estados_conservacions ec ON e.id_estado_conservacion = ec.id_estado_conservacion JOIN asigna_multimedia am ON e.id_especie = am.id_especie JOIN multimedia m ON am.id_multimedia = m.id_multimedia;
  `;

  // Ejecutar la consulta SQL
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      res.status(500).json({ error: 'Error en la consulta de la base de datos' });
      return;
    }
    res.json(results);
  });
});

// Configuración del puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
