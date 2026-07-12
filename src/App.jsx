import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import { Encabezado } from './components/Encabezado';
import { ListaAlumnos } from './components/ListaAlumnos';
import { DetalleAlumno } from './components/DetalleAlumno';
import './App.css';

function App() {
  const [idAlumnoSeleccionado, setIdAlumnoSeleccionado] = useState(null);
  const nombreEstudiante = 'Vic Flores';
  const horaActual = new Date().getHours();

  return (
    <>
      <Encabezado usuarioActivo={'Vic Flores'} />

      <ListaAlumnos onSeleccionarAlumno={setIdAlumnoSeleccionado} />

      {idAlumnoSeleccionado && (
        <DetalleAlumno idAlumno={idAlumnoSeleccionado} />
      )}
    </>
  );
}

export default App;