"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import WireframeGlobe from "@/components/wireframe-globe";
import { Terminal } from "lucide-react";
import Image from "next/image";

import MotosysDemo from "@/components/motosys-demo";
import ConectaDemo from "@/components/conecta-demo";
import JuriQuestDemo from "@/components/juriquest-demo";
import DataGuardDemo from "@/components/dataguard-demo";
import { MatrixRain } from "@/components/matrix-rain";
import { GithubRepos } from "@/components/github-repos";
import { SystemStatus } from "@/components/system-status";
import { t, Language, getProjectsDetails } from "@/lib/i18n";

const playClickSound = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(1200, audioCtx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.1);
  } catch {
    // Ignore audio context errors
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [lang, setLang] = useState<Language>('pt');
  const dict = t[lang];

  // Boot Sequence Logic
  const [booting, setBooting] = useState(true);
  const [bootText, setBootText] = useState("");

  useEffect(() => {
    const sequence = [
      dict.hero.boot1,
      dict.hero.boot2,
      dict.hero.boot3,
      dict.hero.boot4,
      dict.hero.boot5
    ];
    let i = 0;
    const interval = setInterval(() => {
      setBootText(prev => prev + (prev ? '\n' : '') + sequence[i]);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => setBooting(false), 900);
      }
    }, 250);
    return () => clearInterval(interval);
  }, [lang, dict]);

  // Mouse interactivity logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth) * 2 - 1;
    const y = (clientY / innerHeight) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  const node1X = useTransform(smoothX, [-1, 1], [-20, 20]);
  const node1Y = useTransform(smoothY, [-1, 1], [-20, 20]);
  const node2X = useTransform(smoothX, [-1, 1], [25, -25]);
  const node2Y = useTransform(smoothY, [-1, 1], [25, -25]);
  const node3X = useTransform(smoothX, [-1, 1], [-15, 15]);
  const node3Y = useTransform(smoothY, [-1, 1], [15, -15]);

  const [activeDemo, setActiveDemo] = useState<string | null>(null);
  
  // Terminal Logic
  type TerminalLine = { id: number; command: string; output: React.ReactNode };
  const getInitialTerminalHistory = React.useCallback((): TerminalLine[] => [
    { id: 1, command: 'whoami', output: <div className="mt-1 text-white">Pedro Henrique</div> },
    { id: 2, command: 'stack', output: <div className="mt-1 flex flex-col gap-1 text-white"><span>&gt; Software Engineering</span><span>&gt; Data Engineering</span><span>&gt; DevOps</span><span>&gt; Artificial Intelligence</span></div> },
    { id: 3, command: 'contact', output: (
        <div className="mt-1 flex flex-col gap-1">
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#3b82f6] hover:underline w-fit">&gt; LinkedIn</a>
          <a href="https://github.com/iphrick" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#3b82f6] hover:underline w-fit">&gt; GitHub</a>
          <a href="mailto:email@exemplo.com" className="text-white hover:text-[#3b82f6] hover:underline w-fit">&gt; Email</a>
        </div>
      )
    }
  ], []);

  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTerminalHistory(getInitialTerminalHistory());
  }, [lang, getInitialTerminalHistory]);

  useEffect(() => {
    if (terminalHistory.length > getInitialTerminalHistory().length) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory, getInitialTerminalHistory]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    
    playClickSound();

    const cmd = terminalInput.trim().toLowerCase();
    let output: React.ReactNode = null;

    if (cmd === 'clear') {
      setTerminalHistory([]);
      setTerminalInput("");
      return;
    } else if (cmd === 'sudo matrix') {
      setIsMatrixMode(true);
      setTerminalInput("");
      return;
    } else if (cmd === 'exit' && isMatrixMode) {
      setIsMatrixMode(false);
      setTerminalInput("");
      return;
    } else if (cmd === 'help') {
      output = <div className="mt-1 text-white">{dict.contact.availCmd}: whoami, stack, contact, clear, sudo matrix, exit, sudo hire pedro</div>;
    } else if (cmd === 'sudo hire pedro') {
      output = <div className="mt-1 text-[#10b981] font-bold">{dict.contact.sudo}</div>;
    } else if (cmd === 'whoami') {
      output = <div className="mt-1 text-white">{dict.hero.visitor}</div>;
    } else if (cmd === 'stack' || cmd === 'contact') {
      output = getInitialTerminalHistory(dict).find(h => h.command === cmd)?.output;
    } else {
      output = <div className="mt-1 text-red-400">{dict.contact.cmdNot}: {cmd}. {dict.contact.typeHelp}</div>;
    }

    setTerminalHistory(prev => [...prev, { id: Date.now(), command: terminalInput, output }]);
    setTerminalInput("");
  };

  const projectDetailsRaw = getProjectsDetails(lang);
  const projectDetails: Record<string, { title: string; desc: string; tags: string[]; component: React.ElementType; isPrivate?: boolean; repoLink?: string }> = {
    motosys: { ...projectDetailsRaw.motosys, component: MotosysDemo },
    conecta: { ...projectDetailsRaw.conecta, component: ConectaDemo },
    juriquest: { ...projectDetailsRaw.juriquest, component: JuriQuestDemo },
    dataguard: { ...projectDetailsRaw.dataguard, component: DataGuardDemo }
  };

  // Renderização da view de Projeto (Mini Readme + Demo)
  if (activeDemo && projectDetails[activeDemo]) {
    const Project = projectDetails[activeDemo];
    const DemoComponent = Project.component;
    
    return (
      <div className="min-h-screen bg-[#070707] text-[#f0f0f0] font-sans selection:bg-white/10 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-12">
          {/* Header do Readme */}
          <div className="space-y-6">
            <button 
              onClick={() => { playClickSound(); setActiveDemo(null); }} 
              className="text-[#a3a3a3] hover:text-white font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-colors"
            >
              {dict.projects.back}
            </button>
            
            <div className="border-b border-white/10 pb-12 space-y-6">
              <div className="flex items-center gap-3 font-mono text-[10px] text-[#10b981] tracking-widest uppercase mb-4">
                <span className="w-1.5 h-1.5 bg-[#10b981] rounded-none animate-pulse" />
                System.Readme // {activeDemo}
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">{Project.title}</h1>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {Project.isPrivate ? (
                  <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 bg-white/5 rounded-sm text-xs font-mono tracking-widest text-[#a3a3a3] uppercase w-fit">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    {dict.projects.btnPrivate}
                  </div>
                ) : (
                  <a href={Project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-[#10b981]/30 bg-[#10b981]/10 hover:bg-[#10b981]/20 rounded-sm text-xs font-mono tracking-widest text-[#10b981] transition-colors uppercase w-fit" onClick={playClickSound}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                    {dict.projects.btnRepo}
                  </a>
                )}
              </div>

              <p className="text-[#a3a3a3] font-mono text-sm leading-relaxed max-w-4xl pt-4">{Project.desc}</p>
              
              <div className="flex flex-wrap gap-3 pt-2">
                {Project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest uppercase rounded-sm text-[#a3a3a3]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Área Interativa Branca */}
          <div className="space-y-4">
            <h2 className="text-white font-heading font-bold text-xl">{dict.projects.simulation}</h2>
            <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-sm p-2 shadow-2xl">
              <div className="bg-white rounded-sm overflow-hidden">
                <DemoComponent onBackToPortfolio={() => setActiveDemo(null)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (booting) {
    return (
      <div className="min-h-screen bg-[#070707] text-[#10b981] font-mono flex items-center justify-center p-6 selection:bg-white/10">
         <div className="whitespace-pre-wrap text-xs md:text-sm max-w-2xl w-full leading-loose">
           {bootText}<span className="animate-pulse">_</span>
         </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] bg-dot-pattern text-[#f0f0f0] font-sans overflow-x-hidden selection:bg-white/10" onMouseMove={handleMouseMove}>
      
      <SystemStatus />

      {/* ------------------------------------------- */}
      {/* NAVBAR FIXA                                   */}
      {/* ------------------------------------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-6 px-4 pointer-events-none">
        <nav className="flex items-center gap-4 md:gap-8 px-6 py-3 bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 rounded-sm pointer-events-auto shadow-2xl relative">
          <a href="#hero" onClick={playClickSound} className="text-[10px] md:text-xs font-mono text-[#a3a3a3] hover:text-white transition-colors uppercase tracking-widest cursor-pointer">{dict.nav.home}</a>
          <a href="#sobre" onClick={playClickSound} className="text-[10px] md:text-xs font-mono text-white transition-colors uppercase tracking-widest cursor-pointer flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#10b981] rounded-none animate-pulse"></span> {dict.nav.about}
          </a>
          <a href="#stack" onClick={playClickSound} className="text-[10px] md:text-xs font-mono text-[#a3a3a3] hover:text-white transition-colors uppercase tracking-widest cursor-pointer">{dict.nav.stack}</a>
          <a href="#projetos" onClick={playClickSound} className="text-[10px] md:text-xs font-mono text-[#a3a3a3] hover:text-white transition-colors uppercase tracking-widest cursor-pointer">{dict.nav.projects}</a>
          <a href="#cv" onClick={playClickSound} className="text-[10px] md:text-xs font-mono text-[#10b981] hover:text-[#10b981] transition-colors uppercase tracking-widest cursor-pointer flex items-center gap-1.5">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            {dict.nav.cv}
          </a>
          <a href="#contato" onClick={playClickSound} className="text-[10px] md:text-xs font-mono text-[#a3a3a3] hover:text-white transition-colors uppercase tracking-widest cursor-pointer">{dict.nav.contact}</a>
          
          <div className="w-px h-4 bg-white/20 mx-2"></div>
          
          <button onClick={() => { playClickSound(); setLang(lang === 'pt' ? 'en' : 'pt'); }} className="text-[10px] font-mono font-bold text-[#10b981] hover:text-white transition-colors uppercase tracking-widest cursor-pointer">
            {lang === 'pt' ? 'PT' : 'EN'}
          </button>
        </nav>
      </header>

      {/* ------------------------------------------- */}
      {/* SECTION 00: HERO (100vh)                      */}
      {/* ------------------------------------------- */}
      <section id="hero" className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Globe & Network */}
        <div className="absolute inset-0 z-0 opacity-40">
           <WireframeGlobe />
        </div>

        {/* Floating Architecture Nodes (Interactive) */}
        <div className="absolute inset-0 pointer-events-none z-10 hidden md:block">
          <svg className="absolute w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="80%" y1="40%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="30%" y1="70%" x2="50%" y2="50%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>
          <motion.div style={{ x: node1X, y: node1Y }} className="absolute top-[28%] left-[18%] px-3 py-1 border border-white/10 bg-[#0a0a0a] text-[10px] font-mono tracking-widest text-[#a3a3a3]">
            [ SOFTWARE ]
          </motion.div>
          <motion.div style={{ x: node2X, y: node2Y }} className="absolute top-[38%] right-[18%] px-3 py-1 border border-[#10b981]/30 bg-[#10b981]/10 text-[10px] font-mono tracking-widest text-[#10b981]">
            [ DATA ]
          </motion.div>
          <motion.div style={{ x: node3X, y: node3Y }} className="absolute bottom-[28%] left-[28%] px-3 py-1 border border-white/10 bg-[#0a0a0a] text-[10px] font-mono tracking-widest text-[#a3a3a3]">
            [ INFRASTRUCTURE ]
          </motion.div>
        </div>

        {/* Hero Content */}
        <motion.div style={{ y: yHeroText, opacity: opacityHeroText }} className="relative z-10 w-full max-w-5xl px-6 flex flex-col items-center text-center space-y-6 md:space-y-8 mt-12">
          
          {/* Profile Photo & Name */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-sm overflow-hidden border border-white/20 shadow-2xl bg-[#070707] z-10">
              <Image src="/profile.jpg" alt="Pedro Henrique" width={160} height={160} className="w-full h-full object-cover" priority />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded bg-[#0a0a0a] border border-white/10 text-[#f0f0f0] text-xs md:text-sm tracking-wider font-mono uppercase shadow-sm">
              <span className="w-2.5 h-2.5 rounded-none bg-[#10b981] shadow-[0_0_8px_#10b981] animate-pulse"></span>
              <span className="font-bold">Pedro Henrique</span>
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1] font-heading z-10">
            {dict.hero.title1}<br />
            <span className="text-[#888]">{dict.hero.title2}</span><br />
            <span className="text-[#444]">{dict.hero.title3}</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="max-w-2xl text-[#a3a3a3] text-sm md:text-base font-mono leading-relaxed z-10">
            {dict.hero.desc}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="flex flex-col sm:flex-row items-center gap-4 pt-4 md:pt-8 z-10">
            <button onClick={() => { playClickSound(); document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}} className="px-6 py-3 bg-white text-black font-heading font-semibold text-sm tracking-wide hover:bg-[#e0e0e0] transition-colors rounded-sm cursor-pointer">
              {dict.hero.btnExplore}
            </button>
            <button onClick={() => { playClickSound(); document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth' })}} className="px-6 py-3 border border-white/20 bg-transparent text-white font-heading font-semibold text-sm tracking-wide hover:border-white/50 hover:bg-white/5 transition-all rounded-sm cursor-pointer">
              {dict.hero.btnProjects}
            </button>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-[#a3a3a3]">{dict.hero.scroll}</span>
        </motion.div>
      </section>

      {/* ------------------------------------------- */}
      {/* SECTION 01: SOBRE                             */}
      {/* ------------------------------------------- */}
      <section id="sobre" className="relative w-full min-h-screen flex items-center justify-center px-6 py-24 border-t border-white/5 bg-[#070707] z-10">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.8 }} className="space-y-8">
            <div className="flex items-center gap-3 font-mono text-[10px] text-[#666] tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 bg-[#10b981] rounded-none" />
              {dict.about.tag}
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight tracking-tight">
              {dict.about.title1}<br /><span className="text-[#666]">{dict.about.title2}</span><br />{dict.about.title3}
            </h2>
            <div className="space-y-6 text-[#a3a3a3] font-sans text-base leading-relaxed border-l border-white/10 pl-6">
              <p>{dict.about.p1}</p>
              <p>{dict.about.p2}</p>
              <p className="text-white font-medium">{dict.about.p3}</p>
              <div className="pt-2 mt-2 space-y-4">
                <p className="text-xs font-mono text-[#888]">
                  {'>'} {dict.about.githubPrefix}<a href="https://github.com/iphrick" target="_blank" rel="noopener noreferrer" className="text-[#10b981] hover:underline transition-colors" onClick={playClickSound}>{dict.about.githubSuffix}</a>.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative w-full aspect-square border border-white/10 rounded-sm bg-[#0a0a0a]/50 flex items-center justify-center overflow-hidden">
             <svg className="w-[80%] h-[80%]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
               <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, ease: "easeInOut" }} d="M10 90 L10 10 L50 50 L90 10 L90 90" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
               <motion.rect initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }} x="20" y="20" width="60" height="60" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="2 2" vectorEffect="non-scaling-stroke" />
               <motion.circle initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 1.5 }} cx="50" cy="50" r="2" fill="white" />
             </svg>
             <div className="absolute bottom-4 left-4 font-mono text-[9px] text-[#666] tracking-widest uppercase">Blueprint.01 // System Architecture</div>
          </motion.div>
        </div>
        
        {/* Github Repositories Integration */}
        <div className="w-full max-w-4xl mt-12">
          <GithubRepos />
        </div>
      </section>

      {/* ------------------------------------------- */}
      {/* SECTION 01.5: STACK ARCHITECTURE            */}
      {/* ------------------------------------------- */}
      <section id="stack" className="relative w-full py-24 border-t border-white/5 bg-[#0a0a0a] z-10 flex flex-col items-center">
        <div className="w-full max-w-5xl px-6 space-y-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 font-mono text-[10px] text-[#3b82f6] tracking-widest uppercase mb-4">
              <span className="w-1.5 h-1.5 bg-[#3b82f6] rounded-none" />
              {dict.stack.tag}
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">{dict.stack.title}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono text-xs">
            {/* Frontend / App Layer */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="border border-white/10 bg-[#050505] rounded-sm p-8 space-y-6 flex flex-col">
              <div className="text-[#a3a3a3] uppercase tracking-widest border-b border-white/10 pb-4">{dict.stack.appTitle}</div>
              <ul className="space-y-4 flex-1">
                <li className="flex items-start gap-3">
                  <span className="text-white">&gt;</span>
                  <div>
                    <span className="text-white font-bold">{dict.stack.appFront}</span>
                    <p className="text-[#666] mt-1 leading-relaxed">{dict.stack.appFrontDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">&gt;</span>
                  <div>
                    <span className="text-white font-bold">{dict.stack.appUi}</span>
                    <p className="text-[#666] mt-1 leading-relaxed">{dict.stack.appUiDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">&gt;</span>
                  <div>
                    <span className="text-white font-bold">{dict.stack.appMobile}</span>
                    <p className="text-[#666] mt-1 leading-relaxed">{dict.stack.appMobileDesc}</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Backend / Data Layer */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="border border-[#10b981]/30 bg-[#10b981]/5 rounded-sm p-8 space-y-6 flex flex-col shadow-[0_0_30px_rgba(16,185,129,0.03)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-[#10b981]"></div>
              <div className="text-[#10b981] uppercase tracking-widest border-b border-[#10b981]/20 pb-4">{dict.stack.dataTitle}</div>
              <ul className="space-y-4 flex-1">
                <li className="flex items-start gap-3">
                  <span className="text-[#10b981]">&gt;</span>
                  <div>
                    <span className="text-white font-bold">{dict.stack.dataBackend}</span>
                    <p className="text-[#888] mt-1 leading-relaxed">{dict.stack.dataBackendDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10b981]">&gt;</span>
                  <div>
                    <span className="text-white font-bold">{dict.stack.dataEtl}</span>
                    <p className="text-[#888] mt-1 leading-relaxed">{dict.stack.dataEtlDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#10b981]">&gt;</span>
                  <div>
                    <span className="text-white font-bold">{dict.stack.dataDb}</span>
                    <p className="text-[#888] mt-1 leading-relaxed">{dict.stack.dataDbDesc}</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Infra / Ops Layer */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="border border-white/10 bg-[#050505] rounded-sm p-8 space-y-6 flex flex-col">
              <div className="text-[#a3a3a3] uppercase tracking-widest border-b border-white/10 pb-4">{dict.stack.infraTitle}</div>
              <ul className="space-y-4 flex-1">
                <li className="flex items-start gap-3">
                  <span className="text-white">&gt;</span>
                  <div>
                    <span className="text-white font-bold">{dict.stack.infraCloud}</span>
                    <p className="text-[#666] mt-1 leading-relaxed">{dict.stack.infraCloudDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">&gt;</span>
                  <div>
                    <span className="text-white font-bold">{dict.stack.infraDevops}</span>
                    <p className="text-[#666] mt-1 leading-relaxed">{dict.stack.infraDevopsDesc}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-white">&gt;</span>
                  <div>
                    <span className="text-white font-bold">{dict.stack.infraNet}</span>
                    <p className="text-[#666] mt-1 leading-relaxed">{dict.stack.infraNetDesc}</p>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- */}
      {/* SECTION 02: PROJETOS STORYTELLING             */}
      {/* ------------------------------------------- */}
      <section id="projetos" className="relative w-full py-24 border-t border-white/5 bg-[#070707] z-10 flex flex-col items-center">
        <div className="w-full max-w-5xl px-6 space-y-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">{dict.projects.title}</h2>
            <p className="text-[#a3a3a3] font-mono text-xs tracking-widest uppercase">{dict.projects.tag}</p>
          </motion.div>

          <div className="space-y-32">
            
            {/* Project 1 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.8 }} className="space-y-6">
              <div className="font-mono text-[10px] text-[#666] tracking-widest uppercase border-l border-[#ff4d1d] pl-4">op. 01 // Motosys (Offline-First SaaS)</div>
              <div className="w-full p-8 md:p-12 border border-white/10 bg-[#0a0a0a] rounded-sm flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl font-bold font-heading text-white">Motosys</h3>
                  <p className="text-[#a3a3a3] text-sm font-mono leading-relaxed">{projectDetails.motosys.desc}</p>
                  <button onClick={() => { playClickSound(); setActiveDemo('motosys'); }} className="px-5 py-2.5 bg-white text-black font-heading font-semibold text-xs tracking-wide hover:bg-[#e0e0e0] transition-colors rounded-sm flex items-center justify-between group-hover:px-6">
                      {dict.projects.btnSimulate}
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <div className="w-full md:w-1/3 aspect-square border border-white/5 bg-[#111] rounded-sm flex items-center justify-center text-[#ff4d1d] opacity-50 relative overflow-hidden">
                  <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                </div>
              </div>
            </motion.div>

            {/* Project 2 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.8 }} className="space-y-6">
              <div className="font-mono text-[10px] text-[#666] tracking-widest uppercase border-l border-[#7c3aed] pl-4">op. 02 // Conecta Ensino (EAD Platform)</div>
              <div className="w-full p-8 md:p-12 border border-white/10 bg-[#0a0a0a] rounded-sm flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl font-bold font-heading text-white">Conecta Ensino</h3>
                  <p className="text-[#a3a3a3] text-sm font-mono leading-relaxed">{projectDetails.conecta.desc}</p>
                  <button onClick={() => { playClickSound(); setActiveDemo('conecta'); }} className="mt-4 px-6 py-2 border border-white/20 bg-white/5 text-white font-heading text-xs tracking-wide hover:bg-white hover:text-black transition-colors rounded-sm cursor-pointer inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full animate-pulse" /> {dict.projects.btnSimulate}
                  </button>
                </div>
                <div className="w-full md:w-1/3 aspect-square border border-white/5 bg-[#111] rounded-sm flex items-center justify-center text-[#7c3aed] opacity-50 relative overflow-hidden">
                  <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
              </div>
            </motion.div>

            {/* Project 3 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.8 }} className="space-y-6">
              <div className="font-mono text-[10px] text-[#666] tracking-widest uppercase border-l border-[#db2777] pl-4">op. 03 // JuriQuest (Study Gamification)</div>
              <div className="w-full p-8 md:p-12 border border-white/10 bg-[#0a0a0a] rounded-sm flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl font-bold font-heading text-white">JuriQuest</h3>
                  <p className="text-[#a3a3a3] text-sm font-mono leading-relaxed">{projectDetails.juriquest.desc}</p>
                  <button onClick={() => { playClickSound(); setActiveDemo('juriquest'); }} className="mt-4 px-6 py-2 border border-white/20 bg-white/5 text-white font-heading text-xs tracking-wide hover:bg-white hover:text-black transition-colors rounded-sm cursor-pointer inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#db2777] rounded-full animate-pulse" /> {dict.projects.btnSimulate}
                  </button>
                </div>
                <div className="w-full md:w-1/3 aspect-square border border-white/5 bg-[#111] rounded-sm flex items-center justify-center text-[#db2777] opacity-50 relative overflow-hidden">
                  <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                </div>
              </div>
            </motion.div>

            {/* Project 4 */}
            <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.8 }} className="space-y-6">
              <div className="font-mono text-[10px] text-[#666] tracking-widest uppercase border-l border-[#2563eb] pl-4">op. 04 // DataGuard (Data Pipeline)</div>
              <div className="w-full p-8 md:p-12 border border-white/10 bg-[#0a0a0a] rounded-sm flex flex-col md:flex-row items-center gap-8 shadow-2xl">
                <div className="flex-1 space-y-4">
                  <h3 className="text-3xl font-bold font-heading text-white">DataGuard ETL</h3>
                  <p className="text-[#a3a3a3] text-sm font-mono leading-relaxed">{projectDetails.dataguard.desc}</p>
                  <button onClick={() => { playClickSound(); setActiveDemo('dataguard'); }} className="mt-4 px-6 py-2 border border-white/20 bg-white/5 text-white font-heading text-xs tracking-wide hover:bg-white hover:text-black transition-colors rounded-sm cursor-pointer inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#2563eb] rounded-full animate-pulse" /> {dict.projects.btnSimulate}
                  </button>
                </div>
                <div className="w-full md:w-1/3 aspect-square border border-white/5 bg-[#111] rounded-sm flex items-center justify-center text-[#2563eb] opacity-50 relative overflow-hidden">
                  <svg className="w-1/2 h-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- */}
      {/* SECTION 03: CV DOWNLOAD                       */}
      {/* ------------------------------------------- */}
      <section id="cv" className="relative w-full py-32 border-t border-white/5 bg-[#050505] z-10 flex flex-col items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full max-w-2xl px-6 text-center space-y-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full border border-[#10b981]/30 bg-[#10b981]/5 flex items-center justify-center text-[#10b981] shadow-[0_0_30px_rgba(16,185,129,0.05)]">
               <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            </div>
            <div className="font-mono text-[10px] text-[#10b981] tracking-widest uppercase">
              {dict.cv.tag}
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight">{dict.cv.title}</h2>
          <p className="text-[#a3a3a3] text-sm md:text-base font-mono leading-relaxed max-w-lg mx-auto">
            {dict.cv.desc}
          </p>
          <div className="pt-4">
            <a href="/Curriculo Pedro Henrique.pdf" download onClick={playClickSound} className="inline-flex items-center gap-3 px-8 py-4 border border-[#10b981]/50 bg-[#10b981]/10 hover:bg-[#10b981] hover:text-black text-white rounded-sm text-sm font-mono tracking-widest transition-all uppercase shadow-lg group">
              <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              {dict.cv.btn}
            </a>
          </div>
        </motion.div>
      </section>

      {/* ------------------------------------------- */}
      {/* SECTION 04: TERMINAL CONTATO                  */}
      {/* ------------------------------------------- */}
      <section id="contato" className="relative w-full h-screen flex items-center justify-center px-6 border-t border-white/5 bg-[#070707] z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.8 }} className={`w-full max-w-3xl rounded-sm border shadow-2xl overflow-hidden transition-colors duration-1000 relative ${isMatrixMode ? "border-[#0F0] bg-black" : "border-white/10 bg-[#0a0a0a]"}`}>
          
          {isMatrixMode && <MatrixRain />}

          <div className="h-10 flex items-center px-4 border-b border-white/10 bg-[#050505] relative z-10">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
            </div>
            <div className="mx-auto font-mono text-[10px] text-[#666] tracking-widest uppercase flex items-center gap-2">
              <Terminal size={12} /> root@pedro-henrique:~
            </div>
          </div>
          <div className="p-6 md:p-8 font-mono text-xs md:text-sm text-[#a3a3a3] leading-loose h-[400px] flex flex-col overflow-y-auto scrollbar-hide relative z-10">
            <div className="space-y-6 flex-1">
              
              {terminalHistory.map((line) => (
                <div key={line.id}>
                  <span className="text-[#27c93f]">pedro@root</span><span className="text-white">:</span><span className="text-[#3b82f6]">~</span>$ {line.command}
                  {line.output}
                </div>
              ))}

              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2">
                <span className="text-[#27c93f]">pedro@root</span><span className="text-white">:</span><span className="text-[#3b82f6]">~</span>$
                <input 
                  type="text" 
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="bg-transparent text-white outline-none flex-1 border-none ml-1 placeholder:text-[#333]"
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
              <div ref={terminalEndRef} />
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
