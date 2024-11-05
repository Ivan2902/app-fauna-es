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

// Ruta para obtener los datos de las especies para `DetailScreen`
app.get('/datos', (req, res) => {
  const query = `
    SELECT 
      e.nombre_comun, 
      e.nombre_cientifico, 
      e.descripcion AS descripcion,         -- Cambiado para que coincida con "descripcion"
      e.habitad AS habitat,                 -- Cambiado para que coincida con "habitat"
      e.tamanio AS tamaño,                  -- Cambiado para que coincida con "tamaño"
      f.desc_familia AS familia,            -- Cambiado para que coincida con "familia"
      d.desc_dieta AS desc_dieta,           -- Cambiado para que coincida con "desc_dieta"
      ec.desc_estado AS desc_estado,        -- Cambiado para que coincida con "desc_estado"
      ent.desc_entorno AS entorno,          -- Cambiado para que coincida con "entorno"
      b.desc_bandera AS desc_bandera,       -- Cambiado para que coincida con "desc_bandera"
      g.desc_grupo AS grupo,                -- Cambiado para que coincida con "grupo"
      m.multimedia AS multimedia,           -- Cambiado para que coincida con "multimedia"
      GROUP_CONCAT(enf.nombre_enfermedad SEPARATOR ', ') AS enfermedades -- Listado de enfermedades

    FROM 
      especies e
    LEFT JOIN 
      banderas b ON e.id_bandera = b.id_bandera
    LEFT JOIN 
      dietas d ON e.id_dieta = d.id_dieta
    LEFT JOIN 
      estados_conservacions ec ON e.id_estado_conservacion = ec.id_estado_conservacion
    LEFT JOIN 
      entornos ent ON e.id_entorno = ent.id_entorno
    LEFT JOIN 
      familias f ON e.id_familia = f.id_familia
    LEFT JOIN 
      grupos g ON e.id_grupo = g.id_grupo
    LEFT JOIN 
      asigna_multimedia am ON e.id_especie = am.id_especie
    LEFT JOIN 
      multimedia m ON am.id_multimedia = m.id_multimedia
    LEFT JOIN 
      asigna_enfermedades ae ON e.id_especie = ae.id_especie
    LEFT JOIN 
      enfermedades enf ON ae.id_enfermedad = enf.id_enfermedad

    GROUP BY 
      e.id_especie;
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
