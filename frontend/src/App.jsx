import { useState, useEffect } from "react";
import Dashboard from "./routes/Dashboard";
import Form from "./routes/Form";
import NavBar from "./components/NavBar";
import Categorias from "./routes/Categorias";
import Movimientos from "./routes/Movimientos";
import { logout } from "./js/formularioLogin";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // ANOTACIÓN: La ruta ahora se basa en la URL para un enrutamiento más robusto.
  const [ruta, setRuta] = useState(window.location.pathname);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Si está autenticado y en la página de login, redirige al dashboard.
      if (ruta === "/") {
        setRuta("/dashboard");
      }
    } else {
      setRuta("/"); // Si no hay token, fuerza la ruta de login.
    }
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente.

  const handleSetRuta = (nuevaRuta) => {
    if (nuevaRuta === "/") {
      logout();
      setIsAuthenticated(false);
    }
    setRuta(nuevaRuta);
  };

  // Función para renderizar el componente correcto basado en la ruta
  const renderContent = () => {
    if (!isAuthenticated) {
      return <Form />;
    }
    switch (ruta) {
      case "/dashboard":
        return <Dashboard />;
      case "/categorias":
        return <Categorias />;
      case "/movimientos":
        return <Movimientos />;
      default:
        return <Dashboard />; // Redirigir al dashboard por defecto si la ruta es desconocida
    }
  };

  return (
    <div className="w-screen min-h-screen bg-slate-100 flex flex-col items-center">
      {isAuthenticated && <NavBar ruta={ruta} setRutas={handleSetRuta} />}
      <main className="w-full max-w-4xl flex-grow flex justify-center items-center p-4">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;