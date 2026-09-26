import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LockKeyhole,
  Mail,
  ShieldCheck,
  Zap
} from "lucide-react";

import { Button } from "../components/ui";
import { login } from "../api/auth.api";

function LoginPage() {
  const [email, setEmail] = useState("admin@nexabank.co");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    try {
      // Primero intentamos conectarnos al backend.
      const response = await login(email, password);

      // Guardamos el token que envía Spring Boot.
      localStorage.setItem(
        "nexabank_token",
        response.token
      );

      navigate("/dashboard");
    } catch (error) {
      // Por ahora usamos un token de prueba si el backend
      // todavía no está conectado.
      console.log("Backend no disponible:", error);

      localStorage.setItem(
        "nexabank_token",
        "demo-token"
      );

      navigate("/dashboard");
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-950">

      <div className="mx-auto grid min-h-screen max-w-6xl lg:grid-cols-2">

        {/* PARTE IZQUIERDA */}
        <div className="hidden flex-col justify-between p-12 text-white lg:flex">

          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-600">
              <Zap />
            </div>

            <span className="text-xl font-bold">
              NexaBank
            </span>
          </div>

          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[.25em] text-indigo-300">
              Full-Stack Banking Lab
            </p>

            <h1 className="max-w-lg text-5xl font-black leading-tight">
              Datos reales, algoritmos medibles.
            </h1>

            <p className="mt-5 max-w-lg text-slate-400">
              Dashboard para explorar cuentas, transacciones,
              MergeSort, QuickSort, BinarySearch y benchmarks JMH.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShieldCheck size={17} />
            Entorno académico NexaBank
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="flex items-center justify-center bg-white p-6 sm:p-12">

          <div className="w-full max-w-md">

            <div className="mb-9 lg:hidden">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-indigo-600 text-white">
                  <Zap />
                </div>

                <span className="text-xl font-bold">
                  NexaBank
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-slate-950">
              Bienvenido
            </h2>

            <p className="mt-2 text-slate-500">
              Ingresa para acceder al dashboard.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {/* CORREO */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Correo
                </span>

                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3.5 text-slate-400"
                    size={18}
                  />

                  <input
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    className={
                      "w-full rounded-xl border border-slate-200 " +
                      "py-3 pl-10 pr-3 outline-none " +
                      "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    }
                  />
                </div>
              </label>

              {/* CONTRASEÑA */}
              <label className="block">
                <span className="mb-2 block text-sm font-semibold">
                  Contraseña
                </span>

                <div className="relative">
                  <LockKeyhole
                    className="absolute left-3 top-3.5 text-slate-400"
                    size={18}
                  />

                  <input
                    type="password"
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    className={
                      "w-full rounded-xl border border-slate-200 " +
                      "py-3 pl-10 pr-3 outline-none " +
                      "focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    }
                  />
                </div>
              </label>

              <Button
                className="w-full py-3.5"
                disabled={loading}
              >
                {loading
                  ? "Ingresando..."
                  : "Iniciar sesión"}
              </Button>
            </form>

            <p className="mt-6 rounded-xl bg-slate-50 p-3 text-center text-xs text-slate-500">
              Demo: admin@nexabank.co / 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
