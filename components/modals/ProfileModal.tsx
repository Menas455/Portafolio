"use client";

import { useState, useEffect } from "react";
import { FiX, FiSave, FiPlus, FiImage } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile?: any;
  onSave: () => void;
}

const PREDEFINED_TOOLS = [
  "React", "React Native", "Next.js", "Node.js", "Laravel", "Supabase", 
  "PostgreSQL", "MySQL", "Tailwind CSS", "TypeScript", "JavaScript", 
  "Python", "PHP", "Git", "Docker", "AWS", "Firebase", "MongoDB", "Express",
  "Angular", "Vue.js", "SASS", "Figma", "HTML5", "CSS3", "Redux", "GraphQL"
];

export default function ProfileModal({ isOpen, onClose, profile, onSave }: ProfileModalProps) {
  const [formData, setFormData] = useState({
    about_text: "",
    hero_image: "",
    about_image: ""
  });
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImagePreview, setHeroImagePreview] = useState<string>("");
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null);
  const [aboutImagePreview, setAboutImagePreview] = useState<string>("");

  useEffect(() => {
    if (profile) {
      setFormData({
        about_text: profile.about_text || "",
        hero_image: profile.hero_image || "",
        about_image: profile.about_image || ""
      });
      setSelectedTools(profile.tools || []);
      setHeroImagePreview(profile.hero_image || "");
      setAboutImagePreview(profile.about_image || "");
    } else {
      setFormData({ about_text: "", hero_image: "", about_image: "" });
      setSelectedTools([]);
      setHeroImagePreview("");
      setAboutImagePreview("");
    }
    setSearchTerm("");
    setHeroImageFile(null);
    setAboutImageFile(null);
  }, [profile, isOpen]);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'hero' | 'about') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'hero') {
        setHeroImageFile(file);
        setHeroImagePreview(URL.createObjectURL(file));
      } else {
        setAboutImageFile(file);
        setAboutImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const uploadImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `profile/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('portfolio_media')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from('portfolio_media').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalHeroImage = formData.hero_image;
      let finalAboutImage = formData.about_image;

      if (heroImageFile) finalHeroImage = await uploadImage(heroImageFile);
      if (aboutImageFile) finalAboutImage = await uploadImage(aboutImageFile);

      const payload = {
        id: 1, // Siempre 1 para el perfil principal
        about_text: formData.about_text,
        tools: selectedTools,
        hero_image: finalHeroImage,
        about_image: finalAboutImage
      };

      const { error } = await supabase
        .from("profile")
        .upsert(payload, { onConflict: 'id' });
        
      if (error) throw error;

      onSave();
      onClose();
    } catch (err: any) {
      alert("Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTool = (tool: string) => {
    if (!selectedTools.includes(tool)) {
      setSelectedTools([...selectedTools, tool]);
    }
    setSearchTerm("");
  };

  const removeTool = (tool: string) => {
    setSelectedTools(selectedTools.filter(t => t !== tool));
  };

  const filteredTools = PREDEFINED_TOOLS.filter(t => 
    t.toLowerCase().includes(searchTerm.toLowerCase()) && 
    !selectedTools.includes(t)
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#1a1a24] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-[#2b2b36] animate-[fadeIn_0.2s_ease-out]">
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-[#2b2b36]">
          <h2 className="text-xl font-bold text-[#353252] dark:text-white">
            Editar Perfil y Herramientas
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#FF4C60] transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hero Image Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Imagen del Header (Hero)</label>
              <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center hover:border-[#FF4C60] transition-colors bg-gray-50 dark:bg-[#0f0f13] h-40 flex flex-col items-center justify-center overflow-hidden">
                {heroImagePreview ? (
                  <Image src={heroImagePreview} alt="Hero Preview" fill className="object-cover opacity-80" />
                ) : (
                  <FiImage className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-black/60 px-2 py-1 rounded">
                    {heroImagePreview ? "Cambiar Imagen" : "Subir Imagen"}
                  </span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'hero')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* About Image Upload */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Imagen de Sobre Mí (Avatar)</label>
              <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-4 text-center hover:border-[#FF4C60] transition-colors bg-gray-50 dark:bg-[#0f0f13] h-40 flex flex-col items-center justify-center overflow-hidden">
                {aboutImagePreview ? (
                  <Image src={aboutImagePreview} alt="About Preview" fill className="object-cover opacity-80" />
                ) : (
                  <FiImage className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                )}
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-black/60 px-2 py-1 rounded">
                    {aboutImagePreview ? "Cambiar Imagen" : "Subir Imagen"}
                  </span>
                  <input type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'about')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Acerca de Mí (Biografía)</label>
            <textarea 
              required
              rows={5}
              value={formData.about_text}
              onChange={(e) => setFormData({...formData, about_text: e.target.value})}
              className="w-full bg-gray-50 dark:bg-[#0f0f13] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60] resize-none whitespace-pre-wrap"
              placeholder="Soy un ingeniero apasionado por..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Herramientas (Tech Stack)</label>
            
            {/* Herramientas seleccionadas */}
            <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 dark:bg-[#0f0f13] rounded-xl border border-gray-200 dark:border-[#2b2b36] min-h-[60px]">
              {selectedTools.length === 0 ? (
                <span className="text-gray-400 text-sm my-auto">Aún no hay herramientas agregadas...</span>
              ) : (
                selectedTools.map((tool) => (
                  <span key={tool} className="flex items-center gap-2 bg-[#353252] text-white px-3 py-1.5 rounded-full text-sm">
                    {tool}
                    <button type="button" onClick={() => removeTool(tool)} className="hover:text-[#FF4C60] transition-colors">
                      <FiX />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Buscador y opciones */}
            <div className="relative">
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchTerm.trim() !== "") {
                    e.preventDefault();
                    addTool(searchTerm.trim());
                  }
                }}
                className="w-full bg-white dark:bg-[#1a1a24] text-[#353252] dark:text-white rounded-xl py-3 px-4 outline-none border border-gray-200 dark:border-[#2b2b36] focus:border-[#FF4C60]"
                placeholder="Busca o escribe una herramienta y presiona Enter..."
              />
              
              {searchTerm && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#2b2b36] border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                  {filteredTools.map((tool) => (
                    <button
                      key={tool}
                      type="button"
                      onClick={() => addTool(tool)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-[#353252] dark:text-white flex items-center gap-2"
                    >
                      <FiPlus size={14} className="text-[#FF4C60]" /> {tool}
                    </button>
                  ))}
                  {filteredTools.length === 0 && searchTerm.trim() !== "" && (
                    <button
                      type="button"
                      onClick={() => addTool(searchTerm.trim())}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-[#353252] dark:text-white flex items-center gap-2 italic"
                    >
                      <FiPlus size={14} className="text-[#FF4C60]" /> Añadir "{searchTerm.trim()}" (Personalizada)
                    </button>
                  )}
                </div>
              )}
            </div>
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

