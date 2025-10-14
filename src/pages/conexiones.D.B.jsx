import { useState, useEffect } from 'react'

// Componente principal para gestionar conexiones a la base de datos
function ConexionesDB() {
  // Estado para la lista de conexiones obtenidas del backend
  const [connections, setConnections] = useState([])
  // Estado para saber si estamos editando una conexión existente
  const [editing, setEditing] = useState(null)
  // Estado para el formulario de conexión
  const [form, setForm] = useState({
    name: '',
    type: 'postgresql',
    host: '127.0.0.1',
    port: '5432',
    user: '',
    password: '',
    dbname: ''
  })

  // Al montar el componente, obtener las conexiones guardadas en la base de datos
  useEffect(() => {
    // GET: obtiene todas las conexiones desde el backend
    fetch('http://localhost:4000/api/connections')
      .then(res => res.json())
      .then(data => setConnections(data))
      // Si hay error aquí, revisa que el backend esté corriendo y la base de datos esté conectada
  }, [])

  // Cuando el usuario hace clic en editar, carga los datos en el formulario
  const handleEdit = (conn) => {
    setEditing(conn.id)
    setForm({ ...conn })
  }

  // Cuando el usuario elimina una conexión
  const handleDelete = async (id) => {
    // DELETE: elimina la conexión en el backend
    await fetch(`http://localhost:4000/api/connections/${id}`, { method: 'DELETE' })
    // Actualiza el estado local para reflejar el cambio
    setConnections(connections.filter(conn => conn.id !== id))
    if (editing === id) setEditing(null)
  }

  // Actualiza el estado del formulario cuando el usuario escribe
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // Cuando el usuario guarda una nueva conexión o edita una existente
  const handleSave = async () => {
    if (!form.name) {
      alert('Por favor, dale un nombre a la conexión.')
      return
    }
    try {
      if (editing) {
        // PUT: actualiza la conexión en el backend
        const res = await fetch(`http://localhost:4000/api/connections/${editing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        })
        const updated = await res.json()
        if (res.ok) {
          // Actualiza el estado local con la conexión editada
          setConnections(connections.map(conn => conn.id === editing ? updated : conn))
          setEditing(null)
        } else {
          alert('Error al editar: ' + (updated.error || 'Error desconocido'))
        }
      } else {
        // POST: guarda la nueva conexión en el backend
        const res = await fetch('http://localhost:4000/api/connections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        })
        const newConn = await res.json()
        if (res.ok) {
          // Agrega la nueva conexión al estado local
          setConnections([newConn, ...connections])
        } else {
          alert('Error al guardar: ' + (newConn.error || 'Error desconocido'))
        }
      }
      // Limpia el formulario después de guardar
      setForm({
        name: '',
        type: 'postgresql',
        host: '127.0.0.1',
        port: '5432',
        user: 'root',
        password: '',
        dbname: ''
      })
    } catch (err) {
      alert('Error de red o backend: ' + err.message)
    }
  }

  // Renderiza la interfaz de conexiones y el formulario
  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>Conexiones</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {connections.map(conn => (
          <li key={conn.id} style={{
            background: '#e9ecef', marginBottom: 10, borderRadius: 6,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12
          }}>
            <span>{conn.name} ({conn.type})</span>
            <div>
              {/* Botón para editar la conexión */}
              <button onClick={() => handleEdit(conn)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, marginLeft: 8 }}>✏️</button>
              {/* Botón para eliminar la conexión */}
              <button onClick={() => handleDelete(conn.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, marginLeft: 8 }}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      {/* Formulario para agregar/editar conexión */}
      <div className="connections-manager" style={{
        background: '#fff', padding: 30, borderRadius: 8, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', width: 500, margin: '0 auto'
      }}>
        <h3 style={{ textAlign: 'center', marginTop: 0, marginBottom: 25 }}>Configurar Conexión a Base de Datos</h3>
        <div className="form-group">
          <label>Tipo de Base de Datos</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="postgresql">PostgreSQL</option>
            <option value="mysql">MySQL</option>
            <option value="sqlserver">Microsoft SQL Server</option>
            <option value="oracle">Oracle</option>
            <option value="sqlite">SQLite</option>
          </select>
        </div>
        <div className="form-group">
          <label>Host</label>
          <input name="host" type="text" value={form.host} onChange={handleChange} placeholder="ej: localhost" />
        </div>
        <div className="form-group">
          <label>Puerto</label>
          <input name="port" type="number" value={form.port} onChange={handleChange} placeholder="ej: 5432" />
        </div>
        <div className="form-group">
          <label>Usuario</label>
          <input name="user" type="text" value={form.user} onChange={handleChange} placeholder="ej: postgres" />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Nombre de la Base de Datos</label>
          <input name="dbname" type="text" value={form.dbname} onChange={handleChange} placeholder="ej: mi_base_de_datos" />
        </div>
        <div className="form-group">
          <label>Nombre de la Conexión</label>
          <input name="name" type="text" value={form.name} onChange={handleChange} placeholder="ej: Producción" />
        </div>
        <div className="connection-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 25 }}>
          {/* Botón para probar la conexión (solo ejemplo, no implementado) */}
          <button type="button" style={{ background: '#007bff', color: '#fff' }} onClick={() => alert('Probando conexión... (ejemplo)')}>Probar Conexión</button>
          {/* Botón para guardar la conexión */}
          <button type="button" style={{ background: '#28a745', color: '#fff' }} onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  )
}

export default ConexionesDB
