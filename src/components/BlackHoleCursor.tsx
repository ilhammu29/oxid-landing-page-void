import React, { useEffect, useRef } from 'react';

/**
 * Clean Zero-Lag Custom Cursor with Vibrant Purple Gradient
 * - Absolutely NO heavy canvas calculations or particle suction
 * - 0ms hardware mouse tracking (direct DOM transform without React state latency)
 * - Exquisite purple gradient dot and sleek outer gradient aura
 * - Smooth scale reaction on clickable element hover and mousedown
 */
export const BlackHoleCursor: React.FC = () => {
  // Direct DOM references for 0ms instantaneous hardware pointer positioning
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const isVisible = useRef(false);

  useEffect(() => {
    // Disable completely on touch devices
    if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    const cursorEl = cursorRef.current;
    const ringEl = ringRef.current;
    if (!cursorEl || !ringEl) return;

    // Instant 0ms hardware pointer tracking on mousemove
    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;

      if (!isVisible.current) {
        isVisible.current = true;
        cursorEl.style.opacity = '1';
        ringEl.style.opacity = '1';
      }

      // Direct hardware coordinate transform without CSS transition lag
      cursorEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      ringEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;

      // Dynamic hover detection for interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') !== null ||
          target.closest('a') !== null ||
          target.getAttribute('role') === 'button' ||
          target.classList.contains('cursor-pointer')
        );

        if (isInteractive) {
          ringEl.classList.add('scale-140', 'border-[#E83EFF]', 'shadow-[0_0_20px_rgba(232,62,255,0.7)]');
          ringEl.classList.remove('scale-100', 'border-[#E83EFF]/50');
        } else {
          ringEl.classList.remove('scale-140', 'border-[#E83EFF]', 'shadow-[0_0_20px_rgba(232,62,255,0.7)]');
          ringEl.classList.add('scale-100', 'border-[#E83EFF]/50');
        }
      }
    };

    const onMouseDown = () => {
      ringEl.classList.add('scale-85');
    };

    const onMouseUp = () => {
      ringEl.classList.remove('scale-85');
    };

    const onMouseLeave = () => {
      isVisible.current = false;
      cursorEl.style.opacity = '0';
      ringEl.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* -----------------------------------------------------------------
          1. SLEEK OUTER PURPLE GRADIENT AURA RING
          24px diameter, soft purple radial gradient, zero-lag position
          ----------------------------------------------------------------- */}
      <div
        ref={ringRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none z-[9998] will-change-transform transition-[opacity,transform] duration-150 ease-out"
      >
        <div className="w-full h-full rounded-full border border-[#E83EFF]/50 bg-[radial-gradient(circle,rgba(232,62,255,0.22)_0%,rgba(155,92,255,0.08)_50%,transparent_75%)] shadow-[0_0_12px_rgba(232,62,255,0.4)] backdrop-blur-[0.5px]" />
      </div>

      {/* -----------------------------------------------------------------
          2. PRECISION PURPLE GRADIENT CORE POINTER
          8px precision dot with gradient (#F5D0FE -> #E83EFF -> #9333EA)
          Zero CSS transition on position for instantaneous 0ms tracking
          ----------------------------------------------------------------- */}
      <div
        ref={cursorRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999] will-change-transform transition-opacity duration-200"
      >
        <div className="relative flex items-center justify-center w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#F5D0FE] via-[#E83EFF] to-[#9333EA] shadow-[0_0_10px_#E83EFF,0_0_4px_#FFFFFF]">
          {/* Micro Center Singularity Star Point */}
          <div className="w-1 h-1 rounded-full bg-white shadow-[0_0_3px_#FFFFFF]" />
        </div>
      </div>
    </>
  );
};

export default BlackHoleCursor;
