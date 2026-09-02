"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiBriefcase, FiLayers, FiPlus, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import AdminControls from "./AdminControls";
import ProjectModal from "./modals/ProjectModal";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [showInProgress, setShowInProgress] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("Todos");

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    if (data) setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este proyecto?")) {
      await supabase.from("projects").delete().eq("id", id);
      fetchProjects();
    }
  };

  const openAddModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const openEditModal = (proj: any) => {
    setEditingProject(proj);
    setIsModalOpen(true);
  };

  const regularProjects = projects.filter(p => !p.is_in_progress);
  const inProgressProjects = projects.filter(p => p.is_in_progress);
  
  // Obtener categorías únicas
  const categories = ["Todos", ...Array.from(new Set(regularProjects.map(p => p.category).filter(Boolean)))];
  
  // Filtrar proyectos según categoría seleccionada
  const filteredProjects = regularProjects.filter(p => 
    activeFilter === "Todos" ? true : p.category === activeFilter
  );

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl relative">
        
        {/* Centered Title */}
        <div className="text-center mb-10 relative">
          {/* Dot pattern */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 flex flex-wrap gap-1 opacity-20 dark:opacity-10 pointer-events-none z-0">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-indigo-900 dark:bg-white rounded-full"></div>
            ))}
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#353252] dark:text-white mb-6 relative z-10">
            Proyectos Destacados
          </h2>
          
          {/* Categorías (Filtros) */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category 
                    ? 'bg-[#FF4C60] text-white shadow-[0_5px_15px_rgba(255,76,96,0.4)]' 
                    : 'bg-[#f9f9ff] dark:bg-[#1a1a24] text-[#353252] dark:text-gray-300 hover:text-[#FF4C60] dark:hover:text-[#FF4C60] border border-transparent dark:border-[#2b2b36]'
                }`}
              >
                {category}
              </button>
            ))}
            
            {session && (
              <button 
                onClick={openAddModal} 
                className="ml-2 flex items-center justify-center gap-2 bg-[#353252] hover:bg-[#6C6CE5] text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-[0_5px_15px_rgba(108,108,229,0.3)] hover:-translate-y-1"
              >
                <FiPlus size={16} /> Añadir
              </button>
            )}
          </div>
        </div>

        {filteredProjects.length === 0 && !session ? (
          <p className="text-center py-10 text-gray-500">Pronto se añadirán nuevos proyectos.</p>
        ) : (
          <div className={`grid gap-8 mt-12 ${
            filteredProjects.length === 1 
              ? 'grid-cols-1 max-w-2xl mx-auto' 
              : filteredProjects.length === 2 
                ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' 
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group flex flex-col h-full bg-white dark:bg-[#1a1a24] rounded-2xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.2)] border border-transparent dark:border-[#2b2b36] hover:-translate-y-2 hover:shadow-xl transition-all duration-500 animate-[fadeIn_0.5s_ease-out_forwards] relative"
              >
                {session && (
                  <AdminControls 
                    onEdit={() => openEditModal(project)} 
                    onDelete={() => handleDelete(project.id)} 
                  />
                )}

                <div className="relative w-full h-56 overflow-hidden flex-shrink-0">
                  <Image 
                    src={project.image || "/placeholder.jpg"} 
                    alt={project.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="hidden lg:flex absolute inset-0 bg-[#353252]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center gap-4 backdrop-blur-sm z-10">
                    <Link href={project.github} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#353252] hover:bg-[#FFD15C] hover:text-white transition-colors duration-300 translate-y-4 group-hover:translate-y-0 shadow-lg" title="Ver código fuente">
                      <FiGithub size={22} />
                    </Link>
                    <Link href={project.live} className="w-12 h-12 bg-[#FF4C60] rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors duration-300 translate-y-4 group-hover:translate-y-0 delay-75 shadow-lg" title="Visitar proyecto">
                      <FiExternalLink size={22} />
                    </Link>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-[#6C6CE5] uppercase tracking-wider mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#353252] dark:text-[#f2f2f2] mb-3 group-hover:text-[#FF4C60] transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow whitespace-pre-wrap">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                    <div className="flex flex-wrap gap-1.5 flex-1">
                      {project.tech?.map((tech: string, index: number) => (
                        <span key={index} className="px-2.5 py-0.5 bg-gray-100 dark:bg-[#2b2b36] text-gray-600 dark:text-gray-400 text-[10px] font-medium rounded-full border border-gray-200 dark:border-[#353252]">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex lg:hidden items-center gap-2">
                      <Link href={project.github} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#2b2b36] flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-[#FFD15C] hover:text-white dark:hover:bg-[#FFD15C] dark:hover:text-white transition-colors border border-gray-200 dark:border-[#353252] shadow-sm hover:shadow-md" title="Ver código fuente">
                        <FiGithub size={14} />
                      </Link>
                      <Link href={project.live} className="w-8 h-8 rounded-full bg-[#FF4C60] flex items-center justify-center text-white hover:bg-red-500 transition-colors shadow-sm hover:shadow-md" title="Visitar proyecto">
                        <FiExternalLink size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Sección de Proyectos "En Desarrollo" */}
        {(inProgressProjects.length > 0 || session) && (
          <div className="mt-20 relative">
            
            {/* Header style from screenshot: Centered pill button and horizontal line */}
            <div className="flex justify-center mb-10 relative z-10">
              <button 
                onClick={() => setShowInProgress(!showInProgress)}
                className="flex items-center gap-2 bg-[#1a1a24] border border-[#2b2b36] hover:bg-[#2b2b36] text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              >
                <FiBriefcase className="text-gray-400" /> {/* Wrench icon style */}
                {showInProgress ? 'Ocultar en proceso' : 'Mostrar en proceso'} 
                {showInProgress ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />}
              </button>
            </div>

            {/* Horizontal line with text */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] bg-[#2b2b36] flex-1"></div>
              <span className="text-xs font-bold text-gray-500 tracking-[0.2em]">EN DESARROLLO</span>
              <div className="h-[1px] bg-[#2b2b36] flex-1"></div>
            </div>

            <div className={`grid gap-6 transition-all duration-500 origin-top overflow-hidden ${
              showInProgress ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
            } ${
              inProgressProjects.length === 1 
                ? 'grid-cols-1 max-w-3xl mx-auto' 
                : 'grid-cols-1 lg:grid-cols-2'
            }`}>
              {inProgressProjects.map((project) => (
                <div key={project.id} className="relative bg-[#0f0f13] rounded-2xl p-0 flex flex-col sm:flex-row border border-[#2b2b36] overflow-hidden group">
                  {session && (
                    <AdminControls 
                      onEdit={() => openEditModal(project)} 
                      onDelete={() => handleDelete(project.id)} 
                      className="top-2 right-2 z-30"
                    />
                  )}
                  
                  {/* Left Side: Image */}
                  <div className="relative w-full sm:w-[40%] h-56 sm:h-auto sm:min-h-[250px] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 bg-[#1a1a24] flex-shrink-0">
                    <Image 
                      src={project.image || "/placeholder.jpg"} 
                      alt={project.title} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    {/* Gray badge from screenshot */}
                    <div className="absolute top-3 left-3 bg-[#e2e2e2] text-gray-800 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider flex items-center gap-1.5 shadow-sm z-20">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-500"></span>
                      WORK IN PROGRESS
                    </div>
                  </div>

                  {/* Right Side: Content */}
                  <div className="flex flex-col flex-1 p-6">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                      EN PROCESO
                    </span>
                    <h4 className="text-lg font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow whitespace-pre-wrap">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech?.map((tech: string, index: number) => (
                        <span key={index} className="px-3 py-1 bg-[#1a1a24] text-gray-400 text-[10px] font-medium rounded-full border border-[#2b2b36]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={editingProject}
        onSave={fetchProjects}
      />
    </section>
  );
}
