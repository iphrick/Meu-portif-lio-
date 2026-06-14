"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Key, 
  Wifi, 
  Wrench, 
  FileText, 
  Package, 
  History, 
  Users, 
  DollarSign, 
  LogOut, 
  Plus, 
  AlertTriangle, 
  CheckCircle,
  LayoutGrid,
  ChevronRight
} from "lucide-react";

interface MotosysDemoProps {
  onBackToPortfolio?: () => void;
}

export default function MotosysDemo({ onBackToPortfolio }: MotosysDemoProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState("Inicio");
  
  // Custom interactive state to simulate critical stock alert
  const [stockAlertSimulated, setStockAlertSimulated] = useState(false);

  // SVG Chart hover states
  const [hoveredDataPoint, setHoveredDataPoint] = useState<{ x: number; y: number; index: number } | null>(null);

  // Chart data: 12 points representing dates from March 17 to June 12
  const chartPoints = [
    { label: "17 de mar.", val: 0, x: 20, y: 170 },
    { label: "28 de mar.", val: 0, x: 70, y: 170 },
    { label: "7 de abr.", val: 0, x: 120, y: 170 },
    { label: "17 de abr.", val: 0, x: 170, y: 170 },
    { label: "28 de abr.", val: 0, x: 220, y: 170 },
    { label: "8 de mai.", val: 0, x: 270, y: 170 },
    { label: "18 de mai.", val: 0, x: 320, y: 170 },
    { label: "29 de mai.", val: 0, x: 370, y: 170 },
    { label: "1 de jun.", val: 0, x: 420, y: 170 },
    { label: "11 de jun.", val: 0, x: 470, y: 170 },
    { label: "12 de jun. (14:30)", val: 1, x: 490, y: 40 },
    { label: "12 de jun. (16:00)", val: 0, x: 510, y: 170 },
  ];

  const handleLogin = () => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoggedIn(true);
    }, 1500); // 1.5s simulated loading state
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("Inicio");
  };

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden bg-white border border-[#ede7df] shadow-sm relative min-h-[600px] flex flex-col text-[#525252] font-mono lowercase">
      
      {/* Simulation Watermark Bar */}
      <div className="bg-[#fdfcfa] border-b border-[#ede7df] px-4 py-2.5 flex items-center justify-between z-10 text-[9px] tracking-wider font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d1d]" />
          <span>simulação interativa // motosys</span>
        </div>
        <div className="flex gap-2">
          {onBackToPortfolio && (
            <button 
              onClick={onBackToPortfolio}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#f5f0e9] border border-[#ede7df] text-[#737373] hover:text-[#0a0a0a] font-medium transition-colors cursor-pointer text-[9px] font-mono uppercase tracking-widest"
            >
              voltar
            </button>
          )}
          {isLoggedIn && (
            <button 
              onClick={handleLogout}
              className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium transition-colors flex items-center gap-1 cursor-pointer text-[9px] font-mono uppercase tracking-widest"
            >
              <LogOut size={10} /> sair
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:flex-row relative">
        {!isLoggedIn ? (
          // ================= LOGIN SCREEN =================
          <div className="w-full flex flex-col md:flex-row min-h-[550px]">
            {/* Left Info Panel */}
            <div className="w-full md:w-[45%] p-6 md:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#ede7df] bg-[#fdfcfa] backdrop-blur-sm relative overflow-hidden">
              
              {/* Header Logo */}
              <div className="flex items-center gap-2.5 z-10">
                <div className="w-7 h-7 rounded bg-[#ff4d1d] flex items-center justify-center">
                  <Wrench size={14} className="text-white" />
                </div>
                <span className="font-bold tracking-widest text-lg text-[#0a0a0a] font-mono uppercase">motosys</span>
              </div>

              {/* Central Copy */}
              <div className="my-6 space-y-5 z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#f5f0e9] border border-[#ede7df] text-[#ff4d1d] text-[9px] font-mono uppercase tracking-wider">
                  <Wrench size={10} /> gestão de oficinas
                </div>
                <h1 className="text-2xl md:text-3xl font-normal leading-tight text-[#0a0a0a] tracking-tight lowercase">
                  a oficina inteira, <br />
                  <span className="text-[#ff4d1d]">no painel.</span>
                </h1>
                <p className="text-[#525252] text-xs leading-relaxed max-w-sm lowercase">
                  ordens de serviço, estoque e faturamento da sua oficina de motos — organizados em um só lugar, mesmo sem internet.
                </p>

                {/* Simulated Widget Card */}
                <div className="p-4 rounded-2xl bg-white border border-[#ede7df] space-y-4 max-w-sm shadow-sm">
                  <div className="flex gap-4">
                    {/* Circle chart */}
                    <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="28" cy="28" r="24" className="stroke-[#f5f0e9] fill-none" strokeWidth="5" />
                        <circle 
                          cx="28" 
                          cy="28" 
                          r="24" 
                          className="stroke-[#ff4d1d] fill-none" 
                          strokeWidth="5" 
                          strokeDasharray={2 * Math.PI * 24}
                          strokeDashoffset={2 * Math.PI * 24 * (1 - 0.78)} 
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xs font-bold text-[#0a0a0a] leading-none">78%</span>
                        <span className="text-[8px] text-[#737373] leading-none">meta</span>
                      </div>
                    </div>
                    {/* Mini values */}
                    <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-1 text-[10px] font-mono">
                      <div>
                        <div className="text-[#525252]">12</div>
                        <div className="text-[8px] text-[#737373] font-medium uppercase">abertas</div>
                      </div>
                      <div>
                        <div className="text-[#525252]">5</div>
                        <div className="text-[8px] text-[#737373] font-medium uppercase">execução</div>
                      </div>
                      <div>
                        <div className="text-[#525252]">3</div>
                        <div className="text-[8px] text-[#737373] font-medium uppercase">ag. peça</div>
                      </div>
                      <div>
                        <div className="text-[#ff4d1d] font-semibold">r$4.8k</div>
                        <div className="text-[8px] text-[#737373] font-medium uppercase">mês</div>
                      </div>
                    </div>
                  </div>

                  {/* Active OS Row */}
                  <div className="p-2 rounded-xl bg-[#fdfcfa] border border-[#ede7df] flex items-center justify-between text-[10px] font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d1d]" />
                      <div>
                        <div className="font-semibold text-[#0a0a0a]">abc-1d23</div>
                        <div className="text-[9px] text-[#737373] leading-none">revisão geral</div>
                      </div>
                    </div>
                    <span className="text-[8px] text-[#737373]">5 min atrás</span>
                  </div>
                </div>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2 z-10 text-[10px] text-[#525252]">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white border border-[#ede7df] flex items-center justify-center">
                    <FileText size={10} className="text-[#ff4d1d]" />
                  </div>
                  <span>abertura de os em 30 segundos pelo celular</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-white border border-[#ede7df] flex items-center justify-center">
                    <Package size={10} className="text-[#ff4d1d]" />
                  </div>
                  <span>estoque com semáforo e alertas de falta</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Login Form */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center items-center bg-white">
              <div className="w-full max-w-sm space-y-6">
                {/* Form Titles */}
                <div className="text-center md:text-left space-y-1">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-[#ff4d1d] font-bold">acesso administrativo</span>
                  <h2 className="text-xl font-bold text-[#0a0a0a] tracking-tight">autenticação</h2>
                  <p className="text-[#737373] text-xs lowercase leading-relaxed">
                    entre com sua conta para acessar o simulador da oficina.
                  </p>
                </div>

                {/* Google login Button card */}
                <div className="p-5 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] space-y-5 shadow-sm">
                  <button 
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="w-full bg-[#ff4d1d] hover:bg-[#e03a0d] text-white font-mono font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-xs lowercase"
                  >
                    {isLoggingIn ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg viewBox="0 0 24 24" width="14" height="14" className="inline-block fill-current">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                    )}
                    <span>
                      {isLoggingIn ? "conectando..." : "continuar com google"}
                    </span>
                  </button>

                  <div className="relative flex items-center justify-center">
                    <hr className="w-full border-[#ede7df]" />
                    <span className="absolute bg-[#fdfcfa] px-2 text-[8px] font-mono tracking-widest text-[#737373] uppercase">
                      conexão segura
                    </span>
                  </div>

                  {/* Security Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-white border border-[#ede7df] text-center space-y-1 shadow-sm">
                      <Shield size={14} className="text-[#ff4d1d] mx-auto" />
                      <div className="text-[8px] font-mono text-[#737373] uppercase">crypt</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#ede7df] text-center space-y-1 shadow-sm">
                      <Key size={14} className="text-[#ff4d1d] mx-auto" />
                      <div className="text-[8px] font-mono text-[#737373] uppercase">firebase</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white border border-[#ede7df] text-center space-y-1 shadow-sm">
                      <Wifi size={14} className="text-[#ff4d1d] mx-auto" />
                      <div className="text-[8px] font-mono text-[#737373] uppercase">offline</div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[9px] text-[#737373] leading-normal">
                    ambiente virtual simulado para validação técnica de sincronização local em lote.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // ================= DASHBOARD SCREEN =================
          <div className="w-full flex flex-col md:flex-row min-h-[550px] bg-white">
            {/* Sidebar Navigation */}
            <aside className="hidden md:flex w-full md:w-56 border-r border-[#ede7df] bg-[#fdfcfa] flex-col justify-between p-4 z-10 shrink-0">
              <div className="space-y-5">
                {/* Logo */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#ff4d1d] flex items-center justify-center shrink-0">
                      <Wrench size={12} className="text-white" />
                    </div>
                    <div>
                      <div className="font-bold tracking-widest text-xs text-[#0a0a0a] font-mono uppercase leading-none">motosys</div>
                      <span className="text-[8px] text-[#737373] uppercase">gestão local</span>
                    </div>
                  </div>
                </div>

                {/* Nova OS Button */}
                <button 
                  onClick={() => alert("Simulação: Nova Ordem de Serviço criada com sucesso!")}
                  className="w-full bg-[#ff4d1d] hover:bg-[#e03a0d] text-white text-[10px] font-bold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer uppercase font-mono shadow-sm"
                >
                  <Plus size={12} /> nova os
                </button>

                {/* Navigation Links */}
                <nav className="space-y-1 text-[10px]">
                  <div>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[#737373] font-bold block px-2 mb-1.5">plataforma</span>
                    <ul className="space-y-1">
                      <li>
                        <button
                          onClick={() => setActiveTab("Inicio")}
                          className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                            activeTab === "Inicio" 
                              ? "bg-[#f5f0e9] text-[#0a0a0a] font-semibold border-l-2 border-[#ff4d1d]" 
                              : "text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa]"
                          }`}
                        >
                          <LayoutGrid size={12} /> início
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab("OS")}
                          className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                            activeTab === "OS" 
                              ? "bg-[#f5f0e9] text-[#0a0a0a] font-semibold border-l-2 border-[#ff4d1d]" 
                              : "text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa]"
                          }`}
                        >
                          <FileText size={12} /> ordens de serviço
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setActiveTab("Estoque")}
                          className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                            activeTab === "Estoque" 
                              ? "bg-[#f5f0e9] text-[#0a0a0a] font-semibold border-l-2 border-[#ff4d1d]" 
                              : "text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa]"
                          }`}
                        >
                          <Package size={12} /> estoque
                        </button>
                      </li>
                      <li>
                        <button className="w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa] cursor-pointer">
                          <History size={12} /> histórico
                        </button>
                      </li>
                      <li>
                        <button className="w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa] cursor-pointer">
                          <Users size={12} /> clientes
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-2">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-[#737373] font-bold block px-2 mb-1.5">gestão</span>
                    <ul className="space-y-1">
                      <li>
                        <button className="w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa] cursor-pointer">
                          <DollarSign size={12} /> financeiro
                        </button>
                      </li>
                      <li>
                        <button className="w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa] cursor-pointer">
                          <Users size={12} /> equipe
                        </button>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="border-t border-[#ede7df] pt-3 text-[10px] font-mono">
                <div className="flex items-center justify-between p-1.5 rounded-xl bg-white border border-[#ede7df] shadow-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#ede7df] flex items-center justify-center font-bold text-[#0a0a0a] text-[9px] shrink-0 font-mono">
                      ph
                    </div>
                    <div className="truncate">
                      <div className="font-semibold text-[#0a0a0a] leading-none truncate text-[10px]">pedro</div>
                      <span className="text-[8px] text-[#737373] uppercase">dono</span>
                    </div>
                  </div>
                  <ChevronRight size={10} className="text-[#737373]" />
                </div>
              </div>
            </aside>

            {/* Dashboard Contents Area */}
            <main className="flex-1 p-5 md:p-6 space-y-5 overflow-y-auto z-10 max-h-[700px]">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ede7df] pb-3">
                <div className="space-y-0.5">
                  <div className="text-[#737373] text-[10px] font-mono uppercase">
                    sistema sincronizado // junho 2026
                  </div>
                  <h2 className="text-lg font-bold text-[#0a0a0a] tracking-tight font-mono">boas-vindas, pedro</h2>
                </div>
                {/* Simulation Control Badge */}
                <div className="flex items-center gap-2 bg-[#fdfcfa] border border-[#ede7df] px-2.5 py-1 rounded-xl text-[10px] font-mono shadow-sm">
                  <span className="text-[#737373]">simular alerta de estoque:</span>
                  <button 
                    onClick={() => setStockAlertSimulated(prev => !prev)}
                    className={`px-2 py-0.5 rounded font-bold transition-all text-[9px] cursor-pointer uppercase ${
                      stockAlertSimulated 
                        ? "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200" 
                        : "bg-[#ede7df] hover:bg-[#d1ccb9] text-[#737373]"
                    }`}
                  >
                    {stockAlertSimulated ? "ativo" : "inativo"}
                  </button>
                </div>
              </div>

              {/* Metric Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Metric 1 */}
                <div className="p-3 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] relative overflow-hidden group shadow-sm">
                  <span className="text-[9px] font-semibold text-[#737373] uppercase font-mono">faturado no mês</span>
                  <div className="text-lg font-bold text-[#ff4d1d] mt-1 font-mono">r$ 2.000</div>
                  <div className="text-[8px] text-[#737373] mt-1 font-medium leading-tight">
                    concluído e reconciliado localmente
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-3 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] relative overflow-hidden group shadow-sm">
                  <span className="text-[9px] font-semibold text-[#737373] uppercase font-mono">os abertas</span>
                  <div className="text-lg font-bold text-[#0a0a0a] mt-1 font-mono">0</div>
                  <div className="text-[8px] text-[#737373] mt-1 font-medium leading-tight">
                    fila local aguardando conexões
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-3 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] relative overflow-hidden group shadow-sm">
                  <span className="text-[9px] font-semibold text-[#737373] uppercase font-mono">em andamento</span>
                  <div className="text-lg font-bold text-[#0a0a0a] mt-1 font-mono">0</div>
                  <div className="text-[8px] text-[#737373] mt-1 font-medium leading-tight">
                    sendo executado na bancada ativa
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-3 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] relative overflow-hidden group shadow-sm">
                  <span className="text-[9px] font-semibold text-[#737373] uppercase font-mono">aguardando peça</span>
                  <div className="text-lg font-bold text-[#0a0a0a] mt-1 font-mono">0</div>
                  <div className="text-[8px] text-[#737373] mt-1 font-medium leading-tight">
                    dependência externa de estoque
                  </div>
                </div>
              </div>

              {/* Main Content Layout Grid */}
              {activeTab === "Inicio" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Left Column: OS Flow Chart */}
                  <div className="lg:col-span-2 p-4 rounded-2xl bg-white border border-[#ede7df] space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="text-xs font-bold text-[#0a0a0a] uppercase font-mono">fluxo de ordens (os)</h3>
                        <span className="text-[9px] text-[#737373] font-mono">1 ordem criada • últimos 3 meses</span>
                      </div>
                      {/* Period Toggle */}
                      <div className="flex rounded-lg bg-[#f5f0e9] p-0.5 border border-[#ede7df] text-[8px] font-mono text-[#737373]">
                        <span className="px-2 py-0.5 rounded bg-white text-[#0a0a0a] font-bold shadow-sm">3 meses</span>
                        <span className="px-2 py-0.5 rounded hover:text-[#0a0a0a] cursor-pointer">30d</span>
                        <span className="px-2 py-0.5 rounded hover:text-[#0a0a0a] cursor-pointer">7d</span>
                      </div>
                    </div>

                    {/* SVG Chart Area */}
                    <div className="relative h-48 bg-[#fdfcfa] rounded-xl border border-[#ede7df] p-3 flex flex-col justify-between shadow-inner">
                      {/* Y-axis Labels */}
                      <div className="absolute left-2 top-3 bottom-7 flex flex-col justify-between text-[8px] font-mono text-[#737373]">
                        <span>1</span>
                        <span>0.5</span>
                        <span>0</span>
                      </div>

                      {/* SVG Render */}
                      <div className="w-full h-full pl-5 pr-2 relative">
                        <svg className="w-full h-full" viewBox="0 0 540 180" preserveAspectRatio="none">
                          {/* Grid Lines */}
                          <line x1="20" y1="40" x2="520" y2="40" stroke="#ede7df" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="20" y1="105" x2="520" y2="105" stroke="#ede7df" strokeWidth="1" strokeDasharray="2 2" />
                          <line x1="20" y1="170" x2="520" y2="170" stroke="#ede7df" strokeWidth="1" />

                          {/* Line Chart path */}
                          <path
                            d="M 20 170 L 70 170 L 120 170 L 170 170 L 220 170 L 270 170 L 320 170 L 370 170 L 420 170 L 470 170 L 490 40 L 510 170"
                            fill="none"
                            stroke="#ff4d1d"
                            strokeWidth="2"
                          />

                          {/* Interactive Hover Areas */}
                          {chartPoints.map((pt, idx) => (
                            <circle
                              key={idx}
                              cx={pt.x}
                              cy={pt.y}
                              r={hoveredDataPoint?.index === idx ? 5 : 2.5}
                              className={`fill-[#ff4d1d] cursor-pointer transition-all ${
                                hoveredDataPoint?.index === idx 
                                  ? "stroke-white stroke-2 scale-125" 
                                  : "stroke-black stroke-1"
                              }`}
                              onMouseEnter={() => setHoveredDataPoint({ x: pt.x, y: pt.y, index: idx })}
                              onMouseLeave={() => setHoveredDataPoint(null)}
                            />
                          ))}
                        </svg>

                        {/* Interactive Tooltip popup */}
                        {hoveredDataPoint && (
                          <div 
                            className="absolute bg-white border border-[#ede7df] text-[9px] p-2 rounded-lg shadow-md pointer-events-none z-20 font-mono text-[#0a0a0a]"
                            style={{ 
                              left: `${(hoveredDataPoint.x / 540) * 92}%`, 
                              top: `${(hoveredDataPoint.y / 180) * 70}%`,
                              transform: "translate(-50%, -110%)"
                            }}
                          >
                            <div className="font-bold text-[#0a0a0a]">{chartPoints[hoveredDataPoint.index].label}</div>
                            <div className="text-[#ff4d1d] mt-0.5">{chartPoints[hoveredDataPoint.index].val} OS criada</div>
                          </div>
                        )}
                      </div>

                      {/* X-axis Labels */}
                      <div className="flex justify-between pl-5 pr-2 text-[8px] font-mono text-[#737373]">
                        <span>17 mar</span>
                        <span className="hidden sm:inline">28 mar</span>
                        <span className="hidden md:inline">7 abr</span>
                        <span>17 abr</span>
                        <span className="hidden sm:inline">28 abr</span>
                        <span className="hidden md:inline">8 mai</span>
                        <span>18 mai</span>
                        <span className="hidden sm:inline">29 mai</span>
                        <span>12 jun</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Stock Warning Card */}
                  <div className="p-4 rounded-2xl bg-white border border-[#ede7df] space-y-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <h3 className="text-xs font-bold text-[#0a0a0a] uppercase font-mono">estoque crítico</h3>
                        <span className="text-[8px] text-[#737373]">itens abaixo do limite</span>
                      </div>
                      <span className="text-[8px] text-[#ff4d1d] hover:underline cursor-pointer uppercase font-mono">ver tudo</span>
                    </div>

                    <div className="min-h-[160px] flex flex-col items-center justify-center p-3 bg-[#fdfcfa] rounded-xl border border-[#ede7df]/50">
                      {!stockAlertSimulated ? (
                        // Normal healthy state
                        <div className="text-center space-y-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
                            <CheckCircle size={16} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-[10px] font-bold text-[#525252] uppercase font-mono">estoque em dia</h4>
                            <p className="text-[9px] text-[#737373] max-w-[150px] mx-auto leading-normal">
                              nenhum item crítico detectado no inventário.
                            </p>
                          </div>
                        </div>
                      ) : (
                        // Warning state
                        <div className="w-full space-y-2">
                          <div className="p-2 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2 text-[9px] font-mono">
                            <div className="w-5 h-5 rounded bg-red-100/50 border border-red-200 flex items-center justify-center text-red-600 shrink-0">
                              <AlertTriangle size={10} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-red-950 truncate font-semibold">pastilha freio traseira</div>
                              <div className="text-red-700/80 text-[8px]">qtd: 2 // min: 5</div>
                            </div>
                            <span className="bg-red-200 text-red-800 font-bold px-1 rounded-lg text-[8px] border border-red-300 shrink-0">falta</span>
                          </div>

                          <div className="p-2 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center gap-2 text-[9px] font-mono">
                            <div className="w-5 h-5 rounded bg-yellow-100/50 border border-yellow-200 flex items-center justify-center text-yellow-600 shrink-0">
                              <AlertTriangle size={10} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-yellow-950 truncate font-semibold">óleo mobil 1l</div>
                              <div className="text-yellow-700/80 text-[8px]">qtd: 4 // min: 8</div>
                            </div>
                            <span className="bg-yellow-200 text-yellow-800 font-bold px-1 rounded-lg text-[8px] border border-yellow-300 shrink-0">alerta</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Ordens de Servico Tab View */}
              {activeTab === "OS" && (
                <div className="p-4 rounded-2xl bg-white border border-[#ede7df] space-y-3 shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-[#ede7df]">
                    <h3 className="text-xs font-bold text-[#0a0a0a] uppercase font-mono">fila de ordens de serviço</h3>
                    <span className="text-[9px] text-[#737373] font-mono">total: 1 ativa</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-[10px] font-mono">
                      <thead>
                        <tr className="text-[#737373] border-b border-[#ede7df] uppercase font-mono text-[9px]">
                          <th className="pb-2 font-normal">placa/os</th>
                          <th className="pb-2 font-normal">cliente // moto</th>
                          <th className="pb-2 font-normal">serviço</th>
                          <th className="pb-2 font-normal">status</th>
                          <th className="pb-2 font-normal text-right">valor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ede7df]">
                        <tr>
                          <td className="py-2.5 font-bold text-[#ff4d1d]">abc-1d23</td>
                          <td className="py-2.5">
                            <div className="font-semibold text-[#0a0a0a]">carlos alberto</div>
                            <div className="text-[9px] text-[#737373]">honda cg 160 titan</div>
                          </td>
                          <td className="py-2.5 text-[#525252] leading-normal">revisão elétrica completa + troca de óleo motor</td>
                          <td className="py-2.5">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-100 text-[8px] uppercase font-bold">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              executando
                            </span>
                          </td>
                          <td className="py-2.5 text-right font-bold text-[#0a0a0a]">r$ 380,00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Estoque Tab View */}
              {activeTab === "Estoque" && (
                <div className="p-4 rounded-2xl bg-white border border-[#ede7df] space-y-3 shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-[#ede7df]">
                    <h3 className="text-xs font-bold text-[#0a0a0a] uppercase font-mono">inventário de peças</h3>
                    <button 
                      onClick={() => setStockAlertSimulated(prev => !prev)}
                      className="text-[9px] px-2 py-0.5 rounded-lg bg-[#f5f0e9] border border-[#ede7df] hover:bg-[#ede7df] text-[#737373] font-mono uppercase tracking-wider"
                    >
                      alternar simulação
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-[#fdfcfa] border border-[#ede7df] rounded-xl font-mono">
                      <div className="text-[9px] text-[#737373] uppercase font-semibold">pneu dianteiro 90/90-18</div>
                      <div className="text-base font-bold text-[#0a0a0a] mt-1">12 un</div>
                      <div className="text-[8px] text-emerald-600 mt-2 font-bold uppercase">status: ok // min: 4</div>
                    </div>
                    <div className={`p-3 rounded-xl border transition-all font-mono ${
                      stockAlertSimulated ? "border-red-200 bg-red-50" : "bg-[#fdfcfa] border-[#ede7df]"
                    }`}>
                      <div className="text-[9px] text-[#737373] uppercase font-semibold">pastilha freio traseira</div>
                      <div className="text-base font-bold text-[#0a0a0a] mt-1">
                        {stockAlertSimulated ? "2 un" : "7 un"}
                      </div>
                      <div className={`text-[8px] mt-2 font-bold uppercase ${
                        stockAlertSimulated ? "text-red-600 animate-pulse" : "text-emerald-600"
                      }`}>
                        status: {stockAlertSimulated ? "critico // min: 5" : "ok // min: 5"}
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl border transition-all font-mono ${
                      stockAlertSimulated ? "border-yellow-200 bg-yellow-50" : "bg-[#fdfcfa] border-[#ede7df]"
                    }`}>
                      <div className="text-[9px] text-[#737373] uppercase font-semibold">óleo mobil 1l</div>
                      <div className="text-base font-bold text-[#0a0a0a] mt-1">
                        {stockAlertSimulated ? "4 un" : "9 un"}
                      </div>
                      <div className={`text-[8px] mt-2 font-bold uppercase ${
                        stockAlertSimulated ? "text-yellow-600" : "text-emerald-600"
                      }`}>
                        status: {stockAlertSimulated ? "alerta // min: 8" : "ok // min: 8"}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </main>
            
            {/* Mobile Bottom Navigation Bar */}
            <div className="flex md:hidden bg-[#fdfcfa] border-t border-[#ede7df] justify-around py-2.5 px-6 shrink-0 z-20">
              <button 
                onClick={() => setActiveTab("Inicio")}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === "Inicio" ? "text-[#ff4d1d] font-bold" : "text-[#737373] hover:text-[#0a0a0a]"
                }`}
              >
                <LayoutGrid size={14} />
                <span className="text-[8px] font-mono tracking-widest font-semibold uppercase">início</span>
              </button>
              <button 
                onClick={() => setActiveTab("OS")}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === "OS" ? "text-[#ff4d1d] font-bold" : "text-[#737373] hover:text-[#0a0a0a]"
                }`}
              >
                <FileText size={14} />
                <span className="text-[8px] font-mono tracking-widest font-semibold uppercase">o.s.</span>
              </button>
              <button 
                onClick={() => setActiveTab("Estoque")}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === "Estoque" ? "text-[#ff4d1d] font-bold" : "text-[#737373] hover:text-[#0a0a0a]"
                }`}
              >
                <Package size={14} />
                <span className="text-[8px] font-mono tracking-widest font-semibold uppercase">estoque</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
