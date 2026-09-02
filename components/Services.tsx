"use client";

import { useState, useEffect } from "react";
import * as Icons from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { supabase } from "@/lib/supabase";
import AdminControls from "./AdminControls";
import ServiceModal from "./modals/ServiceModal";

const COLORS = [
  {
    color: "text-[#FF4C60]",
    bgColor: "bg-[#FF4C60]/10 dark:bg-[#FF4C60]/20",
    shadowColor: "group-hover:shadow-[0_10px_30px_rgba(255,76,96,0.2)]",
    borderColor: "group-hover:border-[#FF4C60]"
  },
  {
    color: "text-[#6C6CE5]",
    bgColor: "bg-[#6C6CE5]/10 dark:bg-[#6C6CE5]/20",
    shadowColor: "group-hover:shadow-[0_10px_30px_rgba(108,108,229,0.2)]",
    borderColor: "group-hover:border-[#6C6CE5]"
  },
  {
    color: "text-[#FFD15C]",
    bgColor: "bg-[#FFD15C]/10 dark:bg-[#FFD15C]/20",
    shadowColor: "group-hover:shadow-[0_10px_30px_rgba(255,209,92,0.2)]",
    borderColor: "group-hover:border-[#FFD15C]"
  }
];

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("created_at", { ascending: true });
    if (data) setServices(data);
  };

  useEffect(() => {
    fetchServices();
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session));
    return () => subscription.unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de eliminar este servicio?")) {
      await supabase.from("services").delete().eq("id", id);
      fetchServices();
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  return (
    <section id="services" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto w-full transition-colors duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 gap-4">
        <div className="relative ml-4 text-center md:text-left">
          <div className="absolute -top-4 left-1/2 md:-left-4 transform -translate-x-1/2 md:translate-x-0 w-12 h-12 flex flex-wrap gap-1 opacity-20 dark:opacity-10 pointer-events-none">
            {[...Array(25)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-indigo-900 dark:bg-white rounded-full"></div>
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#353252] dark:text-[#f2f2f2] relative z-10">
            Servicios
          </h2>
        </div>

        {session && (
          <button 
            onClick={openAddModal} 
            className="flex items-center justify-center gap-2 bg-[#353252] hover:bg-[#6C6CE5] text-white px-5 py-2.5 rounded-full font-bold transition-all duration-300 shadow-[0_5px_15px_rgba(108,108,229,0.3)] hover:-translate-y-1 text-sm flex-shrink-0"
          >
            <FiPlus size={18} /> Añadir Servicio
          </button>
        )}
      </div>

      {services.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-[#1a1a24] rounded-2xl border border-gray-100 dark:border-[#2b2b36]">
          <p className="text-gray-500 font-medium">No hay servicios registrados aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = (Icons as any)[service.icon_name] || Icons.FiHelpCircle;
            const style = COLORS[index % COLORS.length];
            
            return (
              <div 
                key={service.id} 
                className={`group relative bg-white dark:bg-[#1a1a24] rounded-2xl p-8 shadow-[0_5px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_5px_20px_rgba(0,0,0,0.2)] border border-transparent dark:border-[#2b2b36] transition-all duration-300 hover:-translate-y-2 ${style.shadowColor} ${style.borderColor} cursor-default`}
              >
                {session && (
                  <AdminControls 
                    onEdit={() => openEditModal(service)} 
                    onDelete={() => handleDelete(service.id)} 
                  />
                )}

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 ${style.bgColor}`}>
                  <Icon className={`text-3xl ${style.color}`} />
                </div>

                <h3 className="text-xl font-bold text-[#353252] dark:text-[#f2f2f2] mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                  {service.description}
                </p>

                <button className={`flex items-center gap-2 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 ${style.color}`}>
                  Saber más <BsArrowRight className="text-lg" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={editingService}
        onSave={fetchServices}
      />
    </section>
  );
}

