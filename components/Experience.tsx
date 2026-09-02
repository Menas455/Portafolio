"use client";

import { useState, useEffect } from "react";
import { FiBriefcase, FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import AdminControls from "./AdminControls";
import ExperienceModal from "./modals/ExperienceModal";

export default function Experience() {
  const [experiences, setExperiences] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<any>(null);

  const fetchExperiences = async () => {
    const { data } = await supabase.from("experiences").select("*").order("created_at", { ascending: true });
    if (data) setExperiences(data);
  };

  useEffect(() => {
    fetchExperiences();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar esta experiencia?")) {
      await supabase.from("experiences").delete().eq("id", id);
      fetchExperiences();
    }
  };

  const openAddModal = () => {
    setEditingExperience(null);
    setIsModalOpen(true);
  };

  const openEditModal = (exp: any) => {
    setEditingExperience(exp);
    setIsModalOpen(true);
  };

  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);
  const hiddenCount = experiences.length - 3;

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-6 max-w-4xl relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
          <div className="relative inline-block ml-4">
            {/* Dot pattern */}
            <div className="absolute -top-4 -left-6 w-12 h-12 flex flex-wrap gap-1 opacity-20 dark:opacity-10 pointer-events-none z-0">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-indigo-900 dark:bg-white rounded-full"></div>
              ))}
            </div>
            
            {/* Green Squiggle */}
            <div className="absolute -top-6 left-1/2 text-[#3ECF8E] z-0 opacity-80 rotate-12">
              <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2,7 Q7,-3 12,7 T22,7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-[#353252] dark:text-[#f2f2f2] relative z-10">
              Experiencia Profesional
            </h2>
          </div>
          {session && (
            <button 
              onClick={openAddModal} 
              className="flex items-center gap-2 bg-[#353252] hover:bg-[#6C6CE5] text-white px-5 py-2.5 rounded-full font-bold transition-all duration-300 shadow-[0_5px_15px_rgba(108,108,229,0.3)] hover:-translate-y-1 text-sm z-20 flex-shrink-0"
            >
              <FiPlus size={18} /> Añadir
            </button>
          )}
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 dark:bg-[#1a1a24] rounded-2xl border border-gray-100 dark:border-[#2b2b36]">
            <p className="text-gray-500 font-medium">No hay registros de experiencia. {session ? 'Haz clic en "Añadir" para crear uno.' : ''}</p>
          </div>
        ) : (
          <div className="relative ml-3 md:ml-0">
            {/* Línea central visible solo en PC */}
            <div className="hidden md:block absolute left-1/2 -ml-[1px] top-0 h-full w-[2px] bg-gray-200 dark:bg-[#2b2b36]"></div>
            
            {/* Línea izquierda visible solo en móvil */}
            <div className="md:hidden absolute left-0 top-0 h-full w-[2px] bg-gray-200 dark:bg-[#2b2b36]"></div>

            <div className="space-y-8 md:space-y-0">
              {visibleExperiences.map((exp, index) => {
                const isEven = index % 2 === 0;
                const textColor = isEven ? "text-[#FF4C60]" : "text-[#6C6CE5]";
                
                return (
                  <div key={exp.id} className="relative flex flex-col md:flex-row items-center md:mb-12 group">
                    
                    {/* Icono móvil */}
                    <div 
                      className={`md:hidden absolute left-[-20px] top-4 w-10 h-10 rounded-full border-4 border-white dark:border-[#0f0f13] z-10 flex items-center justify-center text-white ${
                        isEven 
                          ? 'bg-[#FF4C60] shadow-[0_0_10px_rgba(255,76,96,0.5)]' 
                          : 'bg-[#6C6CE5] shadow-[0_0_10px_rgba(108,108,229,0.5)]'
                      }`}
                    >
                      <FiBriefcase size={16} />
                    </div>

                    {/* LADO IZQUIERDO (Oculto en impar en desktop) */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-0 md:pr-12 relative ${!isEven ? 'md:invisible md:opacity-0 hidden md:block' : ''}`}>
                      {isEven && (
                        <div className="bg-white dark:bg-[#1a1a24] p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-transparent dark:border-[#2b2b36] transition-all duration-300 relative">
                          {/* Triángulos */}
                          <div className="hidden md:block absolute right-[-14px] top-6 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-white dark:border-l-[#1a1a24]"></div>
                          <div className="md:hidden absolute left-[-14px] top-6 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-white dark:border-r-[#1a1a24]"></div>
                          
                          {session && (
                            <AdminControls onEdit={() => openEditModal(exp)} onDelete={() => handleDelete(exp.id)} />
                          )}
                          
                          <span className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-2 block md:text-right">
                            {exp.year}
                          </span>
                          <h3 className={`text-xl font-bold mb-1 md:text-right ${textColor}`}>
                            {exp.title}
                          </h3>
                          <h4 className="text-md font-medium text-[#353252] dark:text-gray-300 mb-4 md:text-right">
                            {exp.company}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-wrap md:text-right">
                            {exp.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Icono Central (Desktop) */}
                    <div 
                      className={`hidden md:flex absolute left-1/2 -ml-[24px] top-4 w-12 h-12 rounded-full border-4 border-white dark:border-[#0f0f13] z-10 items-center justify-center text-white group-hover:scale-110 transition-all duration-300 ${
                        isEven 
                          ? 'bg-[#FF4C60] shadow-[0_0_15px_rgba(255,76,96,0.5)]' 
                          : 'bg-[#6C6CE5] shadow-[0_0_15px_rgba(108,108,229,0.5)]'
                      }`}
                    >
                      <FiBriefcase size={20} />
                    </div>

                    {/* LADO DERECHO (Oculto en par en desktop) */}
                    <div className={`w-full md:w-1/2 pl-12 md:pl-12 relative ${isEven ? 'md:invisible md:opacity-0 hidden md:block' : ''}`}>
                      {!isEven && (
                        <div className="bg-white dark:bg-[#1a1a24] p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-transparent dark:border-[#2b2b36] transition-all duration-300 relative mt-8 md:mt-0">
                          {/* Triángulos */}
                          <div className="absolute left-[-14px] top-6 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-white dark:border-r-[#1a1a24]"></div>
                          
                          {session && (
                            <AdminControls onEdit={() => openEditModal(exp)} onDelete={() => handleDelete(exp.id)} />
                          )}

                          <span className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-2 block text-left">
                            {exp.year}
                          </span>
                          <h3 className={`text-xl font-bold mb-1 text-left ${textColor}`}>
                            {exp.title}
                          </h3>
                          <h4 className="text-md font-medium text-[#353252] dark:text-gray-300 mb-4 text-left">
                            {exp.company}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-wrap text-left">
                            {exp.description}
                          </p>
                        </div>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Ver más Button */}
        {experiences.length > 3 && (
          <div className="mt-16 flex justify-center relative z-20">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 text-sm font-bold text-[#353252] dark:text-[#f2f2f2] bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2b2b36] py-3 px-8 rounded-full shadow-sm hover:shadow-md hover:text-[#FF4C60] dark:hover:text-[#FF4C60] transition-all duration-300"
            >
              {showAll ? (
                <>Ocultar experiencias <FiChevronUp className="text-lg" /></>
              ) : (
                <>Ver todas ({hiddenCount}) <FiChevronDown className="text-lg" /></>
              )}
            </button>
          </div>
        )}
      </div>

      <ExperienceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        experience={editingExperience}
        onSave={fetchExperiences}
      />
    </section>
  );
}
