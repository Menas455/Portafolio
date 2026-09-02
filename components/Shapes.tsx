export default function Shapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 1. Top Left Yellow Arc (U shape) */}
      <svg className="absolute top-[10%] left-[10%] w-6 h-6 animate-float-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M 2 5 A 8 8 0 0 0 18 5" fill="none" stroke="#FFD15C" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* 2. Middle Left Red Triangle */}
      <svg className="absolute top-[30%] left-[22%] w-6 h-6 animate-float" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <polygon points="10,3 18,17 2,17" fill="none" stroke="#FF4C60" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>

      {/* 3. Bottom Left Green Arc (Inverted U) */}
      <svg className="absolute bottom-[30%] left-[12%] w-6 h-6 animate-float-delayed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M 2 15 A 8 8 0 0 1 18 15" fill="none" stroke="#44D7B6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* 4. Bottom Left Yellow Dash */}
      <svg className="absolute bottom-[10%] left-[10%] w-5 h-5 animate-spin-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <line x1="5" y1="18" x2="15" y2="2" stroke="#FFD15C" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* 5. Bottom Center Red Bird (m shape) */}
      <svg className="absolute bottom-[10%] left-[40%] w-8 h-8 animate-float" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16">
        <path d="M 2 14 Q 7 2 12 14 Q 17 2 22 14" fill="none" stroke="#FF4C60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* 6. Top Center Purple Dash */}
      <svg className="absolute top-[10%] left-[45%] w-5 h-5 animate-float-delayed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <line x1="15" y1="2" x2="5" y2="18" stroke="#6C6CE5" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* 7. Top Right Yellow Inverted Triangle */}
      <svg className="absolute top-[20%] right-[30%] w-6 h-6 animate-float" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <polygon points="2,3 18,3 10,17" fill="none" stroke="#FFD15C" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>

      {/* 8. Top Right Purple Arc (U shape) */}
      <svg className="absolute top-[10%] right-[10%] w-6 h-6 animate-float-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M 2 5 A 8 8 0 0 0 18 5" fill="none" stroke="#6C6CE5" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* 9. Middle Right Green Spring (w shape) */}
      <svg className="absolute top-[45%] right-[18%] w-8 h-8 animate-float-delayed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16">
        <path d="M 2 2 Q 7 14 12 2 Q 17 14 22 2" fill="none" stroke="#44D7B6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* 10. Bottom Right Purple Dash */}
      <svg className="absolute bottom-[20%] right-[28%] w-5 h-5 animate-float" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <line x1="4" y1="4" x2="16" y2="16" stroke="#6C6CE5" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* 11. Bottom Right Yellow Arc (U shape) */}
      <svg className="absolute bottom-[10%] right-[10%] w-6 h-6 animate-float-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M 2 5 A 8 8 0 0 0 18 5" fill="none" stroke="#FFD15C" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      
    </div>
  );
}
