import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white dark:bg-[#1a1a24] border-t border-gray-100 dark:border-[#2b2b36] pt-12 pb-24 lg:pb-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo */}
        <div className="flex text-2xl font-bold items-center justify-center relative">
          <span className="text-[#FF4C60] absolute -left-2 top-0 transform -rotate-12">M</span>
          <span className="text-[#6C6CE5] relative z-10">S</span>
        </div>

        {/* Copyright */}
        <div className="text-gray-500 dark:text-gray-400 text-sm font-medium text-center md:text-left">
          &copy; {currentYear} Michael Mena. Todos los derechos reservados.
        </div>

        {/* Redes Sociales */}
        <div className="flex items-center gap-4">
          <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#0f0f13] flex items-center justify-center text-gray-500 hover:text-[#FF4C60] hover:bg-white dark:hover:bg-[#2b2b36] shadow-sm hover:shadow-md transition-all duration-300">
            <FaGithub size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#0f0f13] flex items-center justify-center text-gray-500 hover:text-[#FF4C60] hover:bg-white dark:hover:bg-[#2b2b36] shadow-sm hover:shadow-md transition-all duration-300">
            <FaLinkedinIn size={18} />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-50 dark:bg-[#0f0f13] flex items-center justify-center text-gray-500 hover:text-[#FF4C60] hover:bg-white dark:hover:bg-[#2b2b36] shadow-sm hover:shadow-md transition-all duration-300">
            <FaTwitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

