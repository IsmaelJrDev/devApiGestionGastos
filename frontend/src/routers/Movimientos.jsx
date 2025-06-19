import { Search } from "lucide-react";
import React from "react";
import Card from "../components/Card";

const Movimientos = () => {
    return (
        <section className="w-full">
            <form
                className="bg-white shadow text-center px-auto flex flex-col items-center"
                action=""
            >
                <h1 className="text-3xl ">Movimientos</h1>
                <div className="flex flex-col w-fit items-start ">
                    <label className="text-slate-600 ">Descripción:</label>
                    <textarea
                        className="w-[300px] bg-stone-50 border border-slate-500 focus:outline-none focus:border-emerald-400"
                        rows={2}
                    ></textarea>
                </div>

                <div className="flex flex-col w-fit items-start">
                    <label className="text-slate-600">Monto:</label>
                    <input
                        className="w-[300px] bg-stone-50 border border-slate-500 focus:outline-none focus:border-emerald-400"
                        type="number"
                    />
                </div>

                <div className="flex flex-col w-fit items-start">
                    <label className="text-slate-600">Tipo:</label>
                    <select className="w-[300px] bg-stone-50 border border-slate-500 focus:outline-none focus:border-emerald-400">
                        <option value="">ingreso</option>
                        <option value="">egreso</option>
                    </select>
                </div>

                <div className="flex flex-col w-fit items-start">
                    <label className="text-slate-600">Categoria</label>
                    <select className="w-[300px] bg-stone-50 border border-slate-500 focus:outline-none focus:border-emerald-400">
                        <option value="1">Categoria1</option>
                        <option value="2">Categoria2</option>
                        <option value="3">Categoria3</option>
                        <option value="4">Categoria4</option>
                    </select>
                </div>

                <div className="flex justify-end w-[300px]">
                    <button className="bg-emerald-400 text-white py-1 px-2 rounded hover:bg-emerald-600 my-3">
                        Agregar
                    </button>
                </div>
            </form>

            <form className="w-full flex justify-end">
                <div className="flex items-center mt-3 border-b gap-4">
                    <Search />
                    <input
                        className="focus:outline-none"
                        type="text"
                        placeholder="Filtrar resultados"
                    />
                </div>
            </form>
            <ul className="flex flex-col w-full h-full p-5 items-center gap-2">
                <Card type="ingreso" color="emerald" />
                <Card type="egreso" color="red" />
                <Card type="ingreso" color="emerald" />
                <Card type="egreso" color="red" />
                <Card type="egreso" color="red" />
                <Card type="egreso" color="red" />
            </ul>
        </section>
    );
};

export default Movimientos;
