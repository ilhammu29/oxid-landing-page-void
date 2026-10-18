import React from 'react';
import { ArrowRight, FastForward } from 'lucide-react';

// ============================================================================
// 1. PRIMOGEM / CELESTIAL 4-POINT STAR (Genshin Impact Signature Emblem)
// ============================================================================
export const PrimogemStar: React.FC<{
  className?: string;
  size?: number;
  glow?: 'purple' | 'cyan' | 'white';
  showRays?: boolean;
}> = ({ className = '', size = 24, glow = 'purple', showRays = true }) => {
  const glowStyles = {
    purple: 'drop-shadow(0 0 10px rgba(232, 62, 255, 0.85)) drop-shadow(0 0 20px rgba(155, 92, 255, 0.5))',
    cyan: 'drop-shadow(0 0 10px rgba(56, 225, 255, 0.9)) drop-shadow(0 0 20px rgba(0, 255, 204, 0.5))',
    white: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 16px rgba(232, 62, 255, 0.6))',
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: glowStyles[glow] }}
      className={`inline-block flex-shrink-0 ${className}`}
    >
      {/* Subtle Astral Ring */}
      <circle cx="16" cy="16" r="11" stroke={glow === 'cyan' ? '#38E1FF' : '#E83EFF'} strokeWidth="0.7" strokeOpacity="0.45" strokeDasharray="3 2" />

      {/* Diagonal Sparkle Rays */}
      {showRays && (
        <>
          <line x1="8" y1="8" x2="24" y2="24" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
          <line x1="24" y1="8" x2="8" y2="24" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.5" />
        </>
      )}

      {/* Main Faceted 4-Point Star (Elongated Vertical Tips) */}
      {/* Top-Left Facet */}
      <path d="M16 2 L16 16 L12.5 13 Z" fill={glow === 'cyan' ? '#A5F3FC' : '#F5D0FE'} />
      {/* Top-Right Facet */}
      <path d="M16 2 L19.5 13 L16 16 Z" fill={glow === 'cyan' ? '#38E1FF' : '#E83EFF'} />
      {/* Bottom-Left Facet */}
      <path d="M16 30 L12.5 19 L16 16 Z" fill={glow === 'cyan' ? '#0284C7' : '#9333EA'} />
      {/* Bottom-Right Facet */}
      <path d="M16 30 L16 16 L19.5 19 Z" fill={glow === 'cyan' ? '#38E1FF' : '#C084FC'} />

      {/* Left Point */}
      <path d="M2 16 L16 16 L13 12.5 Z" fill={glow === 'cyan' ? '#38E1FF' : '#C084FC'} />
      <path d="M2 16 L13 19.5 L16 16 Z" fill={glow === 'cyan' ? '#0284C7' : '#7E22CE'} />

      {/* Right Point */}
      <path d="M30 16 L16 16 L19 12.5 Z" fill={glow === 'cyan' ? '#E0F2FE' : '#F5D0FE'} />
      <path d="M30 16 L19 19.5 L16 16 Z" fill={glow === 'cyan' ? '#38E1FF' : '#A855F7'} />

      {/* Glowing Singularity Micro-Diamond Center */}
      <polygon points="16,13.5 18.5,16 16,18.5 13.5,16" fill="#FFFFFF" />
    </svg>
  );
};

// ============================================================================
// 2. GENSHIN ASTROLABE COMPASS EMBLEM (Bottom Left Footer)
// ============================================================================
export const GenshinAstrolabe: React.FC<{ size?: number; className?: string }> = ({ size = 38, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: 'drop-shadow(0 0 12px rgba(232, 62, 255, 0.75))' }}
      className={`flex-shrink-0 ${className}`}
    >
      {/* Outer Rotating Compass Ring */}
      <circle cx="22" cy="22" r="17" stroke="#E83EFF" strokeWidth="1.2" strokeOpacity="0.75" />
      <circle cx="22" cy="22" r="14.5" stroke="#F5F1FA" strokeWidth="0.6" strokeOpacity="0.4" strokeDasharray="2 2" />

      {/* 4 Directional Cardinal Ticks */}
      <line x1="22" y1="2" x2="22" y2="7" stroke="#E83EFF" strokeWidth="1.5" />
      <line x1="22" y1="37" x2="22" y2="42" stroke="#E83EFF" strokeWidth="1.5" />
      <line x1="2" y1="22" x2="7" y2="22" stroke="#E83EFF" strokeWidth="1.5" />
      <line x1="37" y1="22" x2="42" y2="22" stroke="#E83EFF" strokeWidth="1.5" />

      {/* Central 4-Point Primogem Star */}
      <path d="M22 8 L24 19 L35 22 L24 25 L22 36 L20 25 L9 22 L20 19 Z" fill="#E83EFF" />
      <path d="M22 11 L23.5 19.5 L31 22 L23.5 24.5 L22 33 L20.5 24.5 L13 22 L20.5 19.5 Z" fill="#F5F1FA" />
      <circle cx="22" cy="22" r="2.2" fill="#FFFFFF" />
    </svg>
  );
};

// ============================================================================
// 3. TOP BRAND WORDMARK (With embedded Diamond Star in letter 'O' & Separator Line)
// ============================================================================
export const GenshinBrandLogo: React.FC<{
  subtitle?: string;
  onClick?: () => void;
  title?: string;
  showSeparator?: boolean;
  symmetrical?: boolean;
  className?: string;
}> = ({
  subtitle = 'DIGITAL TECHNOLOGY STUDIO',
  onClick,
  title,
  showSeparator = true,
  symmetrical = false,
  className = '',
}) => {
  const content = symmetrical ? (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 md:gap-3.5 group select-none ${className}`}>
      {/* Left Symmetrical Wing */}
      <div className="hidden sm:flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="text-[7px] text-[#E83EFF]/60 leading-none">✦</span>
        <div className="w-6 sm:w-12 md:w-16 lg:w-20 h-[1px] bg-gradient-to-l from-[#E83EFF] via-[#E83EFF]/60 to-transparent" />
        <span className="text-[9px] text-[#E83EFF] leading-none drop-shadow-[0_0_6px_#E83EFF]">✦</span>
      </div>

      {/* Celestial Astral Emblem */}
      <div className="relative flex items-center justify-center flex-shrink-0 scale-75 xs:scale-90 sm:scale-100">
        <PrimogemStar size={36} glow="purple" />
      </div>

      {/* Typography (OXID + Subtitle) */}
      <div className="flex flex-col items-center">
        <div className="flex items-center tracking-[0.2em] sm:tracking-[0.24em] font-cinzel font-bold text-lg xs:text-xl sm:text-2xl md:text-[26px] text-white drop-shadow-[0_0_15px_rgba(232,62,255,0.7)] group-hover:drop-shadow-[0_0_22px_rgba(232,62,255,0.95)] transition-all">
          <span className="relative inline-flex items-center justify-center">
            <span>O</span>
            <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] text-[#E83EFF] drop-shadow-[0_0_6px_#E83EFF]">
              ✦
            </span>
          </span>
          <span>XID</span>
        </div>

        {/* Centered Subtitle */}
        <span className="text-[7px] sm:text-[8px] md:text-[9px] font-mono tracking-[0.2em] sm:tracking-[0.32em] text-[#C4B5DC] group-hover:text-white uppercase -mt-0.5 transition-colors text-center">
          {subtitle}
        </span>
      </div>

      {/* Right Symmetrical Wing */}
      <div className="hidden sm:flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        <span className="text-[9px] text-[#E83EFF] leading-none drop-shadow-[0_0_6px_#E83EFF]">✦</span>
        <div className="w-6 sm:w-12 md:w-16 lg:w-20 h-[1px] bg-gradient-to-r from-[#E83EFF] via-[#E83EFF]/60 to-transparent" />
        <span className="text-[7px] text-[#E83EFF]/60 leading-none">✦</span>
      </div>
    </div>
  ) : (
    <div className={`flex items-center gap-2 sm:gap-3.5 group select-none ${className}`}>
      {/* Celestial Astral Emblem */}
      <div className="relative flex items-center justify-center scale-75 xs:scale-90 sm:scale-100 flex-shrink-0">
        <PrimogemStar size={38} glow="purple" />
      </div>

      {/* Typography + Decorative Hairline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* OXID with 4-point star embedded inside 'O' */}
          <div className="flex items-center tracking-[0.2em] sm:tracking-[0.22em] font-cinzel font-bold text-lg xs:text-xl sm:text-2xl md:text-[26px] text-white drop-shadow-[0_0_15px_rgba(232,62,255,0.7)] group-hover:drop-shadow-[0_0_22px_rgba(232,62,255,0.95)] transition-all">
            <span className="relative inline-flex items-center justify-center">
              <span>O</span>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] sm:text-[10px] text-[#E83EFF] drop-shadow-[0_0_6px_#E83EFF]">
                ✦
              </span>
            </span>
            <span>XID</span>
          </div>

          {/* Horizontal Decorative Separator <✦───✦> */}
          {showSeparator && (
            <div className="hidden sm:flex items-center gap-1.5 opacity-80">
              <span className="text-[9px] text-[#E83EFF] leading-none drop-shadow-[0_0_6px_#E83EFF]">✦</span>
              <div className="w-16 md:w-28 h-[1px] bg-gradient-to-r from-[#E83EFF] via-[#E83EFF]/60 to-transparent" />
              <span className="text-[7px] text-[#E83EFF]/60 leading-none">✦</span>
            </div>
          )}
        </div>

        {/* Subtitle */}
        <span className="text-[7px] sm:text-[9px] md:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.28em] text-[#C4B5DC] group-hover:text-white uppercase -mt-0.5 transition-colors">
          {subtitle}
        </span>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        title={title}
        className="cursor-pointer focus:outline-none transition-transform hover:scale-[1.03] active:scale-[0.98]"
      >
        {content}
      </button>
    );
  }

  return content;
};

// ============================================================================
// 3B. GENSHIN NAV LINK (Hover luminescence & subtle diamond indicator)
// ============================================================================
export const GenshinNavLink: React.FC<{
  href: string;
  active?: boolean;
  children: React.ReactNode;
  className?: string;
}> = ({ href, active = false, children, className = '' }) => {
  return (
    <a
      href={href}
      className={`group relative flex items-center gap-1.5 py-1 text-xs lg:text-[13px] font-cinzel font-bold tracking-[0.22em] uppercase transition-all duration-200 cursor-pointer ${
        active
          ? 'text-white drop-shadow-[0_0_10px_rgba(232,62,255,0.9)]'
          : 'text-[#E2D6F5]/80 hover:text-white hover:drop-shadow-[0_0_12px_rgba(232,62,255,0.85)]'
      } ${className}`}
    >
      <span
        className={`text-[7px] transition-all duration-200 ${
          active
            ? 'text-[#E83EFF] opacity-100 scale-110 drop-shadow-[0_0_6px_#E83EFF]'
            : 'text-[#E83EFF] opacity-0 group-hover:opacity-100 group-hover:scale-100 drop-shadow-[0_0_6px_#E83EFF]'
        }`}
      >
        ✦
      </span>
      <span>{children}</span>
      <span
        className={`absolute -bottom-0.5 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E83EFF] to-transparent transition-opacity duration-200 ${
          active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      />
    </a>
  );
};

// ============================================================================
// 4. GENSHIN CHAMFERED PILL BUTTON (For LOG IN, WARP REPLAY, SKIP, RETURN HOME)
// ============================================================================
export const GenshinPillButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  accent?: 'purple' | 'cyan';
  icon?: React.ReactNode;
  className?: string;
  title?: string;
}> = ({ children, onClick, accent = 'purple', icon, className = '', title }) => {
  const isPurple = accent === 'purple';

  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`relative group px-2.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 flex items-center gap-1.5 sm:gap-2.5 transition-all duration-300 backdrop-blur-xl focus:outline-none cursor-pointer ${className}`}
      style={{
        clipPath:
          'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)',
      }}
    >
      {/* Background with Cosmic Glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isPurple
            ? 'bg-gradient-to-r from-[#1E0B36]/90 via-[#2E1052]/90 to-[#160728]/90 group-hover:from-[#2E1052] group-hover:to-[#3F1673]'
            : 'bg-gradient-to-r from-[#07243B]/90 via-[#0B3556]/90 to-[#051829]/90 group-hover:from-[#0B3556] group-hover:to-[#124B79]'
        }`}
      />

      {/* Glowing Outer Border Outline */}
      <div
        className={`absolute inset-0 border-[1.5px] transition-all duration-300 pointer-events-none ${
          isPurple
            ? 'border-[#E83EFF]/70 group-hover:border-[#E83EFF] shadow-[0_0_16px_rgba(232,62,255,0.4)] group-hover:shadow-[0_0_25px_rgba(232,62,255,0.75)]'
            : 'border-[#38E1FF]/70 group-hover:border-[#38E1FF] shadow-[0_0_16px_rgba(56,225,255,0.4)] group-hover:shadow-[0_0_25px_rgba(56,225,255,0.75)]'
        }`}
        style={{
          clipPath:
            'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)',
        }}
      />

      {/* Inner Double Hairline Frame */}
      <div
        className={`absolute inset-[2px] border-[0.8px] transition-all duration-300 pointer-events-none opacity-70 group-hover:opacity-100 ${
          isPurple
            ? 'border-[#E83EFF]/50 group-hover:border-[#F5D0FE]'
            : 'border-[#38E1FF]/50 group-hover:border-[#BAE6FD]'
        }`}
        style={{
          clipPath:
            'polygon(6px 0%, calc(100% - 6px) 0%, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0% calc(100% - 6px), 0% 6px)',
        }}
      />

      {/* Decorative Corner Bracket Diamond Accents */}
      <span
        className={`absolute -top-1 left-1.5 sm:left-2 text-[7px] sm:text-[8px] transition-transform duration-300 group-hover:scale-125 ${
          isPurple ? 'text-[#E83EFF]' : 'text-[#38E1FF]'
        }`}
      >
        ✦
      </span>
      <span
        className={`absolute -bottom-1 right-1.5 sm:right-2 text-[7px] sm:text-[8px] transition-transform duration-300 group-hover:scale-125 ${
          isPurple ? 'text-[#E83EFF]' : 'text-[#38E1FF]'
        }`}
      >
        ✦
      </span>

      {/* Left Icon (Primogem star, reticle, etc.) */}
      {icon && <span className="relative z-10 flex-shrink-0">{icon}</span>}

      {/* Button Text */}
      <span className="relative z-10 font-cinzel font-black text-[10px] sm:text-xs md:text-[13px] tracking-[0.14em] sm:tracking-[0.2em] uppercase text-white group-hover:text-[#F5F1FA] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
        {children}
      </span>
    </button>
  );
};

// ============================================================================
// 5. GENSHIN HERO ACTION BUTTON (START DISCOVERY & EXPLORE PRODUCT)
// Genshin Impact Double-Line Ornate Frame, Bold Typography & Auto Sizing
// ============================================================================
export const GenshinHeroButton: React.FC<{
  title: string;
  onClick: () => void;
  accent: 'purple' | 'cyan';
  className?: string;
}> = ({ title, onClick, accent, className = '' }) => {
  const isPurple = accent === 'purple';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative group w-full max-w-[340px] sm:w-auto sm:min-w-[320px] md:min-w-[380px] lg:min-w-[400px] h-auto min-h-[56px] sm:min-h-[66px] md:min-h-[74px] flex items-center justify-between px-4 sm:px-8 md:px-10 py-3 sm:py-4 md:py-4.5 gap-3.5 sm:gap-5 md:gap-7 transition-all duration-300 cursor-pointer select-none focus:outline-none hover:scale-[1.03] active:scale-[0.98] ${className}`}
    >
      {/* 1. Base Chamfered Decagon Glass Container */}
      <div
        className={`absolute inset-0 transition-all duration-300 ${
          isPurple
            ? 'bg-gradient-to-r from-[#1A062B]/95 via-[#2E0B4E]/92 to-[#140422]/95 group-hover:from-[#290945] group-hover:via-[#3E0F68] group-hover:to-[#1F0634]'
            : 'bg-gradient-to-r from-[#041B2D]/95 via-[#0A2D4A]/92 to-[#021320]/95 group-hover:from-[#082944] group-hover:via-[#0F3F66] group-hover:to-[#041D30]'
        }`}
        style={{
          clipPath:
            'polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
        }}
      />

      {/* 2. Genshin Outer Ornate Metallic Frame (2px Chamfered) */}
      <div
        className={`absolute inset-0 border-[1.5px] sm:border-[2px] transition-all duration-300 pointer-events-none ${
          isPurple
            ? 'border-[#E83EFF] shadow-[0_0_24px_rgba(232,62,255,0.5),inset_0_1px_1px_rgba(255,255,255,0.35)] group-hover:shadow-[0_0_40px_rgba(232,62,255,0.9)]'
            : 'border-[#38E1FF] shadow-[0_0_24px_rgba(56,225,255,0.5),inset_0_1px_1px_rgba(255,255,255,0.35)] group-hover:shadow-[0_0_40px_rgba(56,225,255,0.9)]'
        }`}
        style={{
          clipPath:
            'polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
        }}
      />

      {/* 3. Genshin Signature Inner Double Hairline Frame (Chamfered Inset) */}
      <div
        className={`absolute inset-[2.5px] sm:inset-[3.5px] border-[0.8px] sm:border-[1px] transition-all duration-300 pointer-events-none opacity-80 group-hover:opacity-100 ${
          isPurple
            ? 'border-[#E83EFF]/60 group-hover:border-[#F5D0FE]'
            : 'border-[#38E1FF]/60 group-hover:border-[#BAE6FD]'
        }`}
        style={{
          clipPath:
            'polygon(11px 0%, calc(100% - 11px) 0%, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0% calc(100% - 11px), 0% 11px)',
        }}
      />

      {/* 4. Top & Bottom Genshin Filigree Crests */}
      <div className="absolute -top-1.5 sm:-top-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
        <div className={`w-3 sm:w-4 h-[1px] ${isPurple ? 'bg-gradient-to-r from-transparent to-[#E83EFF]' : 'bg-gradient-to-r from-transparent to-[#38E1FF]'}`} />
        <span className={`text-[8px] sm:text-[10px] leading-none drop-shadow-[0_0_6px_currentColor] ${isPurple ? 'text-[#E83EFF]' : 'text-[#38E1FF]'}`}>✦</span>
        <div className={`w-3 sm:w-4 h-[1px] ${isPurple ? 'bg-gradient-to-l from-transparent to-[#E83EFF]' : 'bg-gradient-to-l from-transparent to-[#38E1FF]'}`} />
      </div>
      <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 pointer-events-none">
        <div className={`w-3 sm:w-4 h-[1px] ${isPurple ? 'bg-gradient-to-r from-transparent to-[#E83EFF]' : 'bg-gradient-to-r from-transparent to-[#38E1FF]'}`} />
        <span className={`text-[8px] sm:text-[10px] leading-none drop-shadow-[0_0_6px_currentColor] ${isPurple ? 'text-[#E83EFF]' : 'text-[#38E1FF]'}`}>✦</span>
        <div className={`w-3 sm:w-4 h-[1px] ${isPurple ? 'bg-gradient-to-l from-transparent to-[#E83EFF]' : 'bg-gradient-to-l from-transparent to-[#38E1FF]'}`} />
      </div>

      {/* 5. Four Corner Genshin Diamond Studs */}
      <span className={`absolute -top-1 -left-1 sm:-top-1.5 sm:-left-1.5 text-[9px] sm:text-[11px] drop-shadow-[0_0_6px_currentColor] transition-transform duration-300 group-hover:scale-125 ${isPurple ? 'text-[#E83EFF]' : 'text-[#38E1FF]'}`}>✦</span>
      <span className={`absolute -top-1 -right-1 sm:-top-1.5 sm:-right-1.5 text-[9px] sm:text-[11px] drop-shadow-[0_0_6px_currentColor] transition-transform duration-300 group-hover:scale-125 ${isPurple ? 'text-[#E83EFF]' : 'text-[#38E1FF]'}`}>✦</span>
      <span className={`absolute -bottom-1 -left-1 sm:-bottom-1.5 sm:-left-1.5 text-[9px] sm:text-[11px] drop-shadow-[0_0_6px_currentColor] transition-transform duration-300 group-hover:scale-125 ${isPurple ? 'text-[#E83EFF]' : 'text-[#38E1FF]'}`}>✦</span>
      <span className={`absolute -bottom-1 -right-1 sm:-bottom-1.5 sm:-right-1.5 text-[9px] sm:text-[11px] drop-shadow-[0_0_6px_currentColor] transition-transform duration-300 group-hover:scale-125 ${isPurple ? 'text-[#E83EFF]' : 'text-[#38E1FF]'}`}>✦</span>

      {/* 6. Left & Right Flank Filigree Accents */}
      <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-3 sm:h-4 ${isPurple ? 'bg-[#E83EFF]/80' : 'bg-[#38E1FF]/80'}`} />
      <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-[2px] h-3 sm:h-4 ${isPurple ? 'bg-[#E83EFF]/80' : 'bg-[#38E1FF]/80'}`} />

      {/* 7. Left Icon: Radiant Primogem Star */}
      <div className="relative z-10 flex items-center justify-center flex-shrink-0 scale-80 sm:scale-100">
        <PrimogemStar size={30} glow={isPurple ? 'purple' : 'cyan'} />
      </div>

      {/* 8. Main Button Text: Bold Genshin Impact Typography, Thickened & Sized Proportional */}
      <span className="relative z-10 font-cinzel font-black text-xs xs:text-sm sm:text-base md:text-xl tracking-[0.16em] sm:tracking-[0.22em] uppercase text-white group-hover:text-[#F5F1FA] transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] drop-shadow-[0_0_12px_rgba(232,62,255,0.5)]">
        {title}
      </span>

      {/* 9. Right Arrow Icon */}
      <div className="relative z-10 flex items-center flex-shrink-0">
        <ArrowRight
          className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-1.5 drop-shadow-[0_0_8px_currentColor] ${
            isPurple ? 'text-[#E83EFF]' : 'text-[#38E1FF]'
          }`}
        />
      </div>
    </button>
  );
};

// ============================================================================
// 6. GENSHIN TELEMETRY CAPSULE (SYSTEM STANDBY · INITIATION READY)
// ============================================================================
export const GenshinTelemetryBadge: React.FC<{ text?: string }> = ({
  text = 'SYSTEM STANDBY · INITIATION READY',
}) => {
  return (
    <div className="relative inline-flex items-center justify-center select-none mb-6">
      {/* Outer Wing Hairlines extending Left and Right with Diamond tips */}
      <div className="hidden sm:flex absolute items-center w-[calc(100%+80px)] pointer-events-none -z-0">
        <span className="text-[9px] text-[#E83EFF] drop-shadow-[0_0_6px_#E83EFF]">✦</span>
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#E83EFF]/60 to-transparent" />
        <span className="text-[9px] text-[#E83EFF] drop-shadow-[0_0_6px_#E83EFF]">✦</span>
      </div>

      {/* Central Capsule */}
      <div
        className="relative z-10 px-5 py-1.5 md:px-7 md:py-2 bg-[#170928]/85 border border-[#E83EFF]/60 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(232,62,255,0.25)] flex items-center gap-3"
        style={{
          clipPath:
            'polygon(12px 0%, calc(100% - 12px) 0%, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0% calc(100% - 12px), 0% 12px)',
        }}
      >
        {/* Left Glowing Oval Primogem Icon */}
        <span className="flex items-center justify-center w-4 h-4 rounded-full bg-[#E83EFF]/20 border border-[#E83EFF]">
          <span className="text-[8px] text-[#E83EFF]">✦</span>
        </span>

        {/* Telemetry Text */}
        <span className="font-mono text-[10px] md:text-[11px] font-semibold tracking-[0.24em] text-[#E2D6F5] uppercase">
          {text}
        </span>

        {/* Right Diamond Star */}
        <span className="text-[8px] text-[#E83EFF]/80">✦</span>
      </div>
    </div>
  );
};

// ============================================================================
// 7. GENSHIN CUTSCENE SKIP CONTROLLER (FOR VIDEO 2)
// Appears smoothly during Video 2 cutscene, allows instant skipping to Video 3
// ============================================================================
export const GenshinCutsceneSkip: React.FC<{
  onSkip: () => void;
}> = ({ onSkip }) => {
  return (
    <div className="absolute top-5 right-6 md:right-14 z-50 flex items-center gap-3 animate-fade-in pointer-events-auto">
      {/* Auto Indicator Badge */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#E83EFF]/40 bg-[#100B18]/70 backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-[#38E1FF] animate-pulse" />
        <span className="text-[9px] font-mono tracking-widest text-[#E2D6F5] uppercase">
          AUTO · CUTSCENE
        </span>
      </div>

      {/* Signature Genshin Impact SKIP Button */}
      <button
        type="button"
        onClick={onSkip}
        title="Skip Cutscene (or press Space)"
        className="group relative px-4 py-2 md:px-5 md:py-2.5 flex items-center gap-2.5 bg-gradient-to-r from-[#1D0A35]/95 via-[#2E0F54]/95 to-[#16072A]/95 border border-[#E83EFF] hover:border-[#38E1FF] text-white transition-all duration-300 shadow-[0_0_20px_rgba(232,62,255,0.4)] hover:shadow-[0_0_30px_rgba(56,225,255,0.7)] backdrop-blur-xl hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          clipPath:
            'polygon(10px 0%, calc(100% - 10px) 0%, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0% calc(100% - 10px), 0% 10px)',
        }}
      >
        <span className="absolute -top-1 left-2 text-[8px] text-[#E83EFF] group-hover:text-[#38E1FF]">✦</span>
        <span className="absolute -bottom-1 right-2 text-[8px] text-[#E83EFF] group-hover:text-[#38E1FF]">✦</span>

        <span className="font-cinzel font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-white group-hover:text-[#38E1FF] transition-colors">
          SKIP
        </span>

        <FastForward className="w-4 h-4 text-[#E83EFF] group-hover:text-[#38E1FF] group-hover:translate-x-1 transition-all" />
      </button>
    </div>
  );
};
