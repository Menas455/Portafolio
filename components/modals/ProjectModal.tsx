"use client";

import { useState, useEffect } from "react";
import { FiX, FiSave, FiImage } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
  onSave: () => void;
}

export default function ProjectModal({ isOpen, onClose, project, onSave }: ProjectModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    github: "",
    live: "",
    tech: "",
    is_in_progress: false,
    image: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || "",
        description: project.description || "",
        category: project.category || "",
        github: project.github || "",
        live: project.live || "",
        tech: project.tech ? project.tech.join(", ") : "",
        is_in_progress: project.is_in_progress || false,
        image: project.image || ""
      });
      setImagePreview(project.image || "");
    } else {
      setFormData({ title: "", description: "", category: "", github: "", live: "", tech: "", is_in_progress: false, image: "" });
      setImagePreview("");
    }
    setImageFile(null);
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image;
    
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio_media')
      .upload(filePath, imageFile);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('portfolio_media').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const payload = {
        ...formData,
        image: imageUrl,
        tech: formData.tech.split(",").map(t => t.trim()).filter(t => t !== "")
      };

      if (project?.id) {
        const { error } = await supabase.from("projects").update(payload).eq("id", project.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([payload]);
        if (error) throw error;
      }
      
      onSave();
      onClose();
    } catch (err: any) {
      alert("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1a1a24] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-[#2b2b36] animate-[fadeIn_0.2s_ease-out] max-h-[90vh] flex flex-col">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-[#2b2b36] flex-shrink-0">
          <h2 className="text-xl font-bold text-[#353252] dark:text-white">
            {project ? "Editar Proyecto" : "Nuevo Proyecto"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#FF4C60] transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
          <form id="project-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Imagen Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Imagen de Portada</label>
              <div className="relative w-full h-48 bg-gray-100 dark:bg-[#0f0f13] rounded-xl border-2 border-dashed border-gray-300 dark:border-[#353252] flex flex-col items-center justify-center overflow-hidden hover:border-[#FF4C60] dark:hover:border-[#FF4C60] transition-colors group cursor-pointer">
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                ) : (
                  <FiImage size={32} className="text-gray-400 mb-2" />
                )}
                <div className="z-10 flex flex-col items-center">
                  <span className="bg-[#353252] text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-md">
                    {imagePreview ? "Cambiar Imagen" : "Subir Imagen"}
                  </span>
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Título</label>
                <input required type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Categoría</label>
                <input required type="text" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]" placeholder="Ej. FRONT-END" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tecnologías (separadas por coma)</label>
              <input required type="text" value={formData.tech} onChange={(e) => setFormData({...formData, tech: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]" placeholder="React, Node.js, Tailwind..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Enlace GitHub</label>
                <input required type="text" value={formData.github} onChange={(e) => setFormData({...formData, github: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Enlace Demo/Live</label>
                <input required type="text" value={formData.live} onChange={(e) => setFormData({...formData, live: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60] resize-none" />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.is_in_progress} onChange={(e) => setFormData({...formData, is_in_progress: e.target.checked})} className="w-5 h-5 rounded text-[#FF4C60] focus:ring-[#FF4C60] border-gray-300" />
              <span className="text-sm font-bold text-gray-600 dark:text-gray-300">Marcar como "En Desarrollo"</span>
            </label>

          </form>
        </div>

        <div className="p-6 border-t border-gray-100 dark:border-[#2b2b36] flex justify-end gap-3 flex-shrink-0 bg-gray-50/50 dark:bg-[#1a1a24]">
          <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-full text-gray-500 font-bold hover:bg-gray-100 dark:hover:bg-[#2b2b36] transition-colors">
            Cancelar
          </button>
          <button form="project-form" type="submit" disabled={loading} className="px-6 py-2.5 rounded-full bg-[#FF4C60] hover:bg-red-500 text-white font-bold transition-colors flex items-center gap-2 shadow-lg disabled:opacity-50">
            {loading ? "Guardando..." : <><FiSave /> Guardar</>}
          </button>
        </div>

      </div>
    </div>
  );
}

