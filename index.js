const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs'); // Para encriptar contraseñas

const app = express();
app.use(cors());  
app.use(express.json());  // Middleware para manejar JSON

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'faunavb'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Ruta para obtener datos de especies (no se modifica)
app.get('/datos', (req, res) => {
  const query = `
    SELECT 
      e.nombre_comun, 
      e.nombre_cientifico, 
      e.descripcion AS descripcion,         
      e.habitad AS habitat,                 
      e.tamanio AS tamaño,                  
      f.desc_familia AS familia,            
      d.desc_dieta AS desc_dieta,           
      ec.desc_estado AS desc_estado,        
      ent.desc_entorno AS entorno,          
      b.desc_bandera AS desc_bandera,       
      g.desc_grupo AS grupo,                
      m.multimedia AS multimedia,           
      GROUP_CONCAT(enf.nombre_enfermedad SEPARATOR ', ') AS enfermedades 

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

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      res.status(500).json({ error: 'Error en la consulta de la base de datos' });
      return;
    }
    res.json(results);
  });
});

// Ruta para registrar un usuario
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error al registrar usuario:', err);
        return res.status(500).json({ error: 'Error al registrar usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    });
  } catch (error) {
    console.error('Error en el proceso de registro:', error);
    res.status(500).json({ error: 'Error en el proceso de registro' });
  }
});

// Ruta para iniciar sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return res.status(500).json({ error: 'Error en la consulta de la base de datos' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    res.json({ message: 'Inicio de sesión exitoso', user: { id: user.id, name: user.name, email: user.email } });
  });
});

// Configuración del puerto
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
