import { Routes, Route } from 'react-router-dom';
import Usuarios from './pages/usuarios';
import ConexionesDB from './pages/conexiones.D.B';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Usuarios />} />
      <Route path="/conexiones" element={<ConexionesDB />} />
    </Routes>
  );
}

export default App;
