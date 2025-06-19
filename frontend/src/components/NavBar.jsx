const NavBar = ({ruta,setRutas}) => {


    return (
        <nav className="w-full px-4 py-2 ">
            
            <ul className="flex justify-between">
                <div className="flex gap-3">
                    <li className={ruta=="/dashboard"?"cursor-pointer hover:text-emerald-500 text-amber-600":"cursor-pointer  hover:text-emerald-500 text-slate-600"} onClick={()=>{setRutas("/dashboard")}}>
                        Dashboard
                    </li>
                    <li className={ruta=="/categorias"?"cursor-pointer hover:text-emerald-500 text-amber-600":"cursor-pointer  hover:text-emerald-500 text-slate-600"} onClick={()=>setRutas("/categorias")}>
                        Categorias
                    </li>
                    <li className={ruta=="/movimientos"?"cursor-pointer hover:text-emerald-500 text-amber-600":"cursor-pointer  hover:text-emerald-500 text-slate-600"} onClick={()=>setRutas("/movimientos")}>
                        Movimientos
                    </li>
                </div>
                <li className="cursor-pointer text-slate-600 hover:text-emerald-500" onClick={()=>setRutas("/")}>
                    Cerrar sesión
                </li>
            </ul>
        </nav>
    )
}

export default NavBar