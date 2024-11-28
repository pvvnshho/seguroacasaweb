import React, { useState, useEffect } from 'react';
import { supabase } from '../createClient';
import { useNavigate } from 'react-router-dom';  // Importamos useNavigate para la redirección

const RegistrarFurgon = () => {
  // Estados para los datos del furgón y el asociado
  const [matricula, setMatricula] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [año, setAño] = useState('');
  const [fotoFurgon, setFotoFurgon] = useState('');
  const [rutConductor, setRutConductor] = useState('');
  const [rutAuxiliar, setRutAuxiliar] = useState('');
  const [nombreAuxiliar, setNombreAuxiliar] = useState('');
  const [telefonoAuxiliar, setTelefonoAuxiliar] = useState('');
  const [fotoAuxiliar, setFotoAuxiliar] = useState('');
  const [rutEstudiante, setRutEstudiante] = useState('');
  const [estudiantes, setEstudiantes] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [conductores, setConductores] = useState([]);

  const navigate = useNavigate();  // Creamos la instancia de useNavigate

  useEffect(() => {
    // Cargar conductores y estudiantes
    const fetchData = async () => {
      try {
        // Obtener conductores
        const { data: conductoresData, error: conductoresError } = await supabase
          .from('usuarios')
          .select('*')
          .eq('tipo_usuario', 'conductor');

        // Obtener estudiantes que no tienen furgón asignado
        const { data: estudiantesData, error: estudiantesError } = await supabase
          .from('estudiantes')
          .select('*')
          .is('matricula_furgon', null);  // Solo estudiantes sin furgón asignado

        if (conductoresError || estudiantesError) {
          setMessage('Error al cargar datos');
        } else {
          setConductores(conductoresData);
          setEstudiantes(estudiantesData);
        }
      } catch (error) {
        setMessage('Error al cargar datos');
      }
    };

    fetchData();
  }, []);

  const handleRegisterFurgon = async () => {
    setLoading(true);
    setMessage('');

    try {
      // Registrar furgón en la base de datos
      const { error: furgonError } = await supabase
        .from('furgones')
        .insert([{
          matricula,
          rut_usuario: rutConductor, 
          marca,
          modelo,
          año,
          foto_furgon: fotoFurgon, 
          rut_auxiliar: rutAuxiliar,
          nombre_auxiliar: nombreAuxiliar,
          telefono_auxiliar: telefonoAuxiliar,
          foto_auxiliar: fotoAuxiliar,
        }]);

      if (furgonError) {
        setMessage(`Error al registrar el furgón: ${furgonError.message}`);
      } else {
        if (rutEstudiante) {
          const { error: estudianteError } = await supabase
            .from('estudiantes')
            .update({ matricula_furgon: matricula })
            .eq('rut_estudiante', rutEstudiante);

          if (estudianteError) {
            setMessage(`Error al asignar estudiante al furgón: ${estudianteError.message}`);
          } else {
            setMessage('¡Furgón y estudiante registrados exitosamente!');
            // Redirigir a la página de administración después del registro exitoso
            navigate('/admin');
          }
        } else {
          setMessage('¡Furgón registrado exitosamente!');
          // Redirigir a la página de administración después del registro exitoso
          navigate('/admin');
        }
      }
    } catch (error) {
      setMessage(`Hubo un error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registrar Furgón</h2>

      {message && <p style={styles.message}>{message}</p>}

      {/* Ingreso de datos del furgón */}
      <div>
        <label>Matricula</label>
        <input
          type="text"
          value={matricula}
          onChange={(e) => setMatricula(e.target.value)}
          style={styles.input}
        />
      </div>

      <div>
        <label>Marca</label>
        <input
          type="text"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          style={styles.input}
        />
      </div>

      <div>
        <label>Modelo</label>
        <input
          type="text"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
          style={styles.input}
        />
      </div>

      <div>
        <label>Año</label>
        <input
          type="text"
          value={año}
          onChange={(e) => setAño(e.target.value)}
          style={styles.input}
        />
      </div>

      <div>
        <label>Foto Furgón</label>
        <input
          type="text"
          value={fotoFurgon} 
          onChange={(e) => setFotoFurgon(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Ingreso de datos auxiliar */}
      <div>
        <label>Rut Auxiliar</label>
        <input
          type="text"
          value={rutAuxiliar}
          onChange={(e) => setRutAuxiliar(e.target.value)}
          style={styles.input}
        />
      </div>

      <div>
        <label>Nombre Auxiliar</label>
        <input
          type="text"
          value={nombreAuxiliar}
          onChange={(e) => setNombreAuxiliar(e.target.value)}
          style={styles.input}
        />
      </div>

      <div>
        <label>Teléfono Auxiliar</label>
        <input
          type="text"
          value={telefonoAuxiliar}
          onChange={(e) => setTelefonoAuxiliar(e.target.value)}
          style={styles.input}
        />
      </div>

      <div>
        <label>Foto Auxiliar</label>
        <input
          type="text"
          value={fotoAuxiliar}
          onChange={(e) => setFotoAuxiliar(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Selección del conductor */}
      <div>
        <label>Conductor</label>
        <select
          value={rutConductor}
          onChange={(e) => setRutConductor(e.target.value)}
          style={styles.input}
        >
          <option value="">Selecciona un conductor</option>
          {conductores.map(conductor => (
            <option key={conductor.rut_usuario} value={conductor.rut_usuario}>
              {conductor.nombre_usuario}
            </option>
          ))}
        </select>
      </div>

      {/* Selección del estudiante */}
      <div>
        <label>Estudiante</label>
        <select
          value={rutEstudiante}
          onChange={(e) => setRutEstudiante(e.target.value)}
          style={styles.input}
        >
          <option value="">Selecciona un estudiante</option>
          {estudiantes.map(estudiante => (
            <option key={estudiante.rut_estudiante} value={estudiante.rut_estudiante}>
              {estudiante.nombre_estudiante}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleRegisterFurgon}
        disabled={loading}
        style={styles.button}
      >
        {loading ? 'Cargando...' : 'Registrar Furgón'}
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default RegistrarFurgon;
