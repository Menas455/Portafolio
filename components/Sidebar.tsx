"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { 
  FiHome, 
  FiUser, 
  FiFileText, 
  FiBriefcase, 
  FiLayers, 
  FiMessageSquare,
  FiMoon,
  FiSun
} from "react-icons/fi";
import { useEffect, useState } from "react";

const navItems = [
  { id: "home", icon: FiHome, label: "Inicio" },
  { id: "about", icon: FiUser, label: "Acerca de" },
  { id: "services", icon: FiLayers, label: "Servicios" },
  { id: "experience", icon: FiFileText, label: "Experiencia" },
  { id: "projects", icon: FiBriefcase, label: "Proyectos" },
  { id: "contact", icon: FiMessageSquare, label: "Contacto" },
];

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Chequeo inicial

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <aside className="fixed bottom-0 left-0 w-full h-[70px] lg:w-[100px] lg:h-screen lg:top-0 flex lg:flex-col justify-between items-center bg-white dark:bg-[#1a1a24] border-t lg:border-t-0 lg:border-r border-gray-100 dark:border-[#2b2b36] z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-5px_20px_rgba(0,0,0,0.3)] lg:shadow-none lg:py-8 transition-colors duration-300">
      {/* Logo - Hidden on mobile, shown on desktop */}
      <Link href="#home" className="hidden lg:flex text-3xl font-bold items-center justify-center relative group">
        <span className="text-[#FF4C60] absolute -left-2 top-0 transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">M</span>
        <span className="text-[#6C6CE5] relative z-10 group-hover:scale-110 transition-transform duration-300">S</span>
      </Link>

      {/* Navigation - Distribuido parejo en móvil, apilado vertical en desktop */}
      <nav className="flex lg:flex-col items-center justify-around lg:justify-center w-full lg:w-auto h-full lg:h-auto px-4 sm:px-6 lg:px-0 lg:gap-8">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Link 
              key={item.id}
              href={`#${item.id}`} 
              className={`relative flex-shrink-0 transition-colors duration-300 ${
                isActive 
                  ? 'text-[#FF4C60]' 
                  : 'text-[#353252] dark:text-[#f2f2f2] hover:text-[#FF4C60] dark:hover:text-[#FF4C60]'
              }`}
              title={item.label}
            >
              <Icon size={22} className="lg:w-6 lg:h-6" />
              {/* Indicador de sección activa */}
              {isActive && (
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-[#FF4C60] rounded-full lg:-right-4 lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto"></span>
              )}
            </Link>
          );
        })}
        
        {/* Theme Toggle - Inside nav on mobile for easy access */}
        <button 
          onClick={toggleTheme}
          className="text-[#353252] dark:text-[#f2f2f2] hover:text-[#FF4C60] dark:hover:text-[#FF4C60] transition-colors lg:hidden flex-shrink-0"
          title="Alternar Tema"
        >
          {mounted && theme === "dark" ? <FiSun size={22} /> : <FiMoon size={22} />}
        </button>
      </nav>

      {/* Theme Toggle - Pinned to bottom on desktop */}
      <button 
        onClick={toggleTheme}
        className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full text-[#353252] dark:text-[#f2f2f2] hover:text-[#FF4C60] dark:hover:text-[#FF4C60] hover:bg-gray-50 dark:hover:bg-[#2b2b36] transition-all duration-300"
        title="Alternar Tema"
      >
        {mounted && theme === "dark" ? <FiSun size={24} /> : <FiMoon size={24} />}
      </button>

      {/* Custom CSS to hide scrollbar but allow scrolling on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        
        /* Smooth scrolling para toda la página */
        html {
          scroll-behavior: smooth;
        }
      `}} />
    </aside>
  );
}
