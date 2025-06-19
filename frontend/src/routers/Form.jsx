import { useState } from "react";
import InputForm from "../components/InputForm";
import Button from "../components/Button";
import { login } from "../js/formularioLogin";

const Form = ({ ruta }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const manejarFormulario = (e) => {
        e.preventDefault();
        if (isRegister) {
            register(email, password);
            setIsRegister(false);
        } else {
            login(email, password);
            ruta("/dashboard");
        }
    };

    return (
        <form
            onSubmit={manejarFormulario}
            className=" shadow-lg p-4 rounded bg-gray-700 flex flex-col items-center gap-5 h-fit my-auto"
        >
            <h1 className=" text-emerald-200 text-3xl text-center font-bold">
                {isRegister ? "Registrate." : "Iniciar Sesión"}
            </h1>

            <p className=" text-xs">
                {" "}
                {isRegister
                    ? "Ya tienes una cuenta."
                    : "¿Aun no te registras?."}
                <span
                    className="text-emerald-300 cursor-pointer"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    Da click aqui.
                </span>
            </p>

            <div className="text-white bg-gray-600 rouned shadow w-full h-auto flex flex-col p-4 gap-2">
                <label>Email: </label>
                <InputForm
                    type="email"
                    placeHolder="correo@ejemplo.com"
                    isRequired={true}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password: </label>
                <InputForm
                    type="password"
                    placeHolder=""
                    isRequired={true}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button text={isRegister ? "Crear cuenta" : "Ingresar"} />
            </div>
        </form>
    );
};

export default Form;
