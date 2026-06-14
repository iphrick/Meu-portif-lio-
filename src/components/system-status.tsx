"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function SystemStatus() {
  const [ping, setPing] = useState(12);
  const [cpu, setCpu] = useState(14);
  const [memory, setMemory] = useState(24);

  useEffect(() => {
    // Simulate real-time metrics fluctuation
    const interval = setInterval(() => {
      setPing(prev => prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3));
      setCpu(prev => Math.max(5, Math.min(95, prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 5))));
      setMemory(prev => Math.max(12, Math.min(80, prev + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3))));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="fixed bottom-6 right-6 z-50 pointer-events-none hidden md:block"
    >
      <div className="bg-[#050505]/80 backdrop-blur-md border border-white/10 rounded-sm p-3 shadow-2xl flex flex-col gap-2 font-mono text-[9px] text-[#666] tracking-widest uppercase w-36">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#10b981] animate-pulse"></span> SYS</span>
          <span className="text-[#10b981]">ONLINE</span>
        </div>
        <div className="w-full h-px bg-white/5"></div>
        <div className="flex items-center justify-between">
          <span>PING</span>
          <span className="text-white">{Math.max(1, ping)}ms</span>
        </div>
        <div className="flex items-center justify-between">
          <span>CPU</span>
          <span className="text-white">{cpu}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span>MEM</span>
          <span className="text-white">{memory}MB</span>
        </div>
      </div>
    </motion.div>
  );
}
