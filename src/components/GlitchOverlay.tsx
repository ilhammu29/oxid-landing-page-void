import React from 'react';

interface GlitchOverlayProps {
  label?: string;
}

export const GlitchOverlay: React.FC<GlitchOverlayProps> = ({ label = "QUANTUM FLUX TRANSITION" }) => {
  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Rapid flickering flash */}
      <div className="absolute inset-0 bg-[#E83EFF]/15 animate-glitch-flash mix-blend-screen" />
      <div className="absolute inset-0 bg-[#07060B]/50" />

      {/* Sliced distortion layers with chromatic aberration */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF3D72]/20 via-transparent to-[#9B5CFF]/20 animate-glitch-layer-1 mix-blend-color-dodge" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#00ffff]/20 via-transparent to-[#E83EFF]/20 animate-glitch-layer-2 mix-blend-screen" />

      {/* CRT Scanline bar sweeping through */}
      <div className="absolute inset-0 scanlines opacity-80" />
      <div className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-[#E83EFF]/25 to-transparent animate-scanline" />

      {/* Horizontal glitch slice blocks */}
      <div 
        className="absolute w-full h-8 bg-[#E83EFF]/40 backdrop-invert" 
        style={{ top: '28%', transform: 'skewX(-25deg)', filter: 'blur(1px)' }} 
      />
      <div 
        className="absolute w-full h-4 bg-[#FF3D72]/40" 
        style={{ top: '64%', transform: 'skewX(18deg) scaleY(1.5)' }} 
      />
      <div 
        className="absolute w-3/4 h-6 bg-[#9B5CFF]/30 right-0" 
        style={{ top: '48%', transform: 'translateX(20px)' }} 
      />

      {/* Cyber Telemetry Decode Box */}
      <div className="relative z-10 px-6 py-3 bg-[#100B18]/90 border border-[#E83EFF] rounded-sm shadow-[0_0_30px_#E83EFF] flex flex-col items-center gap-1.5 animate-pulse">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E83EFF] animate-ping" />
          <span className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#F5F1FA] uppercase font-bold">
            {label}
          </span>
        </div>
        <div className="font-mono text-[9px] text-[#E83EFF]/80 tracking-widest flex items-center gap-2">
          <span>FRAME_SYNC: RE-CALIBRATING</span>
          <span className="animate-spin text-xs">⟳</span>
        </div>
      </div>
    </div>
  );
};
