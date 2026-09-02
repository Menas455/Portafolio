"use client";

import { useEffect, useRef, useState } from "react";
import { FiCoffee, FiUsers, FiAward } from "react-icons/fi";
import { BsFire } from "react-icons/bs";

const stats = [
  { id: 1, icon: BsFire, value: "6", label: "Años de experiencia", color: "text-[#FF4C60]" },
  { id: 2, icon: FiCoffee, value: "31", label: "Repositorios de Github", color: "text-[#6C6CE5]" },
  { id: 3, icon: FiUsers, value: "3", label: "Proyectos lanzados", color: "text-[#44D7B6]" },
  { id: 4, icon: FiAward, value: "100%", label: "Calidad del código", color: "text-[#FFD15C]" },
];

export default function StatsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Duplicamos 4 veces para asegurar que haya contenido suficiente para el bucle infinito
  const multipliedStats = [...stats, ...stats, ...stats, ...stats];

  // Lógica de bucle infinito y sub-píxeles
  const exactScrollRef = useRef(0);

  // Auto-scroll loop
  useEffect(() => {
    let animationFrameId: number;
    
    const scroll = () => {
      const container = scrollRef.current;
      if (container && !isInteracting && !isDragging) {
        exactScrollRef.current += 0.5; // Velocidad de scroll
        
        // Bucle infinito: si llegamos a la mitad, regresamos sin que el usuario lo note
        if (exactScrollRef.current >= container.scrollWidth / 2) {
          exactScrollRef.current -= container.scrollWidth / 2;
        }
        container.scrollLeft = exactScrollRef.current;
      } else if (container) {
        // Sincronizar el ref con el scroll manual del usuario
        exactScrollRef.current = container.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInteracting, isDragging]);

  // Lógica de arrastre manual (Drag to scroll) para escritorio
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setIsInteracting(true);
    if (!scrollRef.current) return;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Multiplicador de velocidad de arrastre
    
    let newScroll = scrollLeft - walk;
    
    // Lógica de bucle para arrastre manual
    if (newScroll >= scrollRef.current.scrollWidth / 2) {
      newScroll -= scrollRef.current.scrollWidth / 2;
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(newScroll);
    } else if (newScroll <= 0) {
      newScroll += scrollRef.current.scrollWidth / 2;
      setStartX(e.pageX - scrollRef.current.offsetLeft);
      setScrollLeft(newScroll);
    }
    
    scrollRef.current.scrollLeft = newScroll;
  };

  const stopInteraction = () => {
    setIsDragging(false);
    setIsInteracting(false);
  };

  return (
    <section className="w-full py-10 overflow-hidden relative bg-white/50 dark:bg-[#1a1a24]/50 backdrop-blur-sm border-y border-gray-100 dark:border-[#2b2b36] transition-colors duration-300">
      
      {/* Degradados laterales */}
      <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-[#f9f9ff] dark:from-[#0f0f13] to-transparent z-10 pointer-events-none transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-[#f9f9ff] dark:from-[#0f0f13] to-transparent z-10 pointer-events-none transition-colors duration-300" />

      {/* Contenedor escroleable */}
      <div 
        ref={scrollRef}
        className={`flex w-full overflow-x-auto scrollbar-hide touch-pan-x ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={stopInteraction}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopInteraction}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={stopInteraction}
      >
        <div className="flex w-max">
          {multipliedStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={`${stat.id}-${index}`} 
                className="flex items-center gap-4 px-6 md:px-12 py-2 min-w-max pointer-events-none"
              >
                <div className="p-3 bg-white dark:bg-[#1a1a24] rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                  <Icon className={`text-2xl md:text-3xl ${stat.color}`} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-[#353252] dark:text-[#f2f2f2]">
                    {stat.value}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
