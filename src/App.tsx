import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Volume2, VolumeX, RotateCcw, ChevronLeft, ChevronRight, Home, Zap, Shield, Cpu } from 'lucide-react';
import { soundFX } from './utils/audio';
import { BlackHoleCursor } from './components/BlackHoleCursor';
import { 
  PrimogemStar, 
  GenshinBrandLogo, 
  GenshinNavLink,
  GenshinPillButton, 
  GenshinHeroButton, 
  GenshinAstrolabe 
} from './components/GenshinUI';

type ExperienceStage = 
  | 'stage1_looping'    // Video 1 looping, navbar logo, 2 buttons (Start Discovery & Explore Product)
  | 'stage2_playing'    // Video 2 smoothly playing (continuous camera zoom/pan)
  | 'stage3_active'     // Video 3 looping, full template layout revealed
  | 'stage4_product';   // Video 4 looping, transparent dual cardboxes carousel layout

// Data for Left Cardbox Carousel (Characters with Transparent No-Background Art)
const charactersData = [
  {
    id: '01',
    name: 'AURA · VOID WEAVER',
    codename: 'SINGULARITY SPECIALIST',
    rank: 'ALPHA · S-TIER',
    image: '/images/characters/character_1.svg',
    accentColor: '#E83EFF',
    description: 'Master of gravitational curvature and antimatter vortex generation. Anchors real-time spatial singularities.',
    stats: { power: 96, agility: 88, resonance: 98 },
    telemetry: 'SYNC FREQ: 142.8 THz · STABLE'
  },
  {
    id: '02',
    name: 'NYX · QUANTUM SYNAPSE',
    codename: 'TEMPORAL INFILTRATOR',
    rank: 'SPECTRE · S-TIER',
    image: '/images/characters/character_2.svg',
    accentColor: '#38E1FF',
    description: 'Specializes in sub-atomic barrier projection, nanite data streams, and zero-latency hyper-warp telemetry.',
    stats: { power: 91, agility: 97, resonance: 93 },
    telemetry: 'PHASE FLUX: 0.002 ps · OPTIMAL'
  },
  {
    id: '03',
    name: 'VALKYRIE · NEBULA PROTOCOL',
    codename: 'CELESTIAL RECLAIMER',
    rank: 'VANGUARD · EX-TIER',
    image: '/images/characters/character_3.svg',
    accentColor: '#FFD700',
    description: 'Deploys high-energy solar corona aegis and interplanetary quantum routing arrays across galactic clusters.',
    stats: { power: 99, agility: 89, resonance: 95 },
    telemetry: 'SOLAR DENSITY: 98.9% · CRITICAL'
  }
];

// Data for Right Cardbox Carousel (Product / Technology Modules)
const productsData = [
  {
    id: 'MOD-01',
    title: 'OXID NEURAL ENGINE',
    category: 'COGNITIVE COMPUTING',
    version: 'v4.8 PRO',
    accentColor: '#E83EFF',
    headline: 'Hyper-Scalable Intelligent Kernel',
    description: 'Autonomous reasoning engine engineered to orchestrate multi-agent microservices and real-time interactive digital ecosystems with sub-millisecond dispatch latency.',
    features: [
      'Autonomous Neural State Synchronization',
      'Zero-Latency Context Vector Streaming',
      'Dynamic Quantum Inference Pipeline'
    ],
    metric: '99.98% Throughput Efficiency',
    icon: Cpu
  },
  {
    id: 'MOD-02',
    title: 'CHRONO SPATIAL SUITE',
    category: 'GRAPHICS & RENDERING',
    version: 'v3.2 ULTIMATE',
    accentColor: '#38E1FF',
    headline: 'Real-Time Cinematic Viewport',
    description: 'Hardware-accelerated web spatial pipeline featuring volumetric atmospheric shaders, dynamic camera choreography, and seamless 100svh GPU viewport locks.',
    features: [
      'GPU-Accelerated Volumetric Shaders',
      'Continuous Zero-Flicker Stream Hand-off',
      'Adaptive HDR Ray-Marching Canvas'
    ],
    metric: '144 FPS Target Fluidity',
    icon: Zap
  },
  {
    id: 'MOD-03',
    title: 'ASTRAL MATRIX CORE',
    category: 'DISTRIBUTED ARCHITECTURE',
    version: 'v6.0 ENTERPRISE',
    accentColor: '#FFD700',
    headline: 'Mission-Critical Cloud Mesh',
    description: 'Decentralized high-throughput telemetry architecture engineered to safeguard mission-critical digital flagships with automated failover and quantum-grade cipher suites.',
    features: [
      'Multi-Region Anycast Edge Replication',
      'Fault-Tolerant Distributed Consensus',
      'End-to-End Cryptographic Enclave'
    ],
    metric: '99.999% Fault Resilience',
    icon: Shield
  }
];

export const App: React.FC = () => {
  // Current active stage
  const [stage, setStage] = useState<ExperienceStage>('stage1_looping');
  
  // Opacity controls for seamless zero-artifact cross-dissolve
  const [v1Opacity, setV1Opacity] = useState<number>(1);
  const [v2Opacity, setV2Opacity] = useState<number>(0);
  const [v3Opacity, setV3Opacity] = useState<number>(0);
  const [v4Opacity, setV4Opacity] = useState<number>(0);

  // Video 1 Zoom & Optical Easing Controls
  const [v1ZoomScale, setV1ZoomScale] = useState<number>(1.01);
  const [v1TransitionCurve, setV1TransitionCurve] = useState<string>('none');

  // Video 4 Optical Zoom-out Controls (Initial baseline: calibrated at 2.70 to match Video 1 pixel-for-pixel)
  const [v4ZoomScale, setV4ZoomScale] = useState<number>(2.70);
  const [v4TransitionCurve, setV4TransitionCurve] = useState<string>(
    'transform 1.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out'
  );

  // Transition & Choreography States
  const [isTransitioningToV4, setIsTransitioningToV4] = useState<boolean>(false);
  const [isTransitioningFromV4, setIsTransitioningFromV4] = useState<boolean>(false);
  const [isStage4Visible, setIsStage4Visible] = useState<boolean>(false);

  // Video 3 Clean Transparent Zoom-In State (No particles)
  const [isZoomingInV3, setIsZoomingInV3] = useState<boolean>(false);
  const [isVoidDarkness, setIsVoidDarkness] = useState<boolean>(false);

  // Start Discovery Purple Aura Radiant Shockwave Effect
  const [isDiscoveryAuraActive, setIsDiscoveryAuraActive] = useState<boolean>(false);

  // Carousel active slide index for Stage 4
  const [charIndex, setCharIndex] = useState<number>(0);
  const [prodIndex, setProdIndex] = useState<number>(0);

  // Audio control
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Video refs
  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);
  const video3Ref = useRef<HTMLVideoElement | null>(null);
  const video4Ref = useRef<HTMLVideoElement | null>(null);

  // Clone refs & opacities for seamless loop cross-dissolve (Zero hitch/freeze on loop rewind)
  const video1CloneRef = useRef<HTMLVideoElement | null>(null);
  const [v1CloneOpacity, setV1CloneOpacity] = useState<number>(0);
  const isV1Looping = useRef<boolean>(false);

  const video3CloneRef = useRef<HTMLVideoElement | null>(null);
  const [v3CloneOpacity, setV3CloneOpacity] = useState<number>(0);
  const isV3Looping = useRef<boolean>(false);

  const video4CloneRef = useRef<HTMLVideoElement | null>(null);
  const [v4CloneOpacity, setV4CloneOpacity] = useState<number>(0);
  const isV4Looping = useRef<boolean>(false);

  // Seamless Loop Handler for Video 1 (Soft 450ms crossfade before loop seam)
  const handleVideo1TimeUpdate = () => {
    const v1 = video1Ref.current;
    const v1Clone = video1CloneRef.current;
    if (!v1 || !v1Clone || stage !== 'stage1_looping' || isTransitioningToV4 || isTransitioningFromV4) return;

    const duration = v1.duration || 6;
    if (v1.currentTime >= duration - 0.45 && !isV1Looping.current) {
      isV1Looping.current = true;
      v1Clone.currentTime = 0;
      v1Clone.play().catch(() => {});
      setV1CloneOpacity(1);

      setTimeout(() => {
        if (v1 && v1Clone) {
          v1.currentTime = v1Clone.currentTime;
        }
        setV1CloneOpacity(0);
        setTimeout(() => {
          isV1Looping.current = false;
        }, 300);
      }, 450);
    }
  };

  // Seamless Loop Handler for Video 3
  const handleVideo3TimeUpdate = () => {
    const v3 = video3Ref.current;
    const v3Clone = video3CloneRef.current;
    if (!v3 || !v3Clone || stage !== 'stage3_active' || isZoomingInV3) return;

    const duration = v3.duration || 6;
    if (v3.currentTime >= duration - 0.45 && !isV3Looping.current) {
      isV3Looping.current = true;
      v3Clone.currentTime = 0;
      v3Clone.play().catch(() => {});
      setV3CloneOpacity(1);

      setTimeout(() => {
        if (v3 && v3Clone) {
          v3.currentTime = v3Clone.currentTime;
        }
        setV3CloneOpacity(0);
        setTimeout(() => {
          isV3Looping.current = false;
        }, 300);
      }, 450);
    }
  };

  // Seamless Loop Handler for Video 4
  const handleVideo4TimeUpdate = () => {
    const v4 = video4Ref.current;
    const v4Clone = video4CloneRef.current;
    if (!v4 || !v4Clone || stage !== 'stage4_product' || isTransitioningFromV4 || isTransitioningToV4) return;

    const duration = v4.duration || 6;
    if (v4.currentTime >= duration - 0.45 && !isV4Looping.current) {
      isV4Looping.current = true;
      v4Clone.currentTime = 0;
      v4Clone.play().catch(() => {});
      setV4CloneOpacity(1);

      setTimeout(() => {
        if (v4 && v4Clone) {
          v4.currentTime = v4Clone.currentTime;
        }
        setV4CloneOpacity(0);
        setTimeout(() => {
          isV4Looping.current = false;
        }, 300);
      }, 450);
    }
  };

  // Flag to avoid double triggering of transition
  const transitionToV3Triggered = useRef<boolean>(false);

  // Pre-warm and buffer all videos on initial mount for instant zero-lag playback
  useEffect(() => {
    if (video1CloneRef.current) video1CloneRef.current.load();
    if (video2Ref.current) video2Ref.current.load();
    if (video3Ref.current) video3Ref.current.load();
    if (video3CloneRef.current) video3CloneRef.current.load();
    if (video4Ref.current) video4Ref.current.load();
    if (video4CloneRef.current) video4CloneRef.current.load();
  }, []);

  // Sync soundFX enable state
  useEffect(() => {
    soundFX.enabled = soundEnabled;
  }, [soundEnabled]);

  // =========================================================================
  // TRANSITION 1: Video 1 -> Video 2 -> Video 3 (Start Discovery Flow)
  // =========================================================================
  const handleStartDiscovery = () => {
    const v1 = video1Ref.current;
    const v2 = video2Ref.current;

    if (!v2) return;

    // Radiate expansive purple cosmic aura shockwave
    soundFX.playWarpWhoosh();
    setIsDiscoveryAuraActive(true);
    setStage('stage2_playing');
    transitionToV3Triggered.current = false;

    // Reset radiating aura effect after shockwave expansion finishes
    setTimeout(() => {
      setIsDiscoveryAuraActive(false);
    }, 950);

    v2.currentTime = 0;
    const playPromise = v2.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        setV2Opacity(1);
        setTimeout(() => {
          setV1Opacity(0);
          if (v1) v1.pause();
        }, 200);
      }).catch(() => {
        setV2Opacity(1);
        setV1Opacity(0);
      });
    } else {
      setV2Opacity(1);
      setV1Opacity(0);
    }
  };

  // Seamless transition from Video 2 -> Video 3
  const handleTransitionToV3 = useCallback(() => {
    if (transitionToV3Triggered.current) return;
    transitionToV3Triggered.current = true;

    const v2 = video2Ref.current;
    const v3 = video3Ref.current;

    if (!v3) return;

    setStage('stage3_active');

    v3.currentTime = 0;
    const playPromise = v3.play();

    if (playPromise !== undefined) {
      playPromise.then(() => {
        setV3Opacity(1);
        setTimeout(() => {
          setV2Opacity(0);
          if (v2) v2.pause();
        }, 180);
      }).catch(() => {
        setV3Opacity(1);
        setV2Opacity(0);
      });
    } else {
      setV3Opacity(1);
      setV2Opacity(0);
    }
  }, []);

  const handleVideo2TimeUpdate = () => {
    const v2 = video2Ref.current;
    if (!v2 || transitionToV3Triggered.current) return;

    if (v2.duration > 0 && v2.currentTime >= v2.duration - 0.15) {
      handleTransitionToV3();
    }
  };

  const handleVideo2Ended = () => {
    handleTransitionToV3();
  };

  // Keyboard shortcut listener: Press Space, Escape, or Enter to skip Video 2 cutscene
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (stage === 'stage2_playing' && (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter')) {
        e.preventDefault();
        soundFX.playSubtleClick();
        handleTransitionToV3();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stage, handleTransitionToV3]);

  // =========================================================================
  // TRANSITION 2: Video 1 -> Video 4 (Zero-Artifact Cinematic Camera Zoom-Out)
  // - Video 4 is calibrated at scale 2.70 around origin (46.9% 50.1%), matching V1 pixel-for-pixel.
  // - Handoff has ZERO cross-dissolve / ghosting (no "PPT transition").
  // - Camera pulls back continuously and fluidly from 2.70 to 1.0 over 1.8s.
  // =========================================================================
  const handleExploreProduct = () => {
    if (isTransitioningToV4 || isTransitioningFromV4 || stage !== 'stage1_looping') return;

    const v1 = video1Ref.current;
    const v4 = video4Ref.current;

    if (!v4) return;

    setIsTransitioningToV4(true);
    soundFX.playOpticalZoomOut();

    // 1. Synchronize Video 4's playback time to Video 1 for exact temporal match
    if (v1 && v1.duration > 0) {
      v4.currentTime = v1.currentTime % (v4.duration || 6);
    }
    v4.play().catch(() => {});

    // 2. Set Video 4 at exact matching scale 2.70 with no transition, opacity 1
    setV4TransitionCurve('none');
    setV4ZoomScale(2.70);
    setV4Opacity(1);

    // 3. Next frame: Hide Video 1 (no double-image) and trigger fluid camera zoom-out
    requestAnimationFrame(() => {
      // Hide V1 immediately so there is NO double-image / PPT crossfade
      setV1Opacity(0);
      if (v1) v1.pause();

      // Begin cinematic dolly pull-back
      requestAnimationFrame(() => {
        setV4TransitionCurve('transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out');
        setV4ZoomScale(1.0);
      });
    });

    // 4. As camera settles (at ~1100ms), reveal Stage 4 UI
    setTimeout(() => {
      setStage('stage4_product');
      setIsStage4Visible(true);
      setIsTransitioningToV4(false);
    }, 1100);
  };

  // =========================================================================
  // TRANSITION 4: Video 4 -> Video 1 (Symmetric Optical Dolly Push-In into Blackhole)
  // - Camera smoothly dives straight into the blackhole (1.0 -> 2.70)
  //   using the identical 1.7s cubic-bezier(0.16, 1, 0.3, 1) cinematic deceleration curve.
  // - Video 4 sits on top at zIndex 25 with full opacity, so the user CLEARLY sees the black hole zoom!
  // - Video 1 is pre-synchronized at 0ms and plays live underneath (zIndex 10).
  // - As Video 4 arrives at scale 2.70 (exact pixel-match with Video 1),
  //   Video 4 cross-fades into Video 1 over 400ms while Video 1 is ALREADY live at 60fps.
  // - ZERO seek lag, ZERO flicker, ZERO PPT artifacts — completely seamless single take!
  // =========================================================================
  const handleReturnToHomeFromV4 = () => {
    if (isTransitioningFromV4 || isTransitioningToV4 || stage !== 'stage4_product') return;

    const v1 = video1Ref.current;
    const v4 = video4Ref.current;

    setIsTransitioningFromV4(true);
    setIsStage4Visible(false); // cardboxes slide out cleanly to the sides
    soundFX.playOpticalZoomIn();

    // 1. Immediately pre-synchronize Video 1 and start live playback underneath
    if (v1 && v4 && v4.duration > 0) {
      v1.currentTime = v4.currentTime % (v1.duration || 6);
      v1.play().catch(() => {});
    }
    // Ensure Video 1 is ready underneath Video 4
    setV1TransitionCurve('none');
    setV1ZoomScale(1.01);
    setV1Opacity(1);

    // 2. Video 4 is at zIndex 25, fully on top of Video 1 (zIndex 10).
    // Ensure transition curve is active and trigger immediate smooth zoom-in straight into the black hole!
    setV4TransitionCurve('transform 1.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out');
    setV4ZoomScale(2.70);

    // 3. As camera decelerates into the close-up view (matching V1 pixel-for-pixel):
    // Smoothly fade out Video 4 (revealing already-running Video 1) and fade in Stage 1 UI
    setTimeout(() => {
      setV4Opacity(0);
      setStage('stage1_looping');
    }, 1250);

    // 4. Complete transition lifecycle and clean up after camera motion completes
    setTimeout(() => {
      if (v4) v4.pause();
      setIsTransitioningFromV4(false);
    }, 1750);
  };

  // =========================================================================
  // TRANSITION 3: Clean Transparent Zoom In (V3) -> Void -> Zoom Out (V1)
  // - All V3 UI objects vanish immediately at 0ms.
  // - V1 components are immediately active upon entering V1.
  // - No extra particles/flares (pure video transparency).
  // =========================================================================
  const handleZoomBackToVideo1 = () => {
    if (isZoomingInV3 || isVoidDarkness || stage !== 'stage3_active') return;

    const v1 = video1Ref.current;
    const v3 = video3Ref.current;

    soundFX.playWarpWhoosh();

    // 1. Immediately trigger clean video zoom in on Video 3 (No particles/flares)
    setIsZoomingInV3(true);

    // 2. Dip into Darkness (Void singularity) at the apex of zoom in
    setTimeout(() => {
      setIsVoidDarkness(true);
    }, 650);

    // 3. In complete darkness: switch stage to Video 1 so Video 1 UI is ALREADY PRESENT
    setTimeout(() => {
      setV3Opacity(0);
      setIsZoomingInV3(false);
      if (v3) v3.pause();

      // Immediately set stage to stage1_looping so Stage 1 components (wordmark & 2 buttons) exist
      setStage('stage1_looping');

      // Pre-position Video 1 zoomed-in at 2.8x (without animation)
      setV1TransitionCurve('none');
      setV1ZoomScale(2.8);
      setV1Opacity(1);

      // Reset Video 4 scale to 2.70 ready for Explore Product
      setV4ZoomScale(2.70);
      setV4TransitionCurve('none');
      setV4Opacity(0);

      if (v1) {
        v1.currentTime = 0;
        v1.play().catch(() => {});
      }

      // 4. Fade from darkness and smoothly ZOOM OUT Video 1
      setTimeout(() => {
        setIsVoidDarkness(false);
        setV1TransitionCurve('transform 1.35s cubic-bezier(0.16, 1, 0.3, 1)');
        setV1ZoomScale(1.01);
        soundFX.playWarpRelease();
      }, 100);

    }, 950);

    // 5. Clean up transitions
    setTimeout(() => {
      setV1TransitionCurve('none');
      transitionToV3Triggered.current = false;
    }, 2350);
  };

  const handleSkipVideo2 = () => {
    handleTransitionToV3();
  };

  // Carousel navigation handlers for Stage 4
  const nextCharacter = () => {
    soundFX.playSubtleClick();
    setCharIndex((prev) => (prev + 1) % charactersData.length);
  };

  const prevCharacter = () => {
    soundFX.playSubtleClick();
    setCharIndex((prev) => (prev - 1 + charactersData.length) % charactersData.length);
  };

  const nextProduct = () => {
    soundFX.playSubtleClick();
    setProdIndex((prev) => (prev + 1) % productsData.length);
  };

  const prevProduct = () => {
    soundFX.playSubtleClick();
    setProdIndex((prev) => (prev - 1 + productsData.length) % productsData.length);
  };

  const activeChar = charactersData[charIndex];
  const activeProd = productsData[prodIndex];
  const ProdIcon = activeProd.icon;

  return (
    <main className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-between bg-[#07060B] text-[#F5F1FA] select-none">
      
      {/* Custom Interactive Blackhole Cursor with Gravitational Suction & Purple Aura */}
      <BlackHoleCursor />
      
      {/* =========================================================================
          VOID DARKNESS OVERLAY (During Singularity Phase)
          ========================================================================= */}
      <div 
        className={`fixed inset-0 z-50 bg-[#07060B] pointer-events-none transition-opacity duration-500 ease-in-out ${
          isVoidDarkness ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* =========================================================================
          START DISCOVERY RADIANT TRANSLUCENT GRADIENT AURA
          Delicate, feather-soft transparent cosmic gradient ripple (Zero hard edges or thick colors)
          ========================================================================= */}
      {isDiscoveryAuraActive && (
        <div className="fixed inset-0 z-[60] pointer-events-none flex items-center justify-center overflow-hidden">
          {/* 1. Ultra-soft Ethereal Cosmic Ambient Luminescence */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,62,255,0.10)_0%,rgba(147,51,234,0.05)_40%,transparent_75%)] animate-discovery-bloom" />

          {/* 2. Primary Soft Feathered Gradient Wavefront (Transparent Center, Feathered Glow) */}
          <div className="w-[420px] h-[420px] rounded-full bg-[radial-gradient(circle,transparent_45%,rgba(232,62,255,0.20)_65%,rgba(147,51,234,0.08)_80%,transparent_95%)] blur-[2px] animate-discovery-shockwave-1" />

          {/* 3. Secondary Trailing Ethereal Gradient Ripple */}
          <div className="absolute w-[340px] h-[340px] rounded-full bg-[radial-gradient(circle,transparent_40%,rgba(168,85,247,0.14)_65%,rgba(88,28,135,0.06)_80%,transparent_95%)] blur-[3px] animate-discovery-shockwave-2" />
        </div>
      )}

      {/* =========================================================================
          BACKGROUND LAYER: 4 Stacked GPU-accelerated video layers
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Layer 1: Video 1 (looping_1.mp4) - Base Idle with Zoom-Out capability */}
        <div
          style={{
            transformOrigin: '49.5% 58.5%', // Center of blackhole in Video 1
            transform: `scale(${v1ZoomScale})`,
            transition: v1TransitionCurve,
            opacity: v1Opacity,
            zIndex: 10,
          }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          {/* Primary Stream */}
          <video
            ref={video1Ref}
            src="/videos/looping_1.mp4"
            autoPlay
            loop
            muted
            playsInline
            onTimeUpdate={handleVideo1TimeUpdate}
            className="w-full h-full object-cover scale-[1.01]"
          />
          {/* Seamless Loop Clone (Smooth Cross-dissolve at loop seam) */}
          <video
            ref={video1CloneRef}
            src="/videos/looping_1.mp4"
            muted
            playsInline
            preload="auto"
            style={{ opacity: v1CloneOpacity }}
            className="absolute inset-0 w-full h-full object-cover scale-[1.01] transition-opacity duration-500 ease-in-out pointer-events-none"
          />
        </div>

        {/* Layer 2: Video 2 (center_video.mp4) - Seamless Camera Action */}
        <video
          ref={video2Ref}
          src="/videos/center_video.mp4"
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleVideo2TimeUpdate}
          onEnded={handleVideo2Ended}
          style={{ opacity: v2Opacity, zIndex: 20 }}
          className="absolute inset-0 w-full h-full object-cover scale-[1.01] transition-opacity duration-300 ease-out"
        />

        {/* Layer 3: Video 3 (ending_looping.mp4) - Clean Transparent Zoom In to Blackhole */}
        <div
          style={{
            transformOrigin: '26.5% 48.0%', // Exact coordinates of blackhole accretion center in Video 3
            transform: isZoomingInV3 ? 'scale(5.8)' : 'scale(1.01)',
            transition: 'transform 0.95s cubic-bezier(0.28, 0, 0.12, 1)',
            opacity: v3Opacity,
            zIndex: 30,
          }}
          className="absolute inset-0 w-full h-full transition-opacity duration-400 ease-out"
        >
          {/* Primary Stream */}
          <video
            ref={video3Ref}
            src="/videos/ending_looping.mp4"
            loop
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleVideo3TimeUpdate}
            className="w-full h-full object-cover"
          />
          {/* Seamless Loop Clone */}
          <video
            ref={video3CloneRef}
            src="/videos/ending_looping.mp4"
            muted
            playsInline
            preload="auto"
            style={{ opacity: v3CloneOpacity }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out pointer-events-none"
          />
        </div>

        {/* Layer 4: Video 4 (looping_4.mp4) - Pixel-matched Optical Dolly Zoom-Out */}
        <div
          style={{
            transformOrigin: '46.9% 50.1%', // Exactly calibrated to blackhole center in V4
            transform: `scale(${v4ZoomScale})`,
            transition: v4TransitionCurve,
            opacity: v4Opacity,
            zIndex: 25,
          }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          {/* Primary Stream */}
          <video
            ref={video4Ref}
            src="/videos/looping_4.mp4"
            loop
            muted
            playsInline
            preload="auto"
            onTimeUpdate={handleVideo4TimeUpdate}
            className="w-full h-full object-cover"
          />
          {/* Seamless Loop Clone */}
          <video
            ref={video4CloneRef}
            src="/videos/looping_4.mp4"
            muted
            playsInline
            preload="auto"
            style={{ opacity: v4CloneOpacity }}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out pointer-events-none"
          />
        </div>

        {/* =========================================================================
            STAGE 3 AMBIENT COSMIC EFFECTS (Positioned with Character on Left)
            ========================================================================= */}
        <div 
          className={`absolute inset-0 z-[32] pointer-events-none transition-opacity duration-300 ease-out ${
            stage === 'stage3_active' && !isZoomingInV3 && !isVoidDarkness ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute left-[8%] md:left-[16%] top-[14%] w-[320px] md:w-[440px] h-[320px] md:h-[440px] rounded-full border border-[#E83EFF]/25 shadow-[0_0_80px_rgba(232,62,255,0.2)] animate-portal-spin pointer-events-none">
            <div className="w-full h-full rounded-full border-t-2 border-r-2 border-[#38E1FF]/35" />
          </div>

          <div className="absolute left-[14%] md:left-[22%] top-[16%] w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-tr from-[#F5F1FA] via-[#E8B4FF] to-white shadow-[0_0_35px_rgba(245,241,250,0.8)] animate-glow-pulse pointer-events-none" />

          <div className="absolute top-0 right-0 bottom-0 bg-gradient-to-l from-[#07060B] via-[#07060B]/80 to-transparent w-full md:w-[58%] z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07060B] via-transparent to-[#07060B]/70 w-full h-full z-10 pointer-events-none" />

          <div className="absolute top-[20%] right-[32%] w-6 h-10 rounded-full bg-gradient-to-br from-[#FF3D72] to-[#E83EFF]/70 blur-[0.5px] rotate-45 shadow-[0_0_12px_#FF3D72] animate-petal-drift-1 z-20 pointer-events-none" />
          <div className="absolute top-[45%] right-[22%] w-5 h-8 rounded-full bg-gradient-to-br from-[#E83EFF] to-[#9B5CFF]/80 blur-[0.5px] -rotate-12 shadow-[0_0_15px_#E83EFF] animate-petal-drift-2 z-20 pointer-events-none" />
          <div className="absolute top-[15%] right-[10%] w-7 h-12 rounded-full bg-gradient-to-br from-[#FF3D72]/80 to-[#FFA3CA] blur-[0.6px] rotate-30 shadow-[0_0_18px_#FF3D72] animate-petal-drift-3 z-20 pointer-events-none" />
        </div>

        {/* Global Dark Gradient & Film Grain */}
        <div className="absolute inset-0 z-[33] bg-gradient-to-t from-[#07060B] via-transparent to-[#07060B]/50 w-full h-full pointer-events-none" />
        <div className="absolute inset-0 z-[34] film-grain opacity-20 pointer-events-none" />
      </div>

      {/* =========================================================================
          INTERACTIVE BLACKHOLE WARP HOTSPOT (Clicking on Blackhole Warps Back to V1)
          ========================================================================= */}
      {stage === 'stage3_active' && !isZoomingInV3 && !isVoidDarkness && (
        <button
          type="button"
          onClick={handleZoomBackToVideo1}
          style={{ left: '26.5%', top: '48.0%' }}
          className="absolute z-40 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36 rounded-full cursor-pointer group flex items-center justify-center focus:outline-none"
          title="Click the Blackhole to Warp back to the Beginning"
        >
          <div className="w-full h-full rounded-full border border-[#E83EFF]/0 group-hover:border-[#E83EFF]/60 group-hover:shadow-[0_0_35px_rgba(232,62,255,0.6)] group-hover:bg-[#E83EFF]/10 transition-all duration-300 rounded-full flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2.5 py-1 rounded-full bg-[#100B18]/90 border border-[#38E1FF]/60 text-[9px] font-mono tracking-widest text-[#38E1FF] uppercase shadow-[0_0_15px_#38E1FF] pointer-events-none">
              WARP 🌀
            </span>
          </div>
        </button>
      )}

      {/* =========================================================================
          FAR-LEFT VERTICAL SIDEBAR ICON RAIL (Stage 3 Template Feature)
          Vanish instantly on zoom-in to Video 1, positioned below top master navbar
          ========================================================================= */}
      <aside 
        className={`absolute left-0 top-16 md:top-20 bottom-0 w-16 md:w-20 z-40 flex flex-col items-center justify-center gap-7 border-r border-[#E83EFF]/10 bg-[#07060B]/50 backdrop-blur-md transition-all duration-200 ease-out md:scale-[0.85] lg:scale-[0.80] origin-left ${
          stage === 'stage3_active' && !isZoomingInV3 && !isVoidDarkness
            ? 'opacity-100 translate-x-0 pointer-events-auto'
            : 'opacity-0 -translate-x-full pointer-events-none'
        }`}
      >
        <button type="button" className="group p-2.5 rounded-xl text-[#A59BB6] hover:text-[#E83EFF] hover:bg-[#E83EFF]/10 transition-all duration-200" title="Gaming & Systems">
          <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M6 11h4m-2-2v4m7.5-2.5h.01M18.5 13h.01M5 19l2.2-6.6A4.5 4.5 0 0111.5 9h1a4.5 4.5 0 014.3 3.4L19 19c.4 1.2-.5 2-1.6 2H6.6C5.5 21 4.6 20.2 5 19z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="group p-2.5 rounded-xl text-[#A59BB6] hover:text-[#E83EFF] hover:bg-[#E83EFF]/10 transition-all duration-200" title="Community & Forum">
          <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="group p-2.5 rounded-xl text-[#A59BB6] hover:text-[#E83EFF] hover:bg-[#E83EFF]/10 transition-all duration-200" title="Archive & Lore">
          <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button type="button" className="group p-2.5 rounded-xl text-[#A59BB6] hover:text-[#E83EFF] hover:bg-[#E83EFF]/10 transition-all duration-200" title="Profile & Account">
          <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </aside>

      {/* =========================================================================
          TOP NAVIGATION BAR (Adaptive Across Stages 1, 3, and 4)
          Stage 3: Left nav at far left corner, login & warp replay at far right corner,
          and OXID logo centered in the middle.
          Scaled ~80% on desktop (origin-top) for compact, elegant proportion
          ========================================================================= */}
      <header 
        className={`relative z-50 w-full transition-all duration-300 ease-out md:scale-[0.82] lg:scale-[0.80] origin-top ${
          stage === 'stage3_active'
            ? 'pt-3 pb-3 px-4 sm:px-6 md:px-8 border-b border-[#E83EFF]/15 bg-gradient-to-b from-[#07060B]/90 via-[#07060B]/50 to-transparent backdrop-blur-[6px]'
            : 'pt-3 md:pt-4 px-6 md:px-14 flex items-center justify-between'
        }`}
      >
        {/* =======================================================================
            STAGE 3 SPECIFIC NAVBAR: Edge-to-Edge Corner Layout
            - Left Corner: Nav Links (CHARACTERS, WORLD, NEWS & EVENT, ARCHIVE)
            - Center: Symmetrical OXID Wordmark & Primogem Crest (clickable warp back)
            - Right Corner: LOG IN, WARP REPLAY & Sound Toggle Orb
            ======================================================================= */}
        {stage === 'stage3_active' ? (
          <div 
            className={`relative w-full flex items-center justify-between transition-opacity duration-150 ${
              isZoomingInV3 || isVoidDarkness ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Zone 1: Left Navigation Group (Pushed to the Far Left Corner) */}
            <div className="flex items-center justify-start min-w-0 z-10">
              <nav className="hidden md:flex items-center gap-4 sm:gap-5 lg:gap-6">
                <GenshinNavLink href="#characters" active={true}>CHARACTERS</GenshinNavLink>
                <span className="text-[8px] text-[#E83EFF]/40">✦</span>
                <GenshinNavLink href="#world">THE WORLD</GenshinNavLink>
                <span className="text-[8px] text-[#E83EFF]/40">✦</span>
                <GenshinNavLink href="#news">NEWS &amp; EVENT</GenshinNavLink>
                <span className="text-[8px] text-[#E83EFF]/40">✦</span>
                <GenshinNavLink href="#archive">ARCHIVE</GenshinNavLink>
              </nav>
            </div>

            {/* Zone 2: Center Brand Crest (Absolute Dead Center on Screen) */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-auto">
              <GenshinBrandLogo 
                subtitle="DIGITAL TECHNOLOGY STUDIO"
                symmetrical={true}
                onClick={handleZoomBackToVideo1}
                title="Click to Zoom back to Singularity Origin"
              />
            </div>

            {/* Zone 3: Right Action Buttons (Pushed to the Far Right Corner) */}
            <div className="flex items-center justify-end min-w-0 gap-2.5 sm:gap-3.5 z-10">
              <GenshinPillButton
                accent="purple"
                icon={<span className="text-[#E83EFF] text-xs drop-shadow-[0_0_6px_#E83EFF]">✦</span>}
                title="Account Login"
              >
                LOG IN
              </GenshinPillButton>

              <GenshinPillButton
                accent="purple"
                onClick={handleZoomBackToVideo1}
                icon={
                  <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-180 transition-transform duration-500 text-[#E83EFF]" />
                }
                title="Zoom into Blackhole & Replay Sequence"
              >
                WARP REPLAY
              </GenshinPillButton>

              {/* Audio Orb Toggle */}
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
                title={soundEnabled ? "Sound: ON" : "Sound: OFF"}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#E83EFF]/60 hover:border-[#E83EFF] bg-[#160728]/80 hover:bg-[#2E1052] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(232,62,255,0.3)] hover:shadow-[0_0_25px_rgba(232,62,255,0.7)] text-white flex-shrink-0"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-red-400" />}
              </button>
            </div>
          </div>
        ) : (
          /* =======================================================================
             STAGES 1, 2, and 4 NAVBAR (Standard Brand Left, Actions Right)
             ======================================================================= */
          <>
            {/* Stage 1 & 2: Genshin Celestial Brand Logo */}
            {stage === 'stage1_looping' || stage === 'stage2_playing' ? (
              <GenshinBrandLogo subtitle="DIGITAL TECHNOLOGY STUDIO" />
            ) : (
              <div className={`transition-all duration-500 ease-out ${
                isStage4Visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}>
                <GenshinBrandLogo subtitle="ECOSYSTEM MATRIX" />
              </div>
            )}

            {/* Right Nav Controls for Stage 1, 2, 4 */}
            <div className="flex items-center gap-3">
              {/* Stage 1 Actions */}
              {stage === 'stage1_looping' && (
                <div className="flex items-center gap-2.5 sm:gap-3.5 animate-fade-in">
                  <GenshinPillButton
                    accent="purple"
                    icon={<span className="text-[#E83EFF] text-xs drop-shadow-[0_0_6px_#E83EFF]">✦</span>}
                    title="Account Login"
                  >
                    LOG IN
                  </GenshinPillButton>

                  <GenshinPillButton
                    accent="purple"
                    onClick={handleStartDiscovery}
                    icon={
                      <div className="w-3.5 h-3.5 rounded-full border border-[#E83EFF] flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fff]" />
                      </div>
                    }
                    title="Initiate Singularity Sequence"
                  >
                    WARP REPLAY
                  </GenshinPillButton>
                </div>
              )}



              {/* Stage 4 Actions */}
              {stage === 'stage4_product' && (
                <button
                  type="button"
                  onClick={handleReturnToHomeFromV4}
                  title="Return to Home Screen"
                  className={`px-4 py-2 rounded-full border border-[#38E1FF]/40 bg-[#100B18]/70 hover:bg-[#38E1FF]/20 text-xs font-mono text-[#F5F1FA] hover:text-white shadow-[0_0_16px_rgba(56,225,255,0.25)] hover:shadow-[0_0_24px_rgba(56,225,255,0.5)] backdrop-blur-md transition-all duration-300 flex items-center gap-2 group ${
                    isStage4Visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                  }`}
                >
                  <Home className="w-3.5 h-3.5 text-[#38E1FF] group-hover:scale-110 transition-transform" />
                  <span>RETURN HOME</span>
                </button>
              )}

              {/* Sound FX Toggle */}
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                aria-label={soundEnabled ? "Mute audio" : "Unmute audio"}
                title={soundEnabled ? "Sound: ON" : "Sound: OFF"}
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-[#E83EFF]/60 hover:border-[#E83EFF] bg-[#160728]/80 hover:bg-[#2E1052] flex items-center justify-center transition-all duration-300 shadow-[0_0_15px_rgba(232,62,255,0.3)] hover:shadow-[0_0_25px_rgba(232,62,255,0.7)] text-white"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-white" /> : <VolumeX className="w-4 h-4 text-red-400" />}
              </button>
            </div>
          </>
        )}
      </header>

      {/* =========================================================================
          CENTRAL STAGE VIEWPORT (Full Screen Workspace Between Header & Footer)
          Guarantees Stage 4 cardboxes are vertically centered and never clipped
          ========================================================================= */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center">

        {/* =========================================================================
            STAGE 1 HERO CONTENT: GENSHIN IMPACT CELESTIAL HERO
            Matches reference image /home/ilhammu29/Projects/landing_page_001/reference/komponen_video1.png
            Scaled ~80% on desktop (origin-center) for refined proportion
            ========================================================================= */}
        <section 
          className={`absolute inset-0 w-full h-full px-6 md:px-14 flex flex-col justify-center items-center text-center transition-all duration-600 cubic-bezier(0.16, 1, 0.3, 1) z-40 ${
            stage === 'stage1_looping' && !isVoidDarkness && !isTransitioningToV4
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-95 pointer-events-none'
          }`}
        >
          <div className="relative flex flex-col items-center w-full max-w-4xl select-none md:scale-[0.82] lg:scale-[0.80] origin-center">
            
            {/* 1. Top Celestial Primogem Star with Radial Rays */}
            <div className="flex flex-col items-center pointer-events-none mb-3">
              <PrimogemStar size={38} glow="purple" showRays={true} />
              <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-[#E83EFF] via-[#E83EFF]/60 to-transparent" />
            </div>

            {/* 4. Horizontal Axis Line & Hero Buttons */}
            <div className="relative w-full flex items-center justify-center">
              
              {/* Connecting background hairline with diamond star nodes */}
              <div className="hidden sm:flex absolute left-0 right-0 top-1/2 -translate-y-1/2 items-center justify-between pointer-events-none -z-0 px-2 md:px-6">
                <span className="text-[11px] text-[#E83EFF] drop-shadow-[0_0_8px_#E83EFF]">✦</span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-[#E83EFF]/80 via-[#9B5CFF]/30 to-[#38E1FF]/80" />
                <span className="text-[11px] text-[#38E1FF] drop-shadow-[0_0_8px_#38E1FF]">✦</span>
              </div>

              {/* The Two Genshin Hero Buttons */}
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-7 w-full">
                
                {/* Button 1: START DISCOVERY (Genshin Purple) */}
                <GenshinHeroButton
                  title="START DISCOVERY"
                  onClick={handleStartDiscovery}
                  accent="purple"
                />

                {/* Central Diamond Star Node in the Middle */}
                <div className="hidden sm:flex items-center justify-center flex-shrink-0 z-20">
                  <span className="text-sm text-[#E83EFF] drop-shadow-[0_0_10px_#E83EFF] animate-pulse">
                    ✦
                  </span>
                </div>

                {/* Button 2: EXPLORE PRODUCT (Genshin Cyan) */}
                <GenshinHeroButton
                  title="EXPLORE PRODUCT"
                  onClick={handleExploreProduct}
                  accent="cyan"
                />

              </div>
            </div>

            {/* 5. Lower Vertical Hairline pointing down into black hole */}
            <div className="w-[1px] h-10 md:h-14 bg-gradient-to-b from-[#E83EFF]/70 to-transparent pointer-events-none mt-2" />

          </div>
        </section>

        {/* =========================================================================
            STAGE 2 HERO CONTENT: Cinematic Video 2 Cutscene (Clean & Immersive)
            Full screen click or Space/Enter/Escape to skip directly to Stage 3
            ========================================================================= */}
        <section 
          onClick={handleSkipVideo2}
          className={`absolute inset-0 w-full h-full transition-opacity duration-300 ease-out z-40 cursor-pointer ${
            stage === 'stage2_playing' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        />

        {/* =========================================================================
            STAGE 3 HERO CONTENT: RE-POSITIONED TO THE RIGHT
            Vanish immediately when zooming into blackhole
            Scaled ~80% on desktop (origin-right)
            ========================================================================= */}
        <section 
          className={`absolute inset-0 w-full h-full pl-20 md:pl-28 pr-6 md:pr-14 lg:pr-20 flex flex-col justify-center items-end transition-all duration-200 ease-out z-30 ${
            stage === 'stage3_active' && !isZoomingInV3 && !isVoidDarkness
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          <div className="w-full md:max-w-xl lg:max-w-2xl text-left flex flex-col items-start -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-20 md:scale-[0.85] lg:scale-[0.80] origin-right">
            
            <div className="flex items-center gap-3 mb-2 md:mb-3">
              <div className="flex items-center gap-2.5">
                <svg className="w-6 h-6 md:w-7 md:h-7 text-[#E83EFF] drop-shadow-[0_0_10px_#E83EFF]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15 8.5L22 9.5L17 14.5L18.5 21.5L12 18L5.5 21.5L7 14.5L2 9.5L9 8.5L12 2Z" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-cinzel text-xl md:text-2xl font-extrabold tracking-[0.28em] text-white drop-shadow-[0_0_16px_rgba(232,62,255,0.7)]">
                    OXID
                  </span>
                  <span className="text-[8px] font-mono tracking-[0.45em] text-[#A59BB6] uppercase -mt-0.5">
                    TECHNOLOGY STUDIO
                  </span>
                </div>
              </div>
            </div>

            <h1 className="font-cinzel font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-[1.06] tracking-[0.05em] text-white uppercase cinematic-shadow mb-2 md:mb-3">
              EXPERIENCE SEVEN<br />
              <span className="bg-gradient-to-r from-white via-[#F5D8FF] to-[#D5A0FF] bg-clip-text text-transparent font-display font-extrabold tracking-[0.14em] block drop-shadow-[0_0_20px_rgba(232,62,255,0.45)]">
                REALMS TEEMING WITH CODE
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-[15px] font-light tracking-[0.07em] text-[#D0C5E2] mb-5 md:mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Released on Multiple Platforms — <span className="text-[#E83EFF] font-medium">Enter the Void!</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3.5 w-full">
              <a href="#ps5" className="glass-panel rounded-xl px-3 py-2.5 md:px-3.5 md:py-2.5 flex items-center justify-center gap-2.5 transition-all duration-300 group cursor-pointer">
                <svg className="w-5 h-5 text-white group-hover:text-[#38E1FF] transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.2 16.5c-1.3-.2-2.1-.8-2.1-1.6 0-1.1 1.3-1.8 3.3-2.1v2.3c-.4.8-.8 1.2-1.2 1.4zm10.6-2.5c-.2-.6-.9-1-1.8-1.2v2.8c1.3-.2 1.9-.9 1.8-1.6zm-5.4-8.8v11.7c-1.2.6-2.2.9-3.2.9-1.9 0-3.3-.8-3.3-2.3 0-1.7 1.8-2.6 4.4-2.9v-2c-3.7.3-6.6 1.7-6.6 4.7 0 2.8 2.5 4.3 6.1 4.3 1.8 0 3.3-.4 4.7-1.1v.6h2.2V5.2h-4.3zm6.6 6.3c-2.3-.3-4.5-.4-6.6-.4v2c1.7 0 3.3.1 4.6.3.8.1 1.4.3 1.7.5.3.3.3.6.1.9-.3.4-1 .6-2.1.7v2c2.1-.1 3.7-.7 4.3-1.8.6-1.1.2-2.8-2-4.2z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-[#A59BB6] leading-none">Console</span>
                  <span className="text-[11px] md:text-xs font-bold tracking-wider text-white group-hover:text-[#38E1FF] transition-colors">PS5 · PS4</span>
                </div>
              </a>

              <a href="#ios" className="glass-panel rounded-xl px-3 py-2.5 md:px-3.5 md:py-2.5 flex items-center justify-center gap-2.5 transition-all duration-300 group cursor-pointer">
                <svg className="w-5 h-5 text-white group-hover:text-[#E83EFF] transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.64 1.35-.57.65-1.07 1.71-.93 2.73 1 .08 2.02-.48 2.64-1.23z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] uppercase font-mono tracking-wider text-[#A59BB6] leading-none">Download</span>
                  <span className="text-[11px] md:text-xs font-bold tracking-wide text-white group-hover:text-[#E83EFF] transition-colors">App Store</span>
                </div>
              </a>

              <a href="#android" className="glass-panel rounded-xl px-3 py-2.5 md:px-3.5 md:py-2.5 flex items-center justify-center gap-2.5 transition-all duration-300 group cursor-pointer">
                <svg className="w-5 h-5 text-[#38E1FF] group-hover:text-[#FF3D72] transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186c-.378-.4-.61-.954-.61-1.597V3.411c0-.643.232-1.197.61-1.597zm11.246 11.248l2.585 2.585-11.892 6.845 9.307-9.43zm0-2.124L5.548 1.508 17.44 8.353l-2.585 2.585zm1.414 1.414l3.432-1.977c1.071-.617 1.071-1.625 0-2.242l-3.432-1.977-2.121 2.121 2.121 2.075z" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] uppercase font-mono tracking-wider text-[#A59BB6] leading-none">GET IT ON</span>
                  <span className="text-[11px] md:text-xs font-bold tracking-wide text-white group-hover:text-[#FF3D72] transition-colors">Google Play</span>
                </div>
              </a>

              <a href="#windows" className="glass-panel rounded-xl px-3 py-2.5 md:px-3.5 md:py-2.5 flex items-center justify-center gap-2.5 transition-all duration-300 group cursor-pointer">
                <svg className="w-5 h-5 text-white group-hover:text-[#38E1FF] transition-colors flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-13.051-1.802" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] uppercase font-mono tracking-wider text-[#A59BB6] leading-none">Desktop</span>
                  <span className="text-[11px] md:text-xs font-bold tracking-wide text-white group-hover:text-[#38E1FF] transition-colors">Windows</span>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* =========================================================================
            STAGE 4 HERO CONTENT: DUAL TRANSPARENT CARDBOXES SEJAJAR DI KIRI & KANAN
            Perfect Vertical Center Alignment without Overflow or Clipping
            ========================================================================= */}
        {stage === 'stage4_product' && (
          <section className="absolute inset-0 w-full h-full px-4 sm:px-6 md:px-10 lg:px-14 flex items-center justify-between pointer-events-auto overflow-hidden z-40 my-auto">
            <div className="w-full max-w-[1580px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8 my-auto py-2 md:scale-[0.82] lg:scale-[0.80] origin-center">
              
              {/* ---------------------------------------------------------------------
                  LEFT CARDBOX: Transparent Character Spotlight Carousel (No-BG Image)
                  Vertically Centered & Symmetrical
                  --------------------------------------------------------------------- */}
              <div className={`w-full md:w-[380px] lg:w-[410px] xl:w-[430px] max-h-[calc(100vh-140px)] md:max-h-[78vh] bg-[#100B18]/50 border border-[#E83EFF]/30 hover:border-[#E83EFF]/60 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] flex flex-col justify-between transition-all duration-700 ease-out ${
                isStage4Visible ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-12 pointer-events-none'
              }`}>
                
                {/* Cardbox Header */}
                <div className="flex items-center justify-between border-b border-[rgba(232,62,255,0.18)] pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E83EFF] animate-ping" />
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] text-[#E83EFF] uppercase font-semibold">
                      OPERATIVE · {activeChar.id}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full border border-[rgba(226,205,255,0.2)] bg-[#100B18]/70 text-[9px] font-mono text-[#A59BB6]">
                    {activeChar.rank}
                  </span>
                </div>

                {/* Character Visual: Transparent Art (No-Background) */}
                <div className="relative w-full h-36 sm:h-40 md:h-44 flex items-center justify-center overflow-hidden my-1">
                  <div 
                    className="absolute w-32 h-32 md:w-36 md:h-36 rounded-full blur-2xl opacity-40 transition-colors duration-500 pointer-events-none"
                    style={{ backgroundColor: activeChar.accentColor }}
                  />
                  
                  <img 
                    key={activeChar.id}
                    src={activeChar.image} 
                    alt={activeChar.name}
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(232,62,255,0.65)] animate-float-particle transition-all duration-500"
                  />
                </div>

                {/* Character Details */}
                <div>
                  <h3 className="font-cinzel text-lg md:text-xl font-bold tracking-[0.12em] text-white leading-tight">
                    {activeChar.name}
                  </h3>
                  <p className="text-[11px] font-mono tracking-widest text-[#38E1FF] uppercase mb-1">
                    {activeChar.codename}
                  </p>
                  <p className="text-xs font-light text-[#D0C5E2] leading-relaxed mb-2.5 line-clamp-2">
                    {activeChar.description}
                  </p>

                  {/* Stat Metrics Bar */}
                  <div className="grid grid-cols-3 gap-2.5 p-2 rounded-xl bg-[#07060B]/60 border border-[rgba(226,205,255,0.12)]">
                    <div>
                      <div className="flex justify-between text-[8px] font-mono text-[#A59BB6] mb-0.5">
                        <span>POWER</span>
                        <span className="text-white font-bold">{activeChar.stats.power}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#160E24] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#FF3D72] to-[#E83EFF]" style={{ width: `${activeChar.stats.power}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] font-mono text-[#A59BB6] mb-0.5">
                        <span>AGILITY</span>
                        <span className="text-white font-bold">{activeChar.stats.agility}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#160E24] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#E83EFF] to-[#38E1FF]" style={{ width: `${activeChar.stats.agility}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[8px] font-mono text-[#A59BB6] mb-0.5">
                        <span>SYNC</span>
                        <span className="text-white font-bold">{activeChar.stats.resonance}</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-[#160E24] overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#38E1FF] to-[#00FFCC]" style={{ width: `${activeChar.stats.resonance}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carousel Navigation Footer */}
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[rgba(232,62,255,0.15)]">
                  <span className="text-[10px] font-mono tracking-widest text-[#A59BB6]">
                    SLIDE <span className="text-white font-bold">{charIndex + 1}</span> / {charactersData.length}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevCharacter}
                      className="p-1.5 rounded-full border border-[rgba(226,205,255,0.2)] bg-[#100B18]/70 hover:bg-[#E83EFF]/25 text-white hover:text-[#E83EFF] transition-all"
                      title="Previous Character"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextCharacter}
                      className="p-1.5 rounded-full border border-[rgba(226,205,255,0.2)] bg-[#100B18]/70 hover:bg-[#E83EFF]/25 text-white hover:text-[#E83EFF] transition-all"
                      title="Next Character"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* ---------------------------------------------------------------------
                  RIGHT CARDBOX: Transparent Product Ecosystem Carousel
                  Vertically Centered & Symmetrical
                  --------------------------------------------------------------------- */}
              <div className={`w-full md:w-[380px] lg:w-[410px] xl:w-[430px] max-h-[calc(100vh-140px)] md:max-h-[78vh] bg-[#100B18]/50 border border-[#38E1FF]/30 hover:border-[#38E1FF]/60 rounded-2xl p-4 sm:p-5 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.65)] flex flex-col justify-between transition-all duration-700 ease-out delay-100 ${
                isStage4Visible ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-12 pointer-events-none'
              }`}>
                
                {/* Cardbox Header */}
                <div className="flex items-center justify-between border-b border-[rgba(56,225,255,0.18)] pb-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#38E1FF] animate-pulse" />
                    <span className="font-mono text-[10px] md:text-[11px] tracking-[0.22em] text-[#38E1FF] uppercase font-semibold">
                      PROTOCOL · {activeProd.id}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full border border-[rgba(56,225,255,0.3)] bg-[#100B18]/70 text-[9px] font-mono text-[#38E1FF]">
                    {activeProd.version}
                  </span>
                </div>

                {/* Product Info */}
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-2 rounded-xl border border-[rgba(56,225,255,0.3)] bg-[#38E1FF]/10 text-[#38E1FF]">
                      <ProdIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-cinzel text-lg md:text-xl font-bold tracking-[0.12em] text-white leading-tight">
                        {activeProd.title}
                      </h3>
                      <span className="text-[10px] font-mono tracking-widest text-[#A59BB6] uppercase">
                        {activeProd.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-light text-[#D0C5E2] leading-relaxed mb-2.5 line-clamp-2">
                    {activeProd.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-1.5 mb-2.5 p-2 rounded-xl bg-[#07060B]/60 border border-[rgba(56,225,255,0.12)]">
                    {activeProd.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#E2D6F5]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#38E1FF] shadow-[0_0_6px_#38E1FF] flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric & CTA Banner */}
                  <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#38E1FF]/25 bg-[#100B18]/80">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-mono text-[#A59BB6] uppercase tracking-wider">Performance Index</span>
                      <span className="text-xs md:text-sm font-bold text-[#38E1FF] tracking-wide">{activeProd.metric}</span>
                    </div>

                    <a
                      href="#deploy"
                      className="px-3.5 py-1.5 rounded-full border border-[#38E1FF] bg-[#38E1FF]/20 hover:bg-[#38E1FF] text-white hover:text-[#07060B] text-xs font-mono font-semibold tracking-wider transition-all duration-300 shadow-[0_0_15px_rgba(56,225,255,0.3)]"
                    >
                      DEPLOY
                    </a>
                  </div>
                </div>

                {/* Carousel Navigation Footer */}
                <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-[rgba(56,225,255,0.15)]">
                  <span className="text-[10px] font-mono tracking-widest text-[#A59BB6]">
                    SLIDE <span className="text-white font-bold">{prodIndex + 1}</span> / {productsData.length}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={prevProduct}
                      className="p-1.5 rounded-full border border-[rgba(56,225,255,0.2)] bg-[#100B18]/70 hover:bg-[#38E1FF]/25 text-white hover:text-[#38E1FF] transition-all"
                      title="Previous Product"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextProduct}
                      className="p-1.5 rounded-full border border-[rgba(56,225,255,0.2)] bg-[#100B18]/70 hover:bg-[#38E1FF]/25 text-white hover:text-[#38E1FF] transition-all"
                      title="Next Product"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

      </div>

      {/* =========================================================================
          SECTION 4: BOTTOM METADATA BAR (Genshin Impact Astrolabe Layout)
          Matches reference image /home/ilhammu29/Projects/landing_page_001/reference/komponen_video1.png
          Scaled ~80% on desktop (origin-bottom) for compact, elegant proportion
          ========================================================================= */}
      <footer 
        className={`relative z-30 w-full pb-3 md:pb-4 flex items-center justify-between text-[11px] font-mono tracking-[0.2em] transition-all duration-300 ease-out select-none md:scale-[0.82] lg:scale-[0.80] origin-bottom ${
          stage === 'stage3_active' && !isZoomingInV3 && !isVoidDarkness
            ? 'pl-20 md:pl-28 pr-6 md:pr-14 opacity-100 translate-y-0'
            : 'px-6 md:px-14 opacity-90'
        }`}
      >
        {/* Left: Astrolabe Emblem & Rights Notice */}
        <div className="flex items-center gap-3.5">
          <GenshinAstrolabe size={32} />
          <span className="text-[10px] md:text-[11px] font-mono tracking-[0.22em] text-[#D0C5E2] uppercase font-semibold">
            OXID INTERACTIVE INC. · ALL RIGHTS RESERVED
          </span>
        </div>

        {/* Center: Decorative Stepped Jog Hairline with Diamond Stars */}
        <div className="hidden lg:flex flex-1 items-center mx-8 opacity-75 pointer-events-none">
          <span className="text-[9px] text-[#E83EFF] drop-shadow-[0_0_6px_#E83EFF]">✦</span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#E83EFF]/80 via-[#9B5CFF]/30 to-[#E83EFF]/80" />
          <span className="text-[9px] text-[#E83EFF] drop-shadow-[0_0_6px_#E83EFF] mx-3">✦</span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-[#E83EFF]/80 via-[#38E1FF]/30 to-[#38E1FF]/80" />
          <span className="text-[9px] text-[#38E1FF] drop-shadow-[0_0_6px_#38E1FF]">✦</span>
        </div>

        {/* Right: Policy Links & Live Version Status with Diamond Stars */}
        <div className="hidden sm:flex items-center gap-4 text-[10px] md:text-[11px] font-mono tracking-[0.2em] text-[#C4B5DC]">
          <span className="hover:text-white transition-colors cursor-pointer">PRIVACY POLICY</span>
          <span className="text-white/40">•</span>
          <span className="hover:text-white transition-colors cursor-pointer">TERMS OF SERVICE</span>
          <span className="text-[#38E1FF] drop-shadow-[0_0_6px_#38E1FF]">✦</span>
          <span className="text-[#38E1FF] font-semibold tracking-wider">
            {stage === 'stage4_product' ? 'PRODUCT VIEW ACTIVE' : 'v2.6.0 LIVE'}
          </span>
          <span className="text-[#38E1FF] drop-shadow-[0_0_6px_#38E1FF]">✦</span>
        </div>
      </footer>

    </main>
  );
};

export default App;
