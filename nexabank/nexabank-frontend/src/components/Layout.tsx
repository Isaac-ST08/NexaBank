import { useState } from "react";
import {
  BarChart3,
  CreditCard,
  LayoutDashboard,
  LogOut,
  Menu,
  Network,
  Settings,
  X,
  Zap
} from "lucide-react";
import {
  NavLink,
  Outlet,
  useNavigate
} from "react-router-dom";

export function Layout() {
  // Esta variable controla si el menú lateral está abierto
  // cuando estamos en una pantalla pequeña.
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("nexabank_token");
    navigate("/login");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* MENÚ LATERAL */}
      <aside
        className={
          "fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 " +
          "text-white transition-transform lg:translate-x-0 " +
          (menuOpen ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">

          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-indigo-600">
              <Zap size={21} />
            </div>

            <div>
              <p className="font-bold">NexaBank</p>
              <p className="text-xs text-slate-400">
                Control Center
              </p>
            </div>
          </div>

          <button
            className="lg:hidden"
            onClick={closeMenu}
          >
            <X />
          </button>
        </div>

        <nav className="space-y-1 p-4">

          <p className="px-3 pb-2 pt-3 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Principal
          </p>

          <NavLink
            to="/dashboard"
            onClick={closeMenu}
            className={({ isActive }) =>
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm " +
              "font-medium " +
              (isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-white/5 hover:text-white")
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/transactions"
            onClick={closeMenu}
            className={({ isActive }) =>
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm " +
              "font-medium " +
              (isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-white/5 hover:text-white")
            }
          >
            <CreditCard size={18} />
            Transacciones
          </NavLink>

          <NavLink
            to="/algorithms"
            onClick={closeMenu}
            className={({ isActive }) =>
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm " +
              "font-medium " +
              (isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-white/5 hover:text-white")
            }
          >
            <Network size={18} />
            Algoritmos
          </NavLink>

          <NavLink
            to="/benchmarks"
            onClick={closeMenu}
            className={({ isActive }) =>
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm " +
              "font-medium " +
              (isActive
                ? "bg-indigo-600 text-white"
                : "text-slate-300 hover:bg-white/5 hover:text-white")
            }
          >
            <BarChart3 size={18} />
            Benchmarks
          </NavLink>

          <p className="px-3 pb-2 pt-8 text-[11px] font-bold uppercase tracking-widest text-slate-500">
            Sistema
          </p>

          <button
            className={
              "flex w-full items-center gap-3 rounded-xl px-3 py-3 " +
              "text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            }
          >
            <Settings size={18} />
            Configuración
          </button>

          <button
            onClick={logout}
            className={
              "flex w-full items-center gap-3 rounded-xl px-3 py-3 " +
              "text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            }
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="lg:pl-64">

        <header
          className={
            "sticky top-0 z-30 flex h-20 items-center " +
            "justify-between border-b border-slate-200 bg-white/90 " +
            "px-5 backdrop-blur sm:px-8"
          }
        >
          <button
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>

          <div className="hidden lg:block">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              NexaBank
            </p>

            <p className="font-semibold text-slate-800">
              Panel administrativo
            </p>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">
                Administrador
              </p>

              <p className="text-xs text-slate-500">
                admin@nexabank.co
              </p>
            </div>

            <div className="grid h-10 w-10 place-items-center rounded-full bg-indigo-100 font-bold text-indigo-700">
              A
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
