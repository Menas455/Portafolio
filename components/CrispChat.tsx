"use client";

import { useEffect } from "react";

export default function CrispChat() {
  useEffect(() => {
    // Evitar que se inyecte múltiples veces en desarrollo
    if ((window as any).$crisp) return;

    // Inicializar variables globales de Crisp
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = "ba19cc26-78ea-4b63-8bde-c56ebe0e735f";
    
    // Inyectar el script de Crisp en el documento
    (function () {
      const d = document;
      const s = d.createElement("script");
      s.src = "https://client.crisp.chat/l.js";
      s.async = true;
      d.getElementsByTagName("head")[0].appendChild(s);
    })();
  }, []);

  // Este componente no renderiza nada en la interfaz
  return null;
}

