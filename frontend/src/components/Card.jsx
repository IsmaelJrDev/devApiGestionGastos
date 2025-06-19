import { CircleArrowDown, CircleArrowUp } from "lucide-react";

const Card = ({ transaction }) => {
    const { type, description, category, amount, date } = transaction;

    const isIncome = type === "Ingreso";

    const color = isIncome ? "emerald" : "red";

    const formattedDate = new Date(date).toLocaleDateString("es-ES", {
        day: "2-digit",

        month: "2-digit",

        year: "numeric",
    });

    return (
        <li className="p-3 bg-gray-600 text-white rounded flex justify-between w-full md:w-8/12 shadow-lg">
            <div>
                <p
                    className={`flex text-2xl font-bold text-${color}-300 items-center gap-3`}
                >
                    {isIncome ? (
                        <CircleArrowUp size={35} strokeWidth={3} />
                    ) : (
                        <CircleArrowDown size={35} strokeWidth={3} />
                    )}

                    {description || "Sin descripción"}
                </p>

                {/* Asumimos que la categoría viene como un objeto con un 'name' */}

                <p className="text-sm text-stone-300 mt-1">
                    {category?.name || "Sin categoría"}
                </p>
            </div>

            <div className="text-right">
                <p className={`text-xl font-bold text-${color}-300`}>
                    {isIncome ? "+" : "-"} ${amount.toFixed(2)}
                </p>

                <p className="text-sm text-stone-300">{formattedDate}</p>
            </div>
        </li>
    );
};

export default Card;
