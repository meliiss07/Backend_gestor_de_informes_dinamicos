const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise'); // Cambia a mysql2

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuración de la conexión a MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // tu contraseña
  database: 'sequelize', // tu base de datos
  port: 3306, // puerto por defecto de MySQL
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verifica la conexión a la base de datos al iniciar el servidor
pool.getConnection()
  .then(conn => {
    console.log('Conexión a MySQL exitosa');
    conn.release();
  })
  .catch(err => {
    console.error('Error de conexión a MySQL:', err.message);
  });

// Endpoint para crear una nueva conexión
app.post('/api/connections', async (req, res) => {
  // Log de los datos recibidos
  console.log('POST /api/connections body:', req.body);
  const { name, type, host, port, user, password, dbname } = req.body;
  try {
    // Inserta los datos en la tabla connections de la base sequelize
    const [result] = await pool.execute(
      'INSERT INTO connections (name, type, host, port, user, password, dbname) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, type, host, port, user, password, dbname]
    );
    // Obtiene el registro recién insertado
    const [rows] = await pool.execute('SELECT * FROM connections WHERE id = ?', [result.insertId]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error en POST /api/connections:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para listar todas las conexiones
app.get('/api/connections', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM connections ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error en GET /api/connections:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para editar una conexión existente
app.put('/api/connections/:id', async (req, res) => {
  console.log('PUT /api/connections/:id body:', req.body);
  const { id } = req.params;
  const { name, type, host, port, user, password, dbname } = req.body;
  try {
    await pool.execute(
      'UPDATE connections SET name=?, type=?, host=?, port=?, user=?, password=?, dbname=? WHERE id=?',
      [name, type, host, port, user, password, dbname, id]
    );
    const [rows] = await pool.execute('SELECT * FROM connections WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error en PUT /api/connections/:id:', err);
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para borrar una conexión
app.delete('/api/connections/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.execute('DELETE FROM connections WHERE id=?', [id]);
    res.json({ success: true });
  } catch (err) {
    console.error('Error en DELETE /api/connections/:id:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log('Servidor backend escuchando en puerto 4000');
});