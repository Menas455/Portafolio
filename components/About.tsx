"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import * as SiIcons from "react-icons/si";
import { FiCode } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import AdminControls from "./AdminControls";
import ProfileModal from "./modals/ProfileModal";

// Función auxiliar para buscar iconos dinámicamente o devolver uno por defecto
const getIconForTool = (toolName: string) => {
  let normalized = toolName.replace(/\./g, 'dot').replace(/\s+/g, '').replace(/-/g, '').toLowerCase();
  
  const aliases: Record<string, string> = {
    "postgressql": "postgresql",
    "postgres": "postgresql",
    "reactnative": "react",
    "vue": "vuedotjs",
    "html": "html5",
    "css": "css3",
    "js": "javascript",
    "ts": "typescript"
  };

  if (aliases[normalized]) {
    normalized = aliases[normalized];
  }

  const iconKey = Object.keys(SiIcons).find(key => key.toLowerCase() === `si${normalized}`);
  const IconComponent = iconKey ? (SiIcons as any)[iconKey] : FiCode;
  
  const brandColors: Record<string, string> = {
    react: "#61DAFB",
    nextdotjs: "currentColor", // Black in light, White in dark
    nodedotjs: "#339933",
    laravel: "#FF2D20",
    tailwindcss: "#06B6D4",
    supabase: "#3ECF8E",
    postgresql: "#4169E1",
    mysql: "#4479A1",
    javascript: "#F7DF1E",
    typescript: "#3178C6",
    html5: "#E34F26",
    css3: "#1572B6",
    vuedotjs: "#4FC08D",
    angular: "#DD0031",
    git: "#F05032",
    docker: "#2496ED",
    aws: "#232F3E",
    firebase: "#FFCA28",
    mongodb: "#47A248",
    express: "currentColor",
    sass: "#CC6699",
    figma: "#F24E1E",
    python: "#3776AB",
    php: "#777BB4",
    redux: "#764ABC",
    graphql: "#E10098",
    github: "currentColor"
  };

  const brandHex = brandColors[normalized] || "#6C6CE5";

  return { 
    Icon: IconComponent, 
    brandHex
  };
};

const ToolCard = ({ tool }: { tool: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { Icon, brandHex } = getIconForTool(tool);
  
  const isCurrentColor = brandHex === "currentColor";
  const shadowColor = isCurrentColor ? 'rgba(100, 100, 100, 0.15)' : `${brandHex}33`; 
  const borderColor = isCurrentColor ? '' : `${brandHex}40`;

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex items-center gap-3 p-4 bg-white dark:bg-[#1a1a24] rounded-xl border border-gray-100 dark:border-[#2b2b36] transition-all duration-300 cursor-default"
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'none',
        boxShadow: isHovered 
          ? `0 10px 25px -5px ${shadowColor}, 0 8px 10px -6px ${shadowColor}` 
          : '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        borderColor: isHovered ? borderColor : undefined
      }}
    >
      <div 
        className={`p-2 rounded-lg transition-colors duration-300 ${isCurrentColor ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
        style={isCurrentColor ? {} : { backgroundColor: isHovered ? `${brandHex}33` : `${brandHex}1A` }}
      >
        <Icon 
          className={`w-6 h-6 transition-colors duration-300 ${isCurrentColor ? 'text-black dark:text-white' : ''}`} 
          style={isCurrentColor ? {} : { color: brandHex }}
        />
      </div>
      <span className="font-medium text-[#353252] dark:text-gray-300 text-sm truncate">{tool}</span>
    </div>
  );
};

export default function About() {
  const [profile, setProfile] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProfile = async () => {
    const { data } = await supabase.from("profile").select("*").eq("id", 1).maybeSingle();
    if (data) setProfile(data);
  };

  useEffect(() => {
    fetchProfile();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-5xl mx-auto w-full transition-colors duration-300 relative z-10">
      <div className="flex flex-col md:flex-row gap-12 items-center relative">
        
        {session && (
          <AdminControls 
            onEdit={() => setIsModalOpen(true)} 
            onDelete={() => {}} 
            className="-top-12 right-0" 
          />
        )}
        
        {/* Left Side: Avatar & Description (Chat bubble style) */}
        <div className="w-full md:w-1/2 flex flex-col relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
              <Image 
                src={profile?.about_image || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=FFD15C"} 
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
            
            {profile?.about_text ? (
              <div className="whitespace-pre-wrap text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">{profile.about_text}</div>
            ) : (
              <>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                  Soy desarrollador de Software Full Stack con gran motivación para aprender y crecer profesionalmente...
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Skills Grid */}
        <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
          {profile?.tools && profile.tools.length > 0 ? (
            profile.tools.map((tool: string, index: number) => (
              <ToolCard key={index} tool={tool} />
            ))
          ) : (
            <div className="col-span-2 text-center py-10 bg-gray-50 dark:bg-[#1a1a24] rounded-xl border border-gray-100 dark:border-[#2b2b36]">
              <p className="text-gray-500 text-sm">No hay herramientas registradas.</p>
            </div>
          )}
        </div>
        
      </div>
      
      <ProfileModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
        onSave={fetchProfile}
      />
    </section>
  );
}
