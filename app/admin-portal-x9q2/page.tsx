"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { FiLock, FiMail, FiArrowRight } from "react-icons/fi";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setStatus("error");
        setErrorMessage(error.message);
        return;
      }

      if (data.user) {
        setStatus("success");
        router.push("/");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Error de conexión. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f13] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo minimalistas */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF4C60] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6C6CE5] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-[#1a1a24] p-8 md:p-10 rounded-3xl shadow-2xl border border-[#2b2b36]">
          
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-[#2b2b36] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FiLock className="text-[#FF4C60] text-2xl" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Acceso Restringido</h1>
            <p className="text-gray-400 text-sm">Zona de administración exclusiva</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Correo Electrónico</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <FiMail />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0f0f13] text-white rounded-xl py-3.5 pl-11 pr-4 outline-none border border-[#2b2b36] focus:border-[#FF4C60] transition-colors"
                  placeholder="admin@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500">
                  <FiLock />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0f0f13] text-white rounded-xl py-3.5 pl-11 pr-4 outline-none border border-[#2b2b36] focus:border-[#FF4C60] transition-colors"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {status === "error" && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium animate-[fadeIn_0.3s_ease-out]">
                {errorMessage === "Invalid login credentials" 
                  ? "Credenciales incorrectas" 
                  : errorMessage}
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="w-full group flex items-center justify-center gap-2 bg-[#FF4C60] hover:bg-red-500 text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_5px_15px_rgba(255,76,96,0.2)] hover:shadow-[0_10px_25px_rgba(255,76,96,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {status === "loading" ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : status === "success" ? (
                "Acceso Concedido"
              ) : (
                <>
                  Iniciar Sesión
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

