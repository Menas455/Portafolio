import Image from "next/image";
import Link from "next/link";
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiTailwindcss, 
  SiLaravel, 
  SiSupabase,
  SiPostgresql,
  SiMysql
} from "react-icons/si";
import { FiDownload } from "react-icons/fi";

export default function About() {
  const skills = [
    { name: "React / Native", icon: SiReact, color: "text-[#61DAFB]", bg: "bg-[#61DAFB]/10" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-[#000000] dark:text-white", bg: "bg-black/10 dark:bg-white/10" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-[#339933]", bg: "bg-[#339933]/10" },
    { name: "Laravel", icon: SiLaravel, color: "text-[#FF2D20]", bg: "bg-[#FF2D20]/10" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10" },
    { name: "Supabase", icon: SiSupabase, color: "text-[#3ECF8E]", bg: "bg-[#3ECF8E]/10" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-[#4169E1]", bg: "bg-[#4169E1]/10" },
    { name: "MySQL", icon: SiMysql, color: "text-[#4479A1]", bg: "bg-[#4479A1]/10" }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        
        {/* Left Side: Avatar & Description (Chat bubble style) */}
        <div className="w-full md:w-1/2 flex flex-col relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
              <Image 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=FFD15C" 
                alt="Avatar" 
                fill
                className="rounded-full object-cover shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
              />
              <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 border-2 border-white dark:border-[#0f0f13] rounded-full"></div>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#353252] dark:text-[#f2f2f2]">
                ¡Hola, soy Michael! 👋
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Desarrollador Full Stack 🇻🇪
              </p>
            </div>
          </div>
          
          <div className="relative bg-white dark:bg-[#1a1a24] p-6 sm:p-8 rounded-2xl rounded-tl-sm shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.2)] border border-transparent dark:border-[#2b2b36] transition-colors duration-300">
            {/* Chat bubble tail */}
            <div className="absolute top-0 left-0 -mt-[10px] -ml-[10px] w-0 h-0 border-b-[20px] border-b-white dark:border-b-[#1a1a24] border-l-[20px] border-l-transparent transition-colors duration-300"></div>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
              Soy desarrollador de Software Full Stack con gran motivación para aprender y crecer profesionalmente, me apasiona colaborar en equipo para crear soluciones web completas, utilizando tecnologías modernas tanto en frontend como en backend. 
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              Tengo experiencia práctica en el desarrollo de proyectos reales y muchas ganas de aportar valor mientras continúo mi formación.
            </p>
            
            {/* Formación */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-[#2b2b36]">
              <h4 className="text-sm font-bold text-[#353252] dark:text-gray-300 mb-2">🎓 Formación</h4>
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                <strong>Ingeniería de Sistemas</strong> - UNEFA (2017-2024)<br/>
                Guanare, Edo. Portuguesa
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Skills Grid */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          {skills.map((skill) => (
            <div key={skill.name} className="flex items-center gap-3 p-4 bg-white dark:bg-[#1a1a24] rounded-xl shadow-sm border border-gray-100 dark:border-[#2b2b36] hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-default">
              <div className={`p-2 rounded-lg ${skill.bg}`}>
                <skill.icon className={`w-6 h-6 ${skill.color}`} />
              </div>
              <span className="font-medium text-[#353252] dark:text-gray-300 text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
