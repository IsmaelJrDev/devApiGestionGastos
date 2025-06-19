import { useState, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import Card from "../components/Card";
import apiClient from "../services/api"; // Asegúrate de que este cliente de API esté bien configurado.

const Movimientos = () => {
    const [transactions, setTransactions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- Estado para el formulario de creación ---
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('Egreso');
    const [categoryId, setCategoryId] = useState('');

    // --- Estados para los filtros ---
    const [filterText, setFilterText] = useState('');   // Filtro por descripción (local)
    const [filterType, setFilterType] = useState('');   // Filtro por tipo (enviado al backend)
    const [filterDate, setFilterDate] = useState('');   // Filtro por fecha (enviado al backend)

    /**
     * ANOTACIÓN 1: Lógica de carga y filtrado centralizada.
     * Usamos `useCallback` para memorizar esta función. Solo se volverá a crear si 
     * una de sus dependencias (filterType, filterDate) cambia. Esto optimiza el rendimiento.
     */
    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        try {
            // Construimos los parámetros de consulta para la API.
            const params = new URLSearchParams();
            if (filterType) params.append('type', filterType);
            if (filterDate) params.append('date', filterDate);

            // Llamamos al nuevo endpoint unificado del backend.
            const response = await apiClient.get(`/transaction/filter?${params.toString()}`);
            setTransactions(response.data);

        } catch (error) {
            console.error("Error al cargar movimientos:", error);
            // Aquí podrías mostrar un mensaje de error al usuario.
        } finally {
            setLoading(false);
        }
    }, [filterType, filterDate]); // Dependencias de la función

    // Efecto para cargar las categorías (solo una vez al montar el componente).
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const catRes = await apiClient.get('/category');
                setCategories(catRes.data);
                // Pre-seleccionar la primera categoría si existe.
                if (catRes.data.length > 0) {
                    setCategoryId(catRes.data[0]._id);
                }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };
        fetchCategories();
    }, []);

    // ANOTACIÓN 2: Efecto para ejecutar la carga de datos.
    // Se dispara la primera vez y cada vez que la función `fetchTransactions` cambia (es decir, cuando los filtros cambian).
    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    // Manejador para el envío del formulario de creación.
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!categoryId) {
            alert("Por favor, seleccione una categoría."); // Considera usar un modal o toast en lugar de alert.
            return;
        }
        const transactionData = {
            description,
            amount: parseFloat(amount),
            type,
            category: categoryId,
            // La fecha se asignará por defecto en el backend.
        };
        try {
            await apiClient.post('/transaction', transactionData);
            
            // Limpiar formulario.
            setDescription('');
            setAmount('');
            setType('Egreso');
            
            // ANOTACIÓN 3: CORRECCIÓN CLAVE.
            // Después de crear una transacción, volvemos a llamar a la función de carga.
            // Esto refresca la lista y aplica los filtros actuales, mostrando el nuevo movimiento si coincide.
            fetchTransactions();

        } catch (error) {
            console.error("Error al agregar movimiento:", error);
        }
    };
    
    // Función para limpiar todos los filtros y recargar los datos.
    const handleResetFilters = () => {
        setFilterType('');
        setFilterDate('');
        setFilterText('');
        // No es necesario llamar a fetchTransactions() aquí porque el cambio de estado de los filtros
        // ya dispara el useEffect correspondiente.
    };

    // ANOTACIÓN 4: Filtrado local por descripción.
    // La data que viene del backend (ya filtrada por fecha y tipo) se filtra adicionalmente
    // por el texto de la descripción en el lado del cliente.
    const filteredTransactions = transactions.filter(t =>
        t.description.toLowerCase().includes(filterText.toLowerCase())
    );

    return (
        <section className="w-full max-w-4xl mx-auto p-4 md:p-6">
            {/* Formulario de creación */}
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 text-center mb-6">Agregar Movimiento</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="text-slate-600 font-semibold mb-1 block">Descripción:</label>
                        <input value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="Ej: Compra en supermercado" className="w-full p-2 bg-stone-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md transition" required />
                    </div>
                    <div>
                        <label className="text-slate-600 font-semibold mb-1 block">Monto:</label>
                        <input value={amount} onChange={e => setAmount(e.target.value)} type="number" step="0.01" placeholder="0.00" className="w-full p-2 bg-stone-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md transition" required />
                    </div>
                    <div>
                        <label className="text-slate-600 font-semibold mb-1 block">Tipo:</label>
                        <select value={type} onChange={e => setType(e.target.value)} className="w-full p-2 bg-stone-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md transition">
                            <option value="Egreso">Egreso</option>
                            <option value="Ingreso">Ingreso</option>
                        </select>
                    </div>
                    <div className="md:col-span-2">
                        <label className="text-slate-600 font-semibold mb-1 block">Categoría:</label>
                        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full p-2 bg-stone-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md transition" required>
                            <option value="" disabled>Seleccione una categoría</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-emerald-500 text-white font-bold rounded-lg px-6 py-2 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300">Agregar</button>
                </div>
            </form>

            {/* Sección de filtros */}
            <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
                <h2 className="text-xl font-bold text-slate-700 mb-4">Filtrar Movimientos</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="md:col-span-2">
                        <label className="text-slate-600 font-semibold mb-1 block">Buscar por descripción:</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input type="text" placeholder="Café, salario, etc..." className="w-full p-2 pl-10 bg-stone-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md transition" value={filterText} onChange={e => setFilterText(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="text-slate-600 font-semibold mb-1 block">Tipo:</label>
                        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="w-full p-2 bg-stone-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md transition">
                            <option value="">Todos</option>
                            <option value="Ingreso">Ingreso</option>
                            <option value="Egreso">Egreso</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-slate-600 font-semibold mb-1 block">Fecha:</label>
                        <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} className="w-full p-2 bg-stone-50 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-md transition" />
                    </div>
                    <div className="md:col-span-4 flex justify-end">
                        <button onClick={handleResetFilters} className="bg-gray-200 text-gray-700 font-semibold rounded-lg px-4 py-2 hover:bg-gray-300 transition-colors">Limpiar Filtros</button>
                    </div>
                </div>
            </div>

            {/* Lista de transacciones */}
            <div className="space-y-3">
                {loading ? (
                    <p className="text-center text-slate-500">Cargando movimientos...</p>
                ) : filteredTransactions.length > 0 ? (
                    filteredTransactions.map(tx => <Card key={tx._id} transaction={tx} />)
                ) : (
                    <p className="text-center text-slate-500 bg-white p-6 rounded-lg shadow">No se encontraron movimientos con los filtros aplicados.</p>
                )}
            </div>
        </section>
    );
};

export default Movimientos;
