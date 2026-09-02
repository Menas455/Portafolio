export default function BackgroundShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1] opacity-50">
      
      {/* 1. Purple Plus / Cross - Top Left (About Section Area) */}
      <svg className="absolute top-[15%] left-[5%] w-6 h-6 animate-float-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M 10 2 L 10 18 M 2 10 L 18 10" fill="none" stroke="#6C6CE5" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* 2. Yellow Circle Outline - (Services Section Area) */}
      <div className="absolute top-[30%] right-[8%] w-8 h-8 rounded-full border-[2.5px] border-[#FFD15C] animate-float"></div>

      {/* 3. Green Dash - Bottom Left (Experience Section Area) */}
      <svg className="absolute top-[45%] left-[8%] w-5 h-5 animate-spin-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <line x1="2" y1="18" x2="18" y2="2" stroke="#44D7B6" strokeWidth="2.5" strokeLinecap="round" />
      </svg>

      {/* 4. Red Triangle - (Projects Section Area) */}
      <svg className="absolute top-[60%] right-[12%] w-7 h-7 animate-float-delayed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <polygon points="10,2 19,17 1,17" fill="none" stroke="#FF4C60" strokeWidth="2.5" strokeLinejoin="round" transform="rotate(25 10 10)" />
      </svg>

      {/* 5. Purple Arc (U shape) - (Contact Section Area) */}
      <svg className="absolute top-[75%] left-[10%] w-6 h-6 animate-float" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M 2 5 A 8 8 0 0 0 18 5" fill="none" stroke="#6C6CE5" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-40 10 10)"/>
      </svg>

      {/* 6. Yellow Inverted Triangle - Near Bottom */}
      <svg className="absolute top-[90%] right-[15%] w-6 h-6 animate-float-slow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <polygon points="1,3 19,3 10,18" fill="none" stroke="#FFD15C" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>

      {/* 7. Green Spring - Middle of the page */}
      <svg className="absolute top-[35%] left-[40%] w-8 h-8 animate-float-delayed" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16">
        <path d="M 2 2 Q 7 14 12 2 Q 17 14 22 2" fill="none" stroke="#44D7B6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" transform="rotate(15 12 8)" />
      </svg>

      {/* 8. Red Bird (m shape) - Near Footer */}
      <svg className="absolute top-[85%] left-[45%] w-8 h-8 animate-float" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16">
        <path d="M 2 14 Q 7 2 12 14 Q 17 2 22 14" fill="none" stroke="#FF4C60" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      
    </div>
  );
}
