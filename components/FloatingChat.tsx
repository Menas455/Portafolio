"use client";

import { useState } from "react";
import Image from "next/image";
import { FiMessageSquare, FiX, FiSend } from "react-icons/fi";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Reemplaza esto con tu número real (incluyendo el código de país, ej: 573001234567 para Colombia)
  const WHATSAPP_NUMBER = "573000000000"; 

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Redirigir a WhatsApp con el mensaje preescrito
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-24 lg:bottom-8 right-6 z-50">
      
      {/* Ventana de Chat */}
      <div 
        className={`absolute bottom-20 right-0 bg-white dark:bg-[#1a1a24] w-[320px] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.4)] border border-gray-100 dark:border-[#2b2b36] overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100 pointer-events-auto" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-[#FF4C60] p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white/20">
              <Image 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=FFD15C" 
                alt="Avatar" 
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm">Michael Mena</h4>
              <p className="text-xs text-white/80 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-400"></span> En línea
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body (Mensajes) */}
        <div className="p-4 bg-gray-50 dark:bg-[#0f0f13] h-[250px] overflow-y-auto flex flex-col gap-4">
          <p className="text-xs text-center text-gray-400 my-2">Hoy</p>
          
          <div className="flex items-end gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
              <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=FFD15C" alt="Avatar" fill />
            </div>
            <div className="bg-white dark:bg-[#1a1a24] p-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 dark:border-[#2b2b36] text-sm text-[#353252] dark:text-[#f2f2f2]">
              ¡Hola! 👋 Gracias por visitar mi portafolio. ¿En qué te puedo ayudar hoy?
            </div>
          </div>
        </div>

        {/* Footer (Input) */}
        <div className="p-3 bg-white dark:bg-[#1a1a24] border-t border-gray-100 dark:border-[#2b2b36]">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 bg-gray-100 dark:bg-[#0f0f13] text-sm text-[#353252] dark:text-[#f2f2f2] rounded-full px-4 py-2 outline-none border border-transparent focus:border-[#FF4C60]/30 transition-colors"
            />
            <button 
              type="submit"
              disabled={!message.trim()}
              className="w-10 h-10 rounded-full bg-[#FF4C60] flex items-center justify-center text-white flex-shrink-0 hover:bg-red-500 disabled:opacity-50 transition-colors"
            >
              <FiSend size={18} className="-ml-0.5" />
            </button>
          </form>
        </div>
      </div>

      {/* Botón Flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 flex items-center justify-center rounded-full shadow-[0_10px_25px_rgba(255,76,96,0.4)] bg-[#FF4C60] text-white transition-all duration-300 hover:scale-110"
      >
        {isOpen ? (
          <FiX size={24} className="animate-[fadeIn_0.3s_ease-in-out]" />
        ) : (
          <FiMessageSquare size={24} className="animate-[fadeIn_0.3s_ease-in-out]" />
        )}
      </button>

    </div>
  );
}

