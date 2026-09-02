import Image from "next/image";
import Link from "next/link";
import { 
  FaGithub, 
  FaDev, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaTwitter 
} from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import { FiDownload } from "react-icons/fi";
import Shapes from "./Shapes";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden flex flex-col items-center justify-center min-h-[100dvh] w-full pt-10 pb-24 lg:pt-16 lg:pb-32 px-4 transition-colors duration-300">
      <Shapes />
      {/* Avatar */}
      <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px] mb-5">
        <Image 
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=FFD15C" 
          alt="Avatar" 
          fill
          className="rounded-full object-cover shadow-lg"
        />
      </div>

      {/* Name and Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#353252] dark:text-[#f2f2f2] mb-2 text-center">
        Michael Mena
      </h1>
      <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-6 text-center">
        Ingeniero de Sistemas
      </p>

      {/* Social Icons */}
      <div className="flex gap-4 sm:gap-5 mb-7 flex-wrap justify-center">
        <Link href="#" className="text-[#353252] dark:text-[#f2f2f2] hover:text-[#FFD15C] dark:hover:text-[#FFD15C] transition-colors">
          <FaGithub size={18} />
        </Link>
        <Link href="#" className="text-[#353252] dark:text-[#f2f2f2] hover:text-[#FFD15C] dark:hover:text-[#FFD15C] transition-colors">
          <TbPointFilled size={18} />
        </Link>
        <Link href="#" className="text-[#353252] dark:text-[#f2f2f2] hover:text-[#FFD15C] dark:hover:text-[#FFD15C] transition-colors">
          <FaDev size={18} />
        </Link>
        <Link href="#" className="text-[#353252] dark:text-[#f2f2f2] hover:text-[#FFD15C] dark:hover:text-[#FFD15C] transition-colors">
          <FaLinkedinIn size={18} />
        </Link>
        <Link href="#" className="text-[#353252] dark:text-[#f2f2f2] hover:text-[#FFD15C] dark:hover:text-[#FFD15C] transition-colors">
          <FaFacebookF size={18} />
        </Link>
        <Link href="#" className="text-[#353252] dark:text-[#f2f2f2] hover:text-[#FFD15C] dark:hover:text-[#FFD15C] transition-colors">
          <FaTwitter size={18} />
        </Link>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4">
        <Link 
          href="#contact" 
          className="bg-[#FF4C60] hover:bg-red-500 text-white text-sm font-bold py-2.5 px-6 rounded-full shadow-[0_10px_30px_rgba(255,76,96,0.3)] transition-all hover:-translate-y-1"
        >
          Contáctame
        </Link>
        <a 
          href="/cv-michael-mena.pdf" 
          download="CV_Michael_Mena_Ingeniero.pdf"
          className="group flex items-center gap-2 bg-white dark:bg-[#1a1a24] text-[#353252] dark:text-[#f2f2f2] border border-gray-200 dark:border-[#2b2b36] hover:border-[#FF4C60] dark:hover:border-[#FF4C60] hover:text-[#FF4C60] dark:hover:text-[#FF4C60] text-sm font-bold py-2.5 px-6 rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
        >
          <FiDownload className="group-hover:animate-bounce" />
          Descargar CV
        </a>
      </div>
    </section>
  );
}
