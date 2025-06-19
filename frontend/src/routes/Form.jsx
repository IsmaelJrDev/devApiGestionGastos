import React, { useState } from "react";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import { login, register } from "../js/formularioLogin";

const Form = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Estados para manejar la retroalimentación al usuario
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFormSwitch = () => {
        setIsRegister(!isRegister);
        // Limpiar estados al cambiar de formulario
        setError("");
        setSuccessMessage("");
        setEmail("");
        setPassword("");
    };

    const manejaFormulario = async (e) => {
        e.preventDefault();
        // Limpiar mensajes previos antes de una nueva solicitud
        setError("");
        setSuccessMessage("");
        setLoading(true);

        try {
            if (isRegister) {
                // --- Lógica de Registro ---
                await register(email, password);
                setSuccessMessage(
                    "¡Registro exitoso! Ahora puedes iniciar sesión."
                );
                setIsRegister(false); // Cambia al modo "Iniciar Sesión"
                setPassword(""); // Limpia la contraseña por seguridad
            } else {
                await login(email, password);
                window.location.reload();
            }
        } catch (err) {
            setError(
                err.message ||
                    "Ocurrió un error inesperado. Inténtalo de nuevo."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={manejaFormulario}
            className="h-fit shadow-2xl p-6 rounded-lg bg-blue-900 flex flex-col items-center gap-5 w-full max-w-sm"
        >
            <h1 className="text-blue-300 text-3xl text-center font-bold">
                {isRegister ? "Crea tu Cuenta" : "Iniciar Sesión"}
            </h1>
            <p className="text-sm text-blue-100">
                {isRegister
                    ? "Ya tienes una cuenta, "
                    : "¿Aún no te registras? "}
                <span
                    className="text-blue-400 cursor-pointer font-semibold hover:underline"
                    onClick={handleFormSwitch}
                >
                    {isRegister ? "inicia sesión aquí" : "crea una cuenta"}
                </span>
            </p>

            {/* Mensajes de error y éxito */}
            {error && (
                <p className="text-red-300 bg-red-800/50 p-3 rounded-md w-full text-center font-semibold animate-pulse">
                    {error}
                </p>
            )}
            {successMessage && (
                <p className="text-blue-300 bg-blue-700/60 p-3 rounded-md w-full text-center font-semibold">
                    {successMessage}
                </p>
            )}

            <div className="text-white bg-blue-800 rounded-md shadow w-full h-auto flex flex-col p-4 gap-4">
                <div>
                    <label className="mb-2 block font-medium text-blue-100">
                        Correo Electrónico
                    </label>
                    <InputForm
                        evt={(e) => setEmail(e.target.value)}
                        value={email}
                        type={"email"}
                        placeHolder={"correo@ejemplo.com"}
                        isRequired={true}
                    />
                </div>
                <div>
                    <label className="mb-2 block font-medium text-blue-100">
                        Contraseña
                    </label>
                    <InputForm
                        evt={(e) => setPassword(e.target.value)}
                        value={password}
                        type={"password"}
                        placeHolder={"********"}
                        isRequired={true}
                    />
                </div>
                <div className="mt-3">
                    <Button
                        disabled={loading}
                        text={
                            loading
                                ? "Procesando..."
                                : isRegister
                                ? "Crear cuenta"
                                : "Ingresar"
                        }
                    />
                </div>
            </div>
        </form>
    );
};

export default Form;
