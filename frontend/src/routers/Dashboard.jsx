import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import React from "react";
import Card from "../components/Card";

const Dashboard = () => {
    return (
        <>
            <h1 className="text-3xl font-bold text-emerald-800">
                Ultimos 6 movimientos
            </h1>
            <ul className="flex flex-col w-full h-full p-5 items-center gap-2">
                <Card type="ingreso" color="emerald" />
                <Card type="egreso" color="red" />
                <Card type="ingreso" color="emerald" />
                <Card type="egreso" color="red" />
                <Card type="egreso" color="red" />
                <Card type="egreso" color="red" />
            </ul>
            <p className=""></p>
        </>
    );
};

export default Dashboard;
