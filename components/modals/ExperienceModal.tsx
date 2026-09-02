"use client";

import { useState, useEffect } from "react";
import { FiX, FiSave } from "react-icons/fi";
import { supabase } from "@/lib/supabase";

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  experience?: any; // null for new
  onSave: () => void;
}

export default function ExperienceModal({ isOpen, onClose, experience, onSave }: ExperienceModalProps) {
  const [formData, setFormData] = useState({
    year: "",
    title: "",
    company: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (experience) {
      setFormData({
        year: experience.year || "",
        title: experience.title || "",
        company: experience.company || "",
        description: experience.description || "",
      });
    } else {
      setFormData({ year: "", title: "", company: "", description: "" });
    }
  }, [experience, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (experience?.id) {
        // Update
        const { error } = await supabase
          .from("experiences")
          .update(formData)
          .eq("id", experience.id);
        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from("experiences")
          .insert([formData]);
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
            {experience ? "Editar Experiencia" : "Nueva Experiencia"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#FF4C60] transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Año/Periodo</label>
              <input 
                required
                type="text" 
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: e.target.value})}
                className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]"
                placeholder="Ej. 2021 - 2023"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Empresa</label>
              <input 
                required
                type="text" 
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]"
                placeholder="Nombre de la empresa"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Puesto / Cargo</label>
            <input 
              required
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]"
              placeholder="Ej. Desarrollador Frontend"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60] resize-none"
              placeholder="Describe tus logros y responsabilidades..."
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

