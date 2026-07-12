import { useState } from 'react';
import { crearAlumno } from '../services/alumnosService';
import { manejarError } from '../utils/manejarError';
 
const estadoInicial = {
  nombre: '',
  apellido: '',
  grado: '',
  seccion: '',
};
 
const validarCampos = (campos) => {
  const errores = {};
 
  if (campos.nombre.trim().length < 2) {
    errores.nombre = 'El nombre debe tener al menos 2 caracteres';
  }
 
  if (campos.apellido.trim().length < 2) {
    errores.apellido = 'El apellido debe tener al menos 2 caracteres';
  }
 
  if (campos.grado === '') {
    errores.grado = 'Debes seleccionar un grado';
  }
 
  if (campos.seccion === '') {
    errores.seccion = 'Debes seleccionar una seccion';
  }
};
 
export const FormularioCrear = ({ onGuardado, onCancelar }) => {
  const [campos, setCampos] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
 
  const handleChange = (e) => {
    const { name, value } = e.target;
 
    setCampos((anterior) => ({ ...anterior, [name]: value }));
 
    if (errores[name]) {
      setErrores((anterior) => ({ ...anterior, [name]: null }));
    }
  };
 
  const handleGuardar = async () => {
    const erroresEncontrado = validarCampos(campos);
 
    try {
      await crearAlumno(campos);
      onGuardado();
    } catch (error) {
      console.error('Error al momento de guardar un alumno');
    }
  };
 
  return (
    <div>
      <h2>Registrar nuevo alumno</h2>
 
      <div>
        <label>Nombre</label>
        <input
          type='text'
          name='nombre'
          value={campos.nombre}
          onChange={handleChange}
          placeholder='Ej: Vic'
        />
 
        {errores.nombre && <p>{error.nombre}</p>}
      </div>
 
      <div>
        <label>Apellido</label>
        <input
          type='text'
          name='apellido'
          value={campos.apellido}
          onChange={handleChange}
          placeholder='Ej: Flores'
        />
 
        {errores.apellido && <p>{error.apellido}</p>}
      </div>
 
      <div>
        <label>Grado</label>
        <select name='grado' value={campos.grado} onChange={handleChange}>
          <option>Selecciona un grado</option>
          <option value='7to'>7to</option>
          <option value='8to'>8to</option>
          <option value='9to'>9to</option>
        </select>
 
        {errores.grado && <p>{error.grado}</p>}
      </div>
 
      <div>
        <label>Seccion</label>
        <select name='seccion' value={campos.seccion} onChange={handleChange}>
          <option>Selecciona una seccion</option>
          <option value='A'>A</option>
          <option value='B'>B</option>
        </select>
 
        {errores.seccion && <p>{error.seccion}</p>}
      </div>
 
      <div>
        <button onClick={handleGuardar}>Registrar alumno</button>
 
        <button onClick={onCancelar}>Cancelar</button>
      </div>
    </div>
  );
};
 
 
 