import { FiLayout, FiDatabase, FiCode } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";

const services = [
  {
    id: 1,
    title: "Desarrollo Web Full-Stack",
    description: "Creación de aplicaciones web completas, escalables y rápidas utilizando tecnologías modernas como React y Next.js. Enfoque total en una experiencia de usuario fluida.",
    icon: FiLayout,
    color: "text-[#FF4C60]",
    bgColor: "bg-[#FF4C60]/10 dark:bg-[#FF4C60]/20",
    shadowColor: "group-hover:shadow-[0_10px_30px_rgba(255,76,96,0.2)]",
    borderColor: "group-hover:border-[#FF4C60]"
  },
  {
    id: 2,
    title: "APIs y Backend a Medida",
    description: "Construcción de servicios backend potentes y seguros utilizando Node.js y NestJS. Arquitecturas limpias preparadas para escalar y soportar alta concurrencia.",
    icon: FiCode,
    color: "text-[#6C6CE5]",
    bgColor: "bg-[#6C6CE5]/10 dark:bg-[#6C6CE5]/20",
    shadowColor: "group-hover:shadow-[0_10px_30px_rgba(108,108,229,0.2)]",
    borderColor: "group-hover:border-[#6C6CE5]"
  },
  {
    id: 3,
    title: "Arquitectura y Bases de Datos",
    description: "Diseño robusto de bases de datos relacionales (PostgreSQL). Modelado eficiente de datos para asegurar integridad, seguridad y consultas de alta velocidad.",
    icon: FiDatabase,
    color: "text-[#FFD15C]",
    bgColor: "bg-[#FFD15C]/10 dark:bg-[#FFD15C]/20",
    shadowColor: "group-hover:shadow-[0_10px_30px_rgba(255,209,92,0.2)]",
    borderColor: "group-hover:border-[#FFD15C]"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto w-full transition-colors duration-300">
      {/* Title Section */}
      <div className="relative mb-16 ml-4 text-center md:text-left">
        {/* Decorative dots pattern */}
        <div className="absolute -top-4 left-1/2 md:-left-4 transform -translate-x-1/2 md:translate-x-0 w-12 h-12 flex flex-wrap gap-1 opacity-20 dark:opacity-10 pointer-events-none">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-indigo-900 dark:bg-white rounded-full"></div>
          ))}
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-[#353252] dark:text-[#f2f2f2] relative z-10">
          Servicios
        </h2>
      </div>

      {/* Grid de Servicios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <div 
              key={service.id} 
              className={`group bg-white dark:bg-[#1a1a24] rounded-2xl p-8 shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.2)] border border-transparent dark:border-[#2b2b36] transition-all duration-300 hover:-translate-y-2 ${service.shadowColor} ${service.borderColor} cursor-default`}
            >
              {/* Icono */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${service.bgColor}`}>
                <Icon className={`text-3xl ${service.color}`} />
              </div>

              {/* Contenido */}
              <h3 className="text-xl font-bold text-[#353252] dark:text-[#f2f2f2] mb-4">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Botón fantasma / Enlace */}
              <button className={`flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 ${service.color}`}>
                Saber más <BsArrowRight className="text-lg" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

