import React from "react"; // Asegúrate de importar React

const NavBar = ({ ruta, setRutas }) => {
    // Clase base para todos los elementos de navegación
    const navItemBaseClasses =
        "relative px-4 py-2 rounded-md transition-all duration-300 ease-in-out font-medium";

    // Función para obtener las clases dinámicas según si la ruta está activa
    const getNavItemClasses = (currentPath) => {
        return `${navItemBaseClasses} ${
            ruta === currentPath
                ? "bg-blue-600 text-white shadow-md" // Estilo para la ruta activa
                : "text-gray-700 hover:bg-gray-100 hover:text-blue-600" // Estilo para rutas inactivas
        }`;
    };

    return (
        <nav className="w-full bg-white shadow-lg py-3 px-6 rounded-b-xl mb-4">
            <ul className="flex justify-between items-center max-w-6xl mx-auto">
                <div className="flex space-x-4">
                    <li
                        className={getNavItemClasses("/dashboard")}
                        onClick={() => setRutas("/dashboard")}
                    >
                        Dashboard
                    </li>
                    <li
                        className={getNavItemClasses("/categorias")}
                        onClick={() => setRutas("/categorias")}
                    >
                        Categorías
                    </li>
                    <li
                        className={getNavItemClasses("/movimientos")}
                        onClick={() => setRutas("/movimientos")}
                    >
                        Movimientos
                    </li>
                </div>
                <li>
                    <button
                        className="px-5 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" // Botón de "Cerrar Sesión" más definido
                        onClick={() => setRutas("/")}
                    >
                        Cerrar sesión
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
