import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface AdminControlsProps {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
}

export default function AdminControls({ onEdit, onDelete, className = "" }: AdminControlsProps) {
  return (
    <div className={`absolute top-2 right-2 z-30 flex gap-2 ${className}`}>
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
        className="w-8 h-8 rounded-full bg-[#353252] text-white flex items-center justify-center hover:bg-[#6C6CE5] transition-colors shadow-lg"
        title="Editar"
      >
        <FiEdit2 size={14} />
      </button>
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
        className="w-8 h-8 rounded-full bg-[#353252] text-white flex items-center justify-center hover:bg-[#FF4C60] transition-colors shadow-lg"
        title="Eliminar"
      >
        <FiTrash2 size={14} />
      </button>
    </div>
  );
}

