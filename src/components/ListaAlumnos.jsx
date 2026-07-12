import { useState, useEffect } from 'react';
import { TarjetaAlumno } from './TarjetaAlumno';
import { obtenerAlumnos } from '../services/alumnosService.js';
 
export const ListaAlumnos = ({ onSeleccionarAlumno }) => {
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [gradoFiltro, setGradoFiltro] = useState('Todos');
 
  useEffect(() => {
    const fetchAlumnos = async () => {
      try {
        const res = await obtenerAlumnos();
 
        setAlumnos(res);
      } catch (error) {
        console.error('Error al obtener los alumnos:', error);
      }
    };
 
    fetchAlumnos();
  }, []);
 
  const alumnosFiltrados = alumnos.filter((alumno) => {
    const coincideNombre = alumno.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
 
    const coincideGrado =
      gradoFiltro === 'Todos' || alumno.grado === gradoFiltro;
 
    return coincideNombre && coincideGrado;
  });
 
  return (
    <div>
      <input
        type='text'
        placeholder='Buscar alumno por nombre...'
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
 
      <select
        value={gradoFiltro}
        onChange={(e) => setGradoFiltro(e.target.value)}
      >
        <option value='Todos'>Todos los grados</option>
        <option value='7to'>7° grado</option>
        <option value='8to'>8° grado</option>
        <option value='9to'>9° grado</option>
      </select>
 
      <p>
        Mostrando: {alumnosFiltrados.length} alumnos de {alumnos.length}
      </p>
 
      {alumnosFiltrados.map((alumno) => (
        <TarjetaAlumno
          key={alumno.id}
          id={alumno.id}
          nombre={alumno.nombre}
          grado={alumno.grado}
          seccion={alumno.seccion}
          onSeleccionarAlumno={onSeleccionarAlumno}
        />
      ))}
    </div>
  );
};
 