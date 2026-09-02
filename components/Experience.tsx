'use client'
import { useState } from "react";
import { FiBriefcase, FiChevronDown, FiChevronUp } from "react-icons/fi";

const experiences = [
  {
    id: 1,
    role: "Desarrollador Móvil",
    company: "Freelance",
    period: "Mayo 2026", // Basado en el CV "20/05/2026"
    description: "Desarrollo de DeudoresApp: App Android para gestión de deudas y finanzas personales (offline-first con SQLite). Integración de API DolarVNZL para cálculo en tiempo real USD/EUR a bolívares. Sistema de notificaciones push, registro de pagos y panel analítico.",
    color: "bg-[#FF4C60]",
    textColor: "text-[#FF4C60]",
    shadow: "group-hover:shadow-[0_0_20px_rgba(255,76,96,0.3)]"
  },
  {
    id: 2,
    role: "Desarrollador Full-Stack",
    company: "MINEC",
    period: "Oct 2025 - Dic 2025",
    description: "Creación de un ecosistema de aplicaciones (Reportes Automatizados, Trámites y Asistencias) usando Next.js y Supabase. Integración con Google Sheets API y Chart.js para dashboards en tiempo real, reduciendo el tiempo manual en un 85%.",
    color: "bg-[#6C6CE5]",
    textColor: "text-[#6C6CE5]",
    shadow: "group-hover:shadow-[0_0_20px_rgba(108,108,229,0.3)]"
  },
  {
    id: 3,
    role: "Freelancer / Full-Stack",
    company: "Inversiones Cherra",
    period: "2025",
    description: "Desarrollo de Sistema de Etiquetado de Inventario usando React y Supabase. La aplicación obtiene tasas de cambio (BCV/paralelo/euro) en tiempo real y genera etiquetas de precios dinámicas en formato PDF.",
    color: "bg-[#FFD15C]",
    textColor: "text-[#FFD15C]",
    shadow: "group-hover:shadow-[0_0_20px_rgba(255,209,92,0.3)]"
  },
  {
    id: 4,
    role: "Desarrollador Back-end",
    company: "ATCode",
    period: "2024",
    description: "Apoyo en el desarrollo del backend de un sistema web integral para gestionar ventas y reparaciones. Implementación de base de datos MySQL e integración de lógica de negocio usando el framework Laravel (PHP).",
    color: "bg-[#44D7B6]",
    textColor: "text-[#44D7B6]",
    shadow: "group-hover:shadow-[0_0_20px_rgba(68,215,182,0.3)]"
  }
];

export default function Experience() {
  const [showAll, setShowAll] = useState(false);
  
  // Mostrar solo los primeros 3 si no se ha hecho clic en "Ver más"
  const visibleExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section id="experience" className="py-24 px-4 sm:px-8 max-w-4xl mx-auto w-full transition-colors duration-300">
      {/* Title Section */}
      <div className="relative mb-16 ml-4 text-center md:text-left">
        {/* Decorative dots pattern */}
        <div className="absolute -top-4 left-1/2 md:-left-4 transform -translate-x-1/2 md:translate-x-0 w-12 h-12 flex flex-wrap gap-1 opacity-20 dark:opacity-10 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-indigo-900 dark:bg-white rounded-full"></div>
          ))}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#353252] dark:text-[#f2f2f2] relative z-10">
          Experiencia Profesional
        </h2>
      </div>

      <div className="relative">
        {/* Línea vertical principal de la línea de tiempo */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 dark:bg-[#2b2b36] transform md:-translate-x-1/2 z-0 rounded-full transition-all duration-500"></div>

        <div className="space-y-12 relative z-10">
          {visibleExperiences.map((exp, index) => {
            // Alternar izquierda y derecha en desktop
            const isEven = index % 2 === 0;

            return (
              <div key={exp.id} className="relative flex flex-col md:flex-row items-center w-full group animate-[fadeIn_0.5s_ease-out_forwards]">
                
                {/* Lado izquierdo (vacío si es impar en desktop) */}
                <div className={`hidden md:block w-1/2 pr-12 text-right ${!isEven ? 'md:invisible' : ''}`}>
                  <div className="bg-white dark:bg-[#1a1a24] p-6 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.05)] dark:shadow-none border border-transparent dark:border-[#2b2b36] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative">
                    {/* Triángulo apuntando a la línea */}
                    <div className="absolute w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[15px] border-l-white dark:border-l-[#1a1a24] right-[-14px] top-6"></div>
                    
                    <span className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-2 block">{exp.period}</span>
                    <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${exp.textColor}`}>{exp.role}</h3>
                    <h4 className="text-md font-medium text-[#353252] dark:text-gray-300 mb-4">{exp.company}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>

                {/* Ícono central / Punto en la línea de tiempo */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div className={`w-12 h-12 rounded-full border-4 border-white dark:border-[#0f0f13] flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${exp.color} ${exp.shadow}`}>
                    <FiBriefcase className="text-white text-lg" />
                  </div>
                </div>

                {/* Lado derecho (vacío si es par en desktop, o contenedor completo en móvil) */}
                <div className={`w-full md:w-1/2 pl-20 md:pl-12 ${isEven ? 'md:invisible' : ''} ${isEven ? 'block md:hidden' : ''}`}>
                  <div className="bg-white dark:bg-[#1a1a24] p-6 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.05)] dark:shadow-none border border-transparent dark:border-[#2b2b36] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg relative">
                    {/* Triángulo apuntando a la línea (solo móvil o si es lado derecho) */}
                    <div className="absolute w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[15px] border-r-white dark:border-r-[#1a1a24] left-[-14px] top-6"></div>
                    
                    <span className="text-sm font-bold text-gray-400 dark:text-gray-500 mb-2 block">{exp.period}</span>
                    <h3 className={`text-xl font-bold mb-1 transition-colors duration-300 ${exp.textColor}`}>{exp.role}</h3>
                    <h4 className="text-md font-medium text-[#353252] dark:text-gray-300 mb-4">{exp.company}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed text-left">
                      {exp.description}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Botón Ver Más */}
        {experiences.length > 3 && (
          <div className="mt-16 flex justify-center relative z-20">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 text-sm font-bold text-[#353252] dark:text-[#f2f2f2] bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-[#2b2b36] py-3 px-8 rounded-full shadow-sm hover:shadow-md hover:text-[#FF4C60] dark:hover:text-[#FF4C60] transition-all duration-300"
            >
              {showAll ? (
                <>Ver menos <FiChevronUp className="text-lg" /></>
              ) : (
                <>Ver todas ({experiences.length - 3}) <FiChevronDown className="text-lg" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
