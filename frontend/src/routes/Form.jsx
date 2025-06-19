import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import Button from '../components/Button';
import { login, register } from '../js/formularioLogin';

const Form = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para manejar la retroalimentación al usuario
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFormSwitch = () => {
    setIsRegister(!isRegister);
    // Limpiar estados al cambiar de formulario
    setError('');
    setSuccessMessage('');
    setEmail('');
    setPassword('');
  };

  const manejaFormulario = async (e) => {
    e.preventDefault();
    // Limpiar mensajes previos antes de una nueva solicitud
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (isRegister) {
        // --- Lógica de Registro ---
        await register(email, password);
        // ANOTACIÓN 1: Experiencia de usuario mejorada.
        // En lugar de un 'alert', mostramos un mensaje de éxito y cambiamos
        // automáticamente al formulario de login para que el usuario pueda ingresar.
        setSuccessMessage('¡Registro exitoso! Ahora puedes iniciar sesión.');
        setIsRegister(false); // Cambia al modo "Iniciar Sesión"
        setPassword(''); // Limpia la contraseña por seguridad
      } else {
        // --- Lógica de Login ---
        await login(email, password);
        // ANOTACIÓN 2: Navegación correcta.
        // Forzamos un reload para que el componente principal (App.jsx)
        // detecte el nuevo token en localStorage y redirija al dashboard.
        // Esta es una solución funcional. Una más avanzada sería usar React Context o Zustand.
        window.location.reload(); 
      }
    } catch (err) {
      // ANOTACIÓN 3: Manejo de errores del backend.
      // El error que lanzamos desde el backend (`error.response.data.message`)
      // se captura aquí y se muestra al usuario.
      setError(err.message || 'Ocurrió un error inesperado. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={manejaFormulario} className="h-fit shadow-2xl p-6 rounded-lg bg-gray-700 flex flex-col items-center gap-5 w-full max-w-sm">
      <h1 className="text-emerald-300 text-3xl text-center font-bold">
        {isRegister ? "Crea tu Cuenta" : "Iniciar Sesión"}
      </h1>
      <p className="text-sm text-white">
        {isRegister ? "Ya tienes una cuenta, " : "¿Aún no te registras? "}
        <span className="text-emerald-400 cursor-pointer font-semibold hover:underline" onClick={handleFormSwitch}>
          {isRegister ? "inicia sesión aquí" : "crea una cuenta"}
        </span>
      </p>
      
      {/* Mensajes de error y éxito */}
      {error && <p className="text-red-400 bg-red-900/60 p-3 rounded-md w-full text-center font-semibold animate-pulse">{error}</p>}
      {successMessage && <p className="text-green-300 bg-green-900/60 p-3 rounded-md w-full text-center font-semibold">{successMessage}</p>}

      <div className="text-white bg-gray-600 rounded-md shadow w-full h-auto flex flex-col p-4 gap-4">
        <div>
          <label className='mb-2 block font-medium'>Correo Electrónico</label>
          <InputForm
            evt={(e) => setEmail(e.target.value)}
            value={email}
            type={"email"}
            placeHolder={"correo@ejemplo.com"}
            isRequired={true}
          />
        </div>
        <div>
          <label className='mb-2 block font-medium'>Contraseña</label>
          <InputForm
            evt={(e) => setPassword(e.target.value)}
            value={password}
            type={"password"}
            placeHolder={"********"}
            isRequired={true}
          />
        </div>
        <div className='mt-3'>
            <Button disabled={loading} text={loading ? "Procesando..." : (isRegister ? "Crear cuenta" : "Ingresar")} />
        </div>
      </div>
    </form>
  );
}

export default Form;
