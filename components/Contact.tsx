"use client";

import { useState } from "react";
import { FiSend, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xyeywwdq", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        
        // Volver al estado normal después de 5 segundos
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full transition-colors duration-300">
      
      {/* Contenedor Principal con estilo "Tarjeta" */}
      <div className="bg-white dark:bg-[#1a1a24] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] border border-transparent dark:border-[#2b2b36] flex flex-col md:flex-row">
        
        {/* Lado Izquierdo: Mensaje Motivacional */}
        <div className="w-full md:w-5/12 bg-[#353252] dark:bg-[#0f0f13] p-10 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#FF4C60] rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-[#6C6CE5] rounded-full blur-3xl opacity-30"></div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">¿Listo para empezar?</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-8">
              Me encanta afrontar nuevos retos y colaborar en proyectos innovadores. 
              Si tienes una idea, un puesto en tu equipo, o simplemente quieres saludar, 
              utiliza el formulario para enviarme un mensaje directo.
            </p>
          </div>

          <div className="relative z-10 mt-8">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
              Encuéntrame en
            </h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD15C] hover:text-[#353252] transition-colors duration-300">
                <FaLinkedinIn size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFD15C] hover:text-[#353252] transition-colors duration-300">
                <FaGithub size={18} />
              </a>
              <a href="https://wa.me/04124385220" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-colors duration-300">
                <FaWhatsapp size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Formulario Limpio */}
        <div className="w-full md:w-7/12 p-10 md:p-12 bg-white dark:bg-[#1a1a24]">
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Nombre completo</label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  className="bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-[#f2f2f2] rounded-xl px-4 py-3 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60] dark:focus:border-[#FF4C60] transition-colors"
                  placeholder="Ej. Juan Pérez"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Correo electrónico</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-[#f2f2f2] rounded-xl px-4 py-3 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60] dark:focus:border-[#FF4C60] transition-colors"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            {/* Honeypot Anti-Spam: Campo invisible para atrapar bots */}
            <input type="text" name="_gotcha" className="hidden" style={{ display: "none" }} />

            <div className="flex flex-col">
              <label htmlFor="subject" className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Asunto</label>
              <input 
                type="text" 
                id="subject"
                name="subject" 
                className="bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-[#f2f2f2] rounded-xl px-4 py-3 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60] dark:focus:border-[#FF4C60] transition-colors"
                placeholder="¿En qué te puedo ayudar?"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Mensaje</label>
              <textarea 
                id="message" 
                name="message"
                rows={4}
                className="bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-[#f2f2f2] rounded-xl px-4 py-3 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60] dark:focus:border-[#FF4C60] transition-colors resize-none"
                placeholder="Cuéntame un poco más sobre tu idea o propuesta..."
                required
              ></textarea>
            </div>

            <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
              <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className={`group flex items-center justify-center gap-2 font-bold py-3 px-8 rounded-full transition-all duration-300 w-full sm:w-auto ${
                  status === "success" 
                    ? "bg-[#44D7B6] text-white shadow-none cursor-default" 
                    : "bg-[#FF4C60] hover:bg-red-500 text-white shadow-[0_5px_15px_rgba(255,76,96,0.2)] hover:shadow-[0_10px_25px_rgba(255,76,96,0.4)] hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                }`}
              >
                {status === "idle" && (
                  <>
                    Enviar Mensaje
                    <FiSend className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </>
                )}
                {status === "loading" && (
                  <>
                    Enviando...
                    <svg className="animate-spin h-5 w-5 ml-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </>
                )}
                {status === "success" && (
                  <>
                    ¡Enviado con éxito!
                    <FiCheckCircle size={18} />
                  </>
                )}
                {status === "error" && (
                  <>
                    Error al enviar
                    <FiXCircle size={18} />
                  </>
                )}
              </button>

              {/* Mensajes de feedback textual debajo/lado del botón */}
              {status === "success" && (
                <span className="text-sm text-[#44D7B6] font-medium animate-[fadeIn_0.3s_ease-in-out]">
                  Gracias por escribirme. Te responderé pronto.
                </span>
              )}
              {status === "error" && (
                <span className="text-sm text-red-500 font-medium animate-[fadeIn_0.3s_ease-in-out]">
                  Revisa tu conexión e intenta nuevamente.
                </span>
              )}
            </div>
          </form>
        </div>
        
      </div>
    </section>
  );
}
