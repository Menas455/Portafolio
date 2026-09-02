"use client";

import { useState, useEffect } from "react";
import { FiX, FiSave } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import * as Icons from "react-icons/fi";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: any;
  onSave: () => void;
}

const AVAILABLE_ICONS = [
  { id: "FiLayout", label: "Frontend / Web" },
  { id: "FiCode", label: "Código / Backend" },
  { id: "FiDatabase", label: "Bases de Datos" },
  { id: "FiSmartphone", label: "Móvil / Apps" },
  { id: "FiMonitor", label: "Software / Escritorio" },
  { id: "FiServer", label: "Servidores / API" },
  { id: "FiCloud", label: "Nube / Cloud" },
  { id: "FiLock", label: "Seguridad" },
  { id: "FiPenTool", label: "Diseño UI/UX" },
  { id: "FiCpu", label: "Hardware / Sistemas" },
  { id: "FiTerminal", label: "Terminal / Scripts" },
  { id: "FiTrendingUp", label: "SEO / Crecimiento" },
];

export default function ServiceModal({ isOpen, onClose, service, onSave }: ServiceModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon_name: "FiCode",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || "",
        description: service.description || "",
        icon_name: service.icon_name || "FiCode",
      });
    } else {
      setFormData({ title: "", description: "", icon_name: "FiCode" });
    }
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (service?.id) {
        const { error } = await supabase.from("services").update(formData).eq("id", service.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("services").insert([formData]);
        if (error) throw error;
      }
      onSave();
      onClose();
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1a1a24] rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-[#2b2b36] animate-[fadeIn_0.2s_ease-out]">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-[#2b2b36]">
          <h2 className="text-xl font-bold text-[#353252] dark:text-white">
            {service ? "Editar Servicio" : "Nuevo Servicio"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#FF4C60] transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[75vh]">
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Título del Servicio</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]"
              placeholder="Ej. Desarrollo Frontend"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Selecciona un Ícono</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {AVAILABLE_ICONS.map((icon) => {
                const IconComponent = (Icons as any)[icon.id];
                const isSelected = formData.icon_name === icon.id;
                return (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => setFormData({...formData, icon_name: icon.id})}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200 ${
                      isSelected 
                        ? 'bg-[#FF4C60]/10 border-[#FF4C60] text-[#FF4C60]' 
                        : 'bg-gray-50 dark:bg-[#0f0f13] border-gray-200 dark:border-[#2b2b36] text-gray-500 hover:border-gray-400'
                    }`}
                    title={icon.label}
                  >
                    {IconComponent && <IconComponent size={20} />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60] resize-none"
              placeholder="Describe lo que ofreces en este servicio..."
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2.5 rounded-full text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-[#2b2b36] transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="px-6 py-2.5 rounded-full bg-[#FF4C60] hover:bg-red-500 text-white font-bold transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loading ? "Guardando..." : <><FiSave /> Guardar</>}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

