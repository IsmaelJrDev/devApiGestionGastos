import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import Card from "../components/Card";
import apiClient from "../services/conexion.service";
import toast, { Toaster } from "react-hot-toast";

const Movimientos = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Egreso");
    const [categoryId, setCategoryId] = useState("");

    const [filterText, setFilterText] = useState(""); // Single input for all filters

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (filterText) {
                params.append("searchText", filterText); // Esto envía el texto como 'searchText'
            }

            // Aquí es donde se hace la llamada a la API con los parámetros
            const response = await apiClient.get(
                `/transaction/filter?${params.toString()}`
            );
            setTransactions(response.data);
        } catch (error) {
            console.error("Error al cargar movimientos:", error);
            toast.error("Error al cargar movimientos.");
        } finally {
            setLoading(false);
        }
    }, [filterText]); // La dependencia filterText asegura que se refetchee cuando cambie

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const catRes = await apiClient.get("/category");
                setCategories(catRes.data);
                if (catRes.data.length > 0) {
                    setCategoryId(catRes.data[0]._id);
                }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryId) {
            toast.error("Por favor, selecciona una categoría.");
            return;
        }
        const transactionData = {
            description,
            amount: parseFloat(amount),
            type,
            category: categoryId,
        };
        try {
            const loadingToastId = toast.loading("Guardando movimiento...");
            await apiClient.post("/transaction", transactionData); // Sends a POST request to create a new transaction
            toast.success("Movimiento guardado con éxito!", {
                id: loadingToastId,
            });

            setDescription("");
            setAmount("");
            setType("Egreso");
            fetchTransactions();
        } catch (error) {
            console.error("Error al agregar movimiento:", error);
            toast.error("Error al guardar el movimiento. Intenta de nuevo.");
        }
    };

    const handleDeleteTransaction = async (transactionId) => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que quieres eliminar este movimiento? Esta acción no se puede deshacer."
        );
        if (!confirmDelete) return;

        try {
            const loadingToastId = toast.loading("Eliminando movimiento...");
            await apiClient.delete(`/transaction/${transactionId}`); // Sends a DELETE request to remove a transaction
            toast.success("Movimiento eliminado con éxito.", {
                id: loadingToastId,
            });
            fetchTransactions();
        } catch (error) {
            console.error("Error al eliminar movimiento:", error);
            const errorMessage =
                error.response?.data?.message ||
                "Error al eliminar el movimiento. Por favor, intenta de nuevo.";
            toast.error(errorMessage);
        }
    };

    const handleApplyFilters = () => {
        fetchTransactions(); // Trigger a refetch with current filter states
    };

    const handleClearFilters = () => {
        setFilterText("");
        // No need to call fetchTransactions here, useEffect will handle it when states change
    };

    return (
        <section className="w-full max-w-5xl mx-auto px-4 md:px-6 py-10 space-y-10">
            <Toaster position="top-right" reverseOrder={false} />

            {/* Formulario */}
            <form
                onSubmit={handleSubmit}
                className="bg-gradient-to-br from-blue-50 to-white shadow-lg rounded-2xl p-8 border border-blue-200"
            >
                <h1 className="text-3xl font-extrabold text-blue-800 text-center mb-8">
                    Nuevo Movimiento
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                        <label className="text-blue-700 font-medium block mb-1">
                            Descripción
                        </label>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder="Ej: Café, compra en línea, salario"
                            className="w-full p-3 border border-blue-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-blue-700 font-medium block mb-1">
                            Monto
                        </label>
                        <input
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            className="w-full p-3 border border-blue-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-blue-700 font-medium block mb-1">
                            Tipo
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full p-3 border border-blue-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                        >
                            <option value="Egreso">Gasto</option>
                            <option value="Ingreso">Ingreso</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-blue-700 font-medium block mb-1">
                            Categoría
                        </label>
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            className="w-full p-3 border border-blue-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            required
                        >
                            <option value="" disabled>
                                Selecciona una categoría
                            </option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-8 py-3 shadow transition-all duration-300 transform hover:scale-105"
                    >
                        Guardar Movimiento
                    </button>
                </div>
            </form>

            {/* Filtros */}
            <div className="bg-white shadow-lg rounded-2xl p-8 border border-blue-100">
                <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                    Buscar Movimiento
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                    <div className="md:col-span-3 relative">
                        <label className="text-blue-700 font-medium mb-1 block">
                            Buscar por descripción, tipo, fecha o categoría
                        </label>
                        <Search
                            className="absolute left-4 top-11 text-gray-400 z-10"
                            size={20}
                        />
                        <input
                            type="text"
                            placeholder="Ej: Café, ingreso, comida, 2025..."
                            className="w-full pl-11 p-3 border border-blue-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                            value={filterText}
                            onChange={(e) => setFilterText(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end md:justify-start pt-2">
                        <button
                            onClick={handleClearFilters}
                            className="bg-gray-200 text-gray-800 font-semibold rounded-xl px-6 py-2.5 hover:bg-gray-300 border border-gray-300 transition"
                        >
                            Borrar Filtro
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista */}
            <div className="space-y-4">
                {loading ? (
                    <div className="bg-white shadow-md rounded-xl text-center p-8 text-blue-600 font-medium animate-pulse">
                        Cargando movimientos...
                    </div>
                ) : transactions.length > 0 ? (
                    transactions.map((tx) => (
                        <Card
                            key={tx._id}
                            transaction={tx}
                            onDelete={handleDeleteTransaction}
                        />
                    ))
                ) : (
                    <div className="bg-white shadow-md border border-blue-100 rounded-xl p-6 text-center text-gray-500 font-medium">
                        No se encontraron movimientos.
                    </div>
                )}
            </div>
        </section>
    );
};

export default Movimientos;
