"use client";

import CanvasSequence from "@/components/CanvasSequence";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Plane } from "lucide-react";
import { span } from "framer-motion/client";

export default function Home() {
  const mainContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mainContainerRef,
    offset: ["start start", "end end"],
  });

  // Main container represents 4 scenes combined (1200vh).

  // --- Canvas Progresses ---
  const scene1Progress = useTransform(scrollYProgress, [0, 0.25], [0, 1], { clamp: true });
  const scene1Opacity = useTransform(scrollYProgress, [0, 0.25, 0.2501, 1], [1, 1, 0, 0]);

  const scene2Progress = useTransform(scrollYProgress, [0.25, 0.50], [0, 1], { clamp: true });
  const scene2Opacity = useTransform(scrollYProgress, [0, 0.2499, 0.25, 0.50, 0.5001, 1], [0, 0, 1, 1, 0, 0]);

  const transitionProgress = useTransform(scrollYProgress, [0.50, 0.75], [0, 1], { clamp: true });
  const transitionOpacity = useTransform(scrollYProgress, [0, 0.4999, 0.50, 0.75, 0.7501, 1], [0, 0, 1, 1, 0, 0]);

  const scene3Progress = useTransform(scrollYProgress, [0.75, 1.0], [0, 1], { clamp: true });
  const scene3Opacity = useTransform(scrollYProgress, [0, 0.7499, 0.75, 1], [0, 0, 1, 1]);

  // --- Text Overlays (Fade transitions for Scenes 1 and 2, hard cut for Scene 3) ---
  const scene1TextOpacity = useTransform(scrollYProgress, [0, 0.20, 0.24, 1], [1, 1, 0, 0]);
  const scene2TextOpacity = useTransform(scrollYProgress, [0, 0.24, 0.28, 0.46, 0.50, 1], [0, 0, 1, 1, 0, 0]);
  const scene3TextOpacity = useTransform(scrollYProgress, [0, 0.7499, 0.75, 1], [0, 0, 1, 1]);

  // --- Logo Animation ---
  const logoTop = useTransform(scrollYProgress, [0, 0.15], ["50%", "16px"]);
  const logoY = useTransform(scrollYProgress, [0, 0.15], ["-50%", "0%"]);
  const logoScale = useTransform(scrollYProgress, [0, 0.15], [2.5, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.05, 0.15], [0, 1, 1]);

  return (
    <main className="bg-[#111] w-full min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 md:px-12 z-[100] flex justify-between items-center text-white text-xs font-bold tracking-wide drop-shadow-md">
        <div className="hidden md:flex gap-8">
          <a href="#" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Our Fleet</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Advantages</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Global</a>
        </div>
        <motion.div
          style={{ top: logoTop, y: logoY, scale: logoScale, opacity: logoOpacity }}
          className="text-xl md:text-3xl font-semibold tracking-[0.2em] uppercase whitespace-nowrap absolute left-1/2 -translate-x-1/2"
        >
          Jesko Jets
        </motion.div>
        <div className="hidden md:flex gap-8">
          <span>+971 54 432 5050</span>
          <span>info@jeskojets.com</span>
        </div>
      </nav>

      {/* Book the Flight Button (Fixed Bottom) */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50">
        <button className="bg-white text-[#1a1a1a] flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-bold text-sm tracking-wide shadow-2xl hover:bg-gray-100 transition-colors">
          Book the Flight
          <div className="bg-white p-2 rounded-full shadow-md ml-1 border border-gray-100">
            <Plane className="w-4 h-4 -rotate-45" />
          </div>
        </button>
      </div>

      {/* The Continuous Scrollytelling Section */}
      <div ref={mainContainerRef} className="relative w-full h-[1600vh]">
        <div className="sticky top-0 w-full h-screen overflow-hidden bg-[#111]">

          {/* Scene 1 Canvas */}
          <CanvasSequence
            scenePath="/images/scene-1/ezgif-frame-"
            frameCount={210}
            progress={scene1Progress}
            opacity={scene1Opacity}
          />

          {/* Scene 1 Text Overlay */}
          <motion.div
            style={{ opacity: scene1TextOpacity }}
            className="absolute inset-0 pointer-events-none z-10 text-white"
          >
            <div className="absolute top-50 -translate-y-1/2 left-10 md:left-05">
              <h1 className="text-7xl md:text-[7rem] font-medium tracking-tight leading-[0.9]">
                We are<br />movement
              </h1>
            </div>

            <div className="absolute bottom-5 -translate-y-1/2 right-10 md:right-05 text-right">
              <h1 className="text-4xl md:text-[7rem] font-medium tracking-tight leading-[0.9]">
                We are<br />distinction
              </h1>
            </div>

            <div className="absolute bottom-10 left-12 md:left-10 max-w-sm">
              <div className="w-8 h-[1px] bg-white mb-6"></div>
              <p className="text-[15px] md:text-[15px] font-medium italic leading-loose opacity-90 pr-12">
                Every flight is designed around your comfort, time, and ambitions — so you can focus on what truly matters, while we take care of everything else.
              </p>
            </div>

            <div className="hidden md:flex absolute bottom-10 right-10 items-center text-xs font-bold tracking-widest uppercase gap-8">
              <div className="flex items-center gap-3">
                <div className="animate-bounce">↓</div>
                <span className="text-sm">SCROLL DOWN</span>
              </div>
              <div className="w-16 h-[4px] bg-white/50"></div>
              <span className="text-sm">TO START THE JOURNEY</span>
            </div>
          </motion.div>

          {/* Scene 2 Canvas */}
          <CanvasSequence
            scenePath="/images/scene-2/ezgif-frame-"
            frameCount={240}
            progress={scene2Progress}
            opacity={scene2Opacity}
          />

          {/* Scene 2 Text Overlay */}
          <motion.div
            style={{ opacity: scene2TextOpacity }}
            className="absolute inset-0 pointer-events-none z-20 text-[#1a1a1a]"
          >
            {/* Top Left (Below Nav) */}
            <div className="absolute top-24 left-12 md:left-24 max-w-sm text-white font-bold">
              <h3 className="text-4xl md:text-4xl font-medium italic tracking-wide leading-tight">
                Luxury that moves<br />with you
              </h3>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-14 left-12 md:left-24 text-white font-bold">
              <h1 className="text-6xl md:text-[7rem] font-medium tracking-wide italic uppercase tracking-tight leading-none">
                Fly in <br />luxury
              </h1>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-24 right-12 md:right-24 font-bold max-w-md">
              <div className="flex justify-between items-end border-b border-[#1a1a1a]/20 pb-4 mb-6 font-bold text-[15px] tracking-widest uppercase">
                <span className='text-white'>GULFSTREAM</span>
                <span className='text-white'>650ER</span>
              </div>
              <p className="text-[13px] font-medium leading-loose pr-4 text-white">
                Featuring wings designed to minimize anything that could disrupt its natural aerodynamic balance, and powered by high-thrust Rolls-Royce BR725 A1-12 engines, the Gulfstream G650 is engineered for exceptional range and top-end speed.
              </p>
            </div>
          </motion.div>

          {/* Transition Sequence Canvas */}
          <CanvasSequence
            scenePath="/images/scene-2-to-3/ezgif-frame-"
            frameCount={240}
            progress={transitionProgress}
            opacity={transitionOpacity}
          />

          {/* Scene 3 Canvas */}
          <CanvasSequence
            scenePath="/images/scene-3/ezgif-frame-"
            frameCount={250}
            progress={scene3Progress}
            opacity={scene3Opacity}
          />

          {/* Scene 3 Text Overlay */}
          <motion.div
            style={{ opacity: scene3TextOpacity }}
            className="absolute inset-0 pointer-events-none z-30"
          >
            {/* Left Side: Title and Specs */}
            <div className="absolute top-90 -translate-y-1/2 left-10 md:left-10 flex flex-col justify-center h-full max-h-screen py-24">
              {/* Title Section */}
              <div className="mb-12">
                <h2 className="text-xl md:text-2xl font-medium mb-1 text-[#1a1a1a]  ">Gulfstream</h2>
                <h1 className="text-7xl md:text-[6rem] font-medium tracking-tighter leading-none text-[#1a1a1a]">650ER</h1>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-x-12 gap-y-10 w-full max-w-lg text-[#1a1a1a]">
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-2 text-black">MAXIMUM OPERATING RANGE</div>
                  <div className="font-extrabold text-xs text-black">11,263 KM</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-2 text-black">SPEED</div>
                  <div className="font-extrabold text-xs text-black">480 KNOTS</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-2 text-black">PASSENGER CAPACITY</div>
                  <div className="font-extrabold text-xs text-black">UP TO 12 SEATS (+1 CABIN SERVER)</div>
                </div>

                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-2 text-black">BAGGAGE CAPACITY</div>
                  <div className="font-extrabold text-xs text-black">5.52 M³</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-2 text-black">Endurance</div>
                  <div className="font-extrabold text-xs text-black">14 hrs (Maximum for european based aircraft)</div>
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest uppercase opacity-60 mb-2 text-black">CRUISING ALTITUDE</div>
                  <div className="font-extrabold text-xs text-black">15,544 M</div>
                </div>
              </div>

              {/* Specs List */}
              <div className="mt-12 pt-8 border-t border-[#1a1a1a]/20 w-full left-12 md:left-10 max-w-sm text-[#1a1a1a]">
                <div className="text-[9px] font-bold tracking-widest uppercase opacity-80 mb-6">SPECIFICATION</div>
                <div className="flex justify-between font-extrabold text-xs mb-4 "><span>CABIN LENGTH</span><span>14.05 M</span></div>
                <div className="flex justify-between font-extrabold text-xs mb-4 "><span>CABIN WIDTH</span><span>2.49 M</span></div>
                <div className="flex justify-between font-extrabold text-xs "><span>CABIN HEIGHT</span><span>1.92 M</span></div>
              </div>
            </div>

            {/* Top Right Title */}
            <div className="absolute bottom-60 right-12 md:right-10 text-right">
              <h2 className="text-4xl md:text-5xl font-medium italic max-w-sm ml-auto leading-[1.1] text-black">
                Ultra-Long-Range<br />Aircraft
              </h2>
            </div>

            {/* Bottom Right Text */}
            <div className="hidden md:block absolute bottom-15 right-12 md:right-10 max-w-sm text-right text-[#1a1a1a]">
              <h3 className="font-bold text-[15px] tracking-widest uppercase mb-4 leading-relaxed">DIRECT ACCESS TO<br />PRIVATE TRAVEL</h3>
              <p className="text-[13px] font-medium leading-loose opacity-90">
                A true time-saving machine it brings Tokyo and New York an hour closer, and at 92% of the speed of sound, it can circle the globe with just a single stop.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Footer: Global Reach Video Loop */}
      <div className="relative w-full h-screen bg-[#111] z-40 overflow-hidden flex flex-col justify-center">
        <video
          autoPlay
          loop
          muted
          playsInline
          ref={(el) => { if (el) el.muted = true; }}
          className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-60"
        >
          <source src="/videos/globe-loop.mp4" type="video/mp4" />
        </video>

        <div className="relative z-20 flex flex-col md:flex-row justify-between items-center px-12 md:px-24 w-full text-white pointer-events-none">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tighter max-w-lg leading-[1.1] mb-8 md:mb-0">
            Fly anywhere with total comfort and control
          </h2>
        </div>

        <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end text-[9px] font-bold tracking-widest uppercase text-white/50">
          <div className="flex flex-col md:flex-row gap-4 md:gap-12 mb-4 md:mb-0">
            <span>@2026 JESKO JETS. ALL RIGHTS RESERVED</span>
            <span className="hover:text-white cursor-pointer transition-colors pointer-events-auto">PRIVACY POLICY</span>
          </div>
          <div className="flex gap-12">
            <div className="flex flex-col text-right">
              <span className="opacity-50 mb-1">MADE BY</span>
              <span>THE FIRST THE LAST</span>
            </div>
          </div>
        </div>

        <div className="hidden md:block absolute top-80 right-12 -translate-y-1/2 text-[12px] font-bold tracking-widest text-right leading-tight text-white">
          <span className="text-[30px] font-serif">FOR<br />INQUIRIES</span><br />
          <span className="text-[25px] mt-10 italic hover:text-white cursor-pointer transition-colors pointer-events-auto">info@jeskojet.com<br /></span>
          <span className="text-[20px] mt-10 italic hover:text-white cursor-pointer transition-colors pointer-events-auto">+971 54 432 5050</span>
        </div>
      </div>
    </main>
  );
}
