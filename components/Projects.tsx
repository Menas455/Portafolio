"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiTool, FiChevronDown, FiChevronUp } from "react-icons/fi";

const categories = ["Todos", "Mobile", "Full-Stack", "Backend"];

const projectsData = [
  {
    id: 1,
    title: "DeudoresApp",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    tech: ["React Native", "Expo", "SQLite", "Firebase"],
    description: "App Android offline-first para finanzas. Registra pagos, historial y calcula conversión USD/EUR a Bs usando API DolarVNZL.",
    github: "#",
    live: "#"
  },
  {
    id: 2,
    title: "Sistema Reportes Automatizados",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tech: ["Next.js", "Supabase", "Excel", "Vercel"],
    description: "App web que procesa archivos Excel para generar reportes dinámicos automáticos, reduciendo el trabajo manual en un 85%.",
    github: "#",
    live: "#"
  },
  {
    id: 3,
    title: "Sistema de Etiquetado",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    tech: ["React", "Supabase", "PDF"],
    description: "Gestión de inventario con tasas de cambio en tiempo real (BCV/paralelo). Permite cálculo dinámico y generación de etiquetas PDF.",
    github: "#",
    live: "#"
  },
  {
    id: 4,
    title: "Dashboard de Trámites",
    category: "Full-Stack",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
    tech: ["Next.js", "Google Sheets API", "Chart.js"],
    description: "Panel analítico que obtiene datos en tiempo real. Permite filtrado complejo y visualización histórica de trámites.",
    github: "#",
    live: "#"
  },
  {
    id: 5,
    title: "Gestor de Ventas y Reparaciones",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&auto=format&fit=crop",
    tech: ["Laravel", "PHP", "MySQL"],
    description: "Desarrollo del backend para sistema de inventario, registro de equipos electrónicos y seguimiento de reparaciones.",
    github: "#",
    live: "#"
  }
];

const inProgressProjects = [
  {
    id: 6,
    title: "Sistema de Gestión de Asistencias",
    category: "En Proceso",
    image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?q=80&w=800&auto=format&fit=crop",
    tech: ["Next.js", "Google Sheets API", "Chart.js"],
    description: "Plataforma para tracking de participación en actividades, con dashboard analítico, tendencias y filtros por región.",
    github: "#",
    live: "#"
  },
  {
    id: 7,
    title: "Proyecto Ficticio Secundario",
    category: "En Proceso",
    image: "https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=800&auto=format&fit=crop",
    tech: ["React", "Node.js", "MongoDB"],
    description: "Proyecto de datos ficticios como marcador de posición para futuras integraciones en el portafolio.",
    github: "#",
    live: "#"
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [showInProgress, setShowInProgress] = useState(false);

  const filteredProjects = projectsData.filter(project => 
    activeCategory === "Todos" ? true : project.category === activeCategory
  );

  return (
    <section id="projects" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto w-full transition-colors duration-300">
      {/* Title Section */}
      <div className="relative mb-12 text-center flex flex-col items-center">
        {/* Decorative dots pattern */}
        <div className="absolute -top-4 w-12 h-12 flex flex-wrap gap-1 opacity-20 dark:opacity-10 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-indigo-900 dark:bg-white rounded-full"></div>
          ))}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#353252] dark:text-[#f2f2f2] relative z-10 mb-8">
          Proyectos Destacados
        </h2>

        {/* Filtros de Categorías */}
        <div className="flex flex-wrap justify-center gap-3 relative z-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category 
                  ? 'bg-[#FF4C60] text-white shadow-[0_5px_15px_rgba(255,76,96,0.3)]' 
                  : 'bg-white dark:bg-[#1a1a24] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-[#2b2b36] hover:text-[#FF4C60] dark:hover:text-[#FF4C60] hover:border-[#FF4C60]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Proyectos Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            className="group bg-white dark:bg-[#1a1a24] rounded-2xl overflow-hidden shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.2)] border border-transparent dark:border-[#2b2b36] hover:-translate-y-2 hover:shadow-xl transition-all duration-500 animate-[fadeIn_0.5s_ease-out_forwards]"
          >
            {/* Contenedor de Imagen y Overlay */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image 
                src={project.image} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay oscuro que aparece en hover */}
              <div className="absolute inset-0 bg-[#353252]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                <Link href={project.github} className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#353252] hover:bg-[#FFD15C] hover:text-white transition-colors duration-300 translate-y-4 group-hover:translate-y-0 shadow-lg">
                  <FiGithub size={22} />
                </Link>
                <Link href={project.live} className="w-12 h-12 bg-[#FF4C60] rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors duration-300 translate-y-4 group-hover:translate-y-0 delay-75 shadow-lg">
                  <FiExternalLink size={22} />
                </Link>
              </div>
            </div>

            {/* Información del Proyecto */}
            <div className="p-6 flex flex-col h-[220px]">
              <span className="text-xs font-bold text-[#6C6CE5] uppercase tracking-wider mb-2 block">
                {project.category}
              </span>
              <h3 className="text-lg font-bold text-[#353252] dark:text-[#f2f2f2] mb-3 group-hover:text-[#FF4C60] transition-colors duration-300 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                {project.description}
              </p>
              
              {/* Etiquetas de Tecnología */}
              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tech.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-2.5 py-0.5 bg-gray-100 dark:bg-[#2b2b36] text-gray-600 dark:text-gray-400 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para Mostrar Proyectos en Proceso */}
      <div className="mt-16 flex justify-center relative z-20">
        <button 
          onClick={() => setShowInProgress(!showInProgress)}
          className="group flex items-center gap-2 text-sm font-bold text-[#353252] dark:text-[#f2f2f2] bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2b2b36] py-3 px-8 rounded-full shadow-sm hover:shadow-md hover:text-[#FFD15C] dark:hover:text-[#FFD15C] transition-all duration-300 hover:-translate-y-1"
        >
          <FiTool className="text-lg group-hover:animate-spin-slow" />
          {showInProgress ? "Ocultar en proceso" : "Ver proyectos en proceso"}
          {showInProgress ? <FiChevronUp className="text-lg ml-1" /> : <FiChevronDown className="text-lg ml-1" />}
        </button>
      </div>

      {/* Grid de Proyectos en Proceso (Ocultos por defecto) */}
      <div className={`transition-all duration-700 ease-in-out overflow-hidden ${
        showInProgress ? "max-h-[2000px] opacity-100 mt-12" : "max-h-0 opacity-0 mt-0"
      }`}>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-1 bg-gray-200 dark:bg-[#2b2b36]"></div>
          <h3 className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            En Desarrollo
          </h3>
          <div className="h-[1px] flex-1 bg-gray-200 dark:bg-[#2b2b36]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {inProgressProjects.map((project) => (
            <div 
              key={project.id} 
              className="group flex flex-col sm:flex-row bg-white/50 dark:bg-[#1a1a24]/50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 border-dashed dark:border-[#2b2b36] transition-all duration-300"
            >
              {/* Contenedor de Imagen */}
              <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill 
                  className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider flex items-center gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-900 animate-pulse"></span>
                  Work in Progress
                </div>
              </div>

              {/* Información del Proyecto */}
              <div className="p-5 sm:w-3/5 flex flex-col justify-center">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">
                  {project.category}
                </span>
                <h3 className="text-lg font-bold text-[#353252] dark:text-[#f2f2f2] mb-2 group-hover:text-[#FFD15C] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                {/* Etiquetas de Tecnología */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tech.map((tech, index) => (
                    <span 
                      key={index} 
                      className="px-2.5 py-0.5 bg-gray-200/50 dark:bg-[#2b2b36]/50 text-gray-500 dark:text-gray-400 text-[10px] font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
