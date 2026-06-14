"use client";

import React, { useState } from "react";
import { 
  GraduationCap, 
  LayoutGrid, 
  ArrowRight, 
  Trophy, 
  ChevronLeft,
  Users, 
  BookOpen, 
  UserCheck, 
  DollarSign, 
  ChevronRight, 
  Activity, 
  LogOut,
  Sparkles,
  FolderTree,
  ChevronLeft as FolderTreeIcon
} from "lucide-react";

interface ConectaDemoProps {
  onBackToPortfolio?: () => void;
}

export default function ConectaDemo({ onBackToPortfolio }: ConectaDemoProps) {
  const [showDashboard, setShowDashboard] = useState(false);
  const [activeTab, setActiveTab] = useState("Visao Geral");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  // Simulated metrics and weekly data
  const weeklySales = [
    { week: "Semana 1", amount: 29.90, height: 40 },
    { week: "Semana 2", amount: 50.00, height: 70 },
    { week: "Semana 3", amount: 80.00, height: 110 },
    { week: "Semana 4", amount: 189.90, height: 150 },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden bg-white border border-[#ede7df] shadow-sm relative min-h-[600px] flex flex-col text-[#525252] font-mono lowercase">
      
      {/* Simulation Watermark Bar */}
      <div className="bg-[#fdfcfa] border-b border-[#ede7df] px-4 py-2.5 flex items-center justify-between z-10 text-[9px] tracking-wider font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7c3aed]" />
          <span>simulação interativa // conecta ensino</span>
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
          {showDashboard && (
            <button 
              onClick={() => setShowDashboard(false)}
              className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#f5f0e9] border border-[#ede7df] text-[#7c3aed] font-medium transition-colors flex items-center gap-1 cursor-pointer text-[9px] font-mono uppercase tracking-widest"
            >
              <ChevronLeft size={10} /> landing page
            </button>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col relative">
        {!showDashboard ? (
          // ================= STUDENT LANDING PAGE =================
          <div className="w-full flex flex-col min-h-[550px] bg-white">
            
            {/* Header / Navbar */}
            <header className="px-5 py-3.5 flex items-center justify-between border-b border-[#ede7df] bg-[#fdfcfa] z-10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                  <GraduationCap size={14} />
                </div>
                <span className="font-bold tracking-widest text-xs text-[#0a0a0a] uppercase font-mono">conecta ensino</span>
              </div>
              
              <nav className="hidden sm:flex items-center gap-4 text-[10px] font-mono uppercase tracking-wider">
                <a href="#" className="text-[#0a0a0a] border-b border-[#7c3aed] pb-0.5 px-0.5 font-bold">início</a>
                <a href="#" className="text-[#737373] hover:text-[#0a0a0a] transition-colors">cursos</a>
              </nav>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowDashboard(true)}
                  className="px-3 py-1.5 text-[10px] font-bold rounded-xl bg-[#7c3aed]/10 hover:bg-[#7c3aed]/20 text-[#7c3aed] border border-[#7c3aed]/30 flex items-center gap-1.5 transition-all cursor-pointer font-mono uppercase tracking-wider"
                >
                  <LayoutGrid size={11} /> painel
                </button>
              </div>
            </header>

            {/* Hero Section */}
            <div className="flex-1 px-6 py-10 md:py-16 flex flex-col lg:flex-row items-center gap-8 max-w-5xl mx-auto z-10">
              {/* Left Column Text */}
              <div className="flex-1 space-y-5 text-center lg:text-left">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-[#f5f0e9] border border-[#ede7df] text-[#7c3aed] text-[9px] font-mono uppercase tracking-wider">
                  <Sparkles size={10} /> educação e conectividade
                </div>
                
                <h1 className="text-2xl md:text-3.5xl font-normal leading-tight text-[#0a0a0a] tracking-tight lowercase">
                  aprenda com especialistas, <br />
                  conecte-se com o <span className="text-[#7c3aed]">futuro.</span>
                </h1>

                <p className="text-[#525252] text-xs leading-relaxed max-w-lg mx-auto lg:mx-0 lowercase">
                  plataforma moderna de ensino ead inspirada em designs modulares. publique seus próprios cursos ou assista a aulas de alta performance com player de vídeo integrado e emissão de certificados válidos.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 text-xs">
                  <button 
                    onClick={() => setShowDashboard(true)}
                    className="w-full sm:w-auto bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-bold py-2.5 px-5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-mono lowercase shadow-sm"
                  >
                    explorar cursos <ArrowRight size={14} />
                  </button>
                  <button 
                    onClick={() => alert("Simulação: Cadastro de instrutor em breve!")}
                    className="w-full sm:w-auto bg-white hover:bg-[#fdfcfa] text-[#737373] border border-[#ede7df] py-2.5 px-5 rounded-xl transition-colors cursor-pointer font-mono lowercase"
                  >
                    quero ser professor
                  </button>
                </div>
              </div>

              {/* Right Column Visual Mockup */}
              <div className="flex-1 w-full max-w-sm relative group">
                {/* Mockup Screen Wrapper */}
                <div className="relative rounded-2xl bg-[#fdfcfa] border border-[#ede7df] p-1.5 overflow-hidden shadow-sm backdrop-blur-sm">
                  {/* Laptop camera / indicator mockup */}
                  <div className="h-5 flex items-center px-3 gap-1 border-b border-[#ede7df] bg-white rounded-t-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ede7df]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ede7df]" />
                  </div>
                  
                  {/* Mock content representation */}
                  <div className="bg-[#f5f0e9] p-3 aspect-video rounded-b-xl flex flex-col justify-end relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#f5f0e9] flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed] animate-pulse">
                        <GraduationCap size={20} />
                      </div>
                    </div>

                    {/* Trophy floating badge */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white border border-[#ede7df] p-2 rounded-xl flex items-center gap-2.5 shadow-sm z-20 font-mono">
                      <div className="w-6 h-6 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed] shrink-0">
                        <Trophy size={12} />
                      </div>
                      <div className="truncate text-left">
                        <div className="text-[10px] font-bold text-[#0a0a0a] leading-none uppercase">certificação inclusa</div>
                        <span className="text-[8px] text-[#737373] block mt-0.5">validação via hash pública</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // ================= ADMIN DASHBOARD =================
          <div className="w-full flex flex-col md:flex-row min-h-[550px] bg-white">
            {/* Sidebar Navigation */}
            <aside className="hidden md:flex w-full md:w-56 border-r border-[#ede7df] bg-[#fdfcfa] flex-col justify-between p-4 z-10 shrink-0">
              <div className="space-y-5">
                {/* Logo and Collapse icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed] shrink-0">
                      <GraduationCap size={12} />
                    </div>
                    <span className="font-bold text-xs tracking-widest text-[#0a0a0a] uppercase font-mono">conecta</span>
                  </div>
                  <button 
                    onClick={() => setShowDashboard(false)}
                    className="p-1 rounded-lg bg-white border border-[#ede7df] text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f0e9] transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={10} />
                  </button>
                </div>

                {/* Profile card */}
                <div className="p-2.5 rounded-xl bg-white border border-[#ede7df] flex items-center gap-2 font-mono">
                  <div className="w-6 h-6 rounded-full bg-[#7c3aed] flex items-center justify-center font-bold text-white text-[9px]">
                    ph
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-[10px] text-[#0a0a0a] truncate">pedro</div>
                    <span className="text-[8px] text-[#737373] uppercase font-medium">admin</span>
                  </div>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-1 text-[10px] font-mono">
                  <button
                    onClick={() => setActiveTab("Visao Geral")}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                      activeTab === "Visao Geral" 
                        ? "bg-[#f5f0e9] text-[#0a0a0a] font-semibold border-l-2 border-[#7c3aed]" 
                        : "text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa]"
                    }`}
                  >
                    <LayoutGrid size={12} /> visão geral
                  </button>
                  <button
                    onClick={() => setActiveTab("Usuarios")}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                      activeTab === "Usuarios" 
                        ? "bg-[#f5f0e9] text-[#0a0a0a] font-semibold border-l-2 border-[#7c3aed]" 
                        : "text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa]"
                    }`}
                  >
                    <Users size={12} /> usuários
                  </button>
                  <button
                    onClick={() => setActiveTab("Categorias")}
                    className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer ${
                      activeTab === "Categorias" 
                        ? "bg-[#f5f0e9] text-[#0a0a0a] font-semibold border-l-2 border-[#7c3aed]" 
                        : "text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa]"
                    }`}
                  >
                    <FolderTree size={12} /> categorias
                  </button>
                  <button className="w-full text-left px-2 py-1.5 rounded-lg flex items-center gap-2 text-[#737373] hover:text-[#0a0a0a] hover:bg-[#fdfcfa] cursor-pointer">
                    <BookOpen size={12} /> cursos
                  </button>
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="space-y-2.5 pt-3 border-t border-[#ede7df] font-mono">
                <button 
                  onClick={() => setShowDashboard(false)}
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[10px] font-bold py-1.5 px-3 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer uppercase"
                >
                  <LogOut size={12} /> sair
                </button>
              </div>
            </aside>

            {/* Dashboard Contents Area */}
            <main className="flex-1 p-5 md:p-6 space-y-5 overflow-y-auto z-10 max-h-[700px] bg-white">
              {/* Header Title Block */}
              <div className="border-b border-[#ede7df] pb-3 flex flex-col md:flex-row justify-between md:items-center gap-3">
                <div>
                  <h2 className="text-[10px] font-bold tracking-widest text-[#737373] font-mono uppercase">painel integrado</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-5 h-5 rounded bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed]">
                      <GraduationCap size={12} />
                    </div>
                    <h1 className="text-base font-bold text-[#0a0a0a] tracking-tight font-mono">controle administrativo</h1>
                  </div>
                  <p className="text-[#737373] text-[10px] mt-1 leading-relaxed max-w-2xl lowercase">
                    visão holística sobre as finanças, engajamento dos alunos, ementa de instrutores e permissões da plataforma.
                  </p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Metric 1 */}
                <div className="p-3 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] flex items-center justify-between group shadow-sm">
                  <div className="min-w-0">
                    <span className="text-[9px] font-semibold text-[#737373] uppercase font-mono">total usuários</span>
                    <div className="text-base font-bold text-[#0a0a0a] mt-0.5 font-mono">148</div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed] shrink-0">
                    <Users size={14} />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-3 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] flex items-center justify-between group shadow-sm">
                  <div className="min-w-0">
                    <span className="text-[9px] font-semibold text-[#737373] uppercase font-mono">cursos ativos</span>
                    <div className="text-base font-bold text-[#0a0a0a] mt-0.5 font-mono">3</div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed] shrink-0">
                    <BookOpen size={14} />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-3 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] flex items-center justify-between group shadow-sm">
                  <div className="min-w-0">
                    <span className="text-[9px] font-semibold text-[#737373] uppercase font-mono">matrículas</span>
                    <div className="text-base font-bold text-[#0a0a0a] mt-0.5 font-mono">1</div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#7c3aed] shrink-0">
                    <UserCheck size={14} />
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="p-3 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] flex items-center justify-between group shadow-sm">
                  <div className="min-w-0">
                    <span className="text-[9px] font-semibold text-[#737373] uppercase font-mono">faturamento</span>
                    <div className="text-base font-bold text-emerald-600 mt-0.5 font-mono">r$ 189,90</div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
                    <DollarSign size={14} />
                  </div>
                </div>
              </div>

              {/* Main Content Layout columns */}
              {activeTab === "Visao Geral" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Left Chart Panel */}
                  <div className="lg:col-span-2 p-4 rounded-2xl bg-white border border-[#ede7df] space-y-3 shadow-sm">
                    <div className="space-y-0.5 text-left">
                      <h3 className="text-xs font-bold text-[#0a0a0a] uppercase font-mono">desempenho vendas ead</h3>
                      <p className="text-[9px] text-[#737373] font-mono">análise de receita real faturada baseada nas matrículas.</p>
                    </div>

                    {/* SVG Bar Chart with hover logic */}
                    <div className="h-48 bg-[#fdfcfa] rounded-xl border border-[#ede7df] p-4 flex flex-col justify-between relative shadow-inner">
                      <div className="w-full flex-1 flex items-end justify-around px-4 relative">
                        {weeklySales.map((pt, idx) => (
                          <div 
                            key={idx} 
                            className="flex flex-col items-center group relative w-12"
                            onMouseEnter={() => setHoveredBar(idx)}
                            onMouseLeave={() => setHoveredBar(null)}
                          >
                            <div 
                              className={`w-8 rounded-t transition-all duration-300 ${
                                hoveredBar === idx 
                                  ? "bg-[#7c3aed] scale-x-105" 
                                  : "bg-[#7c3aed]/60"
                              }`}
                              style={{ height: `${pt.height}px` }}
                            />
                            
                            <span className="text-[8px] font-mono text-[#737373] mt-1.5">{pt.week}</span>

                            {/* Custom interactive tooltip */}
                            {hoveredBar === idx && (
                              <div className="absolute -top-8 bg-white border border-[#ede7df] text-[8px] font-mono p-1 rounded shadow-sm text-[#0a0a0a] whitespace-nowrap z-20">
                                R$ {pt.amount.toFixed(2)}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Controls Panel */}
                  <div className="p-4 rounded-2xl bg-[#fdfcfa] border border-[#ede7df] flex flex-col justify-between gap-4 shadow-sm">
                    <div className="space-y-3">
                      <div className="space-y-0.5 text-left">
                        <h3 className="text-xs font-bold text-[#0a0a0a] uppercase font-mono">auditoria avançada</h3>
                        <p className="text-[9px] text-[#737373] font-mono">selecione uma área para auditar os registros ativos.</p>
                      </div>

                      <div className="space-y-2">
                        <button 
                          onClick={() => setActiveTab("Usuarios")}
                          className="w-full p-2.5 rounded-xl bg-white hover:bg-[#fdfcfa] border border-[#ede7df] flex items-center justify-between text-left transition-colors group cursor-pointer font-mono"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <Users size={12} className="text-[#7c3aed] shrink-0" />
                            <div className="truncate">
                              <div className="font-semibold text-[#0a0a0a] text-[10px]">usuários</div>
                              <span className="text-[8px] text-[#737373] block leading-none">auditar permissões</span>
                            </div>
                          </div>
                          <ChevronRight size={10} className="text-[#737373] group-hover:text-[#0a0a0a] transition-colors" />
                        </button>

                        <button 
                          onClick={() => setActiveTab("Categorias")}
                          className="w-full p-2.5 rounded-xl bg-white hover:bg-[#fdfcfa] border border-[#ede7df] flex items-center justify-between text-left transition-colors group cursor-pointer font-mono"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <FolderTree size={12} className="text-[#7c3aed] shrink-0" />
                            <div className="truncate">
                              <div className="font-semibold text-[#0a0a0a] text-[10px]">categorias</div>
                              <span className="text-[8px] text-[#737373] block leading-none">tags de disciplinas</span>
                            </div>
                          </div>
                          <ChevronRight size={10} className="text-[#737373] group-hover:text-[#0a0a0a] transition-colors" />
                        </button>
                      </div>
                    </div>

                    {/* Operational Status */}
                    <div className="p-2.5 rounded-xl bg-white border border-[#ede7df] flex items-center justify-between font-mono">
                      <span className="text-[8px] font-bold text-[#737373] uppercase">sistema</span>
                      <div className="flex items-center gap-1 text-[8px] text-emerald-600 font-bold">
                        <Activity size={10} className="animate-pulse" />
                        <span>100% ok</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Users management tab representation */}
              {activeTab === "Usuarios" && (
                <div className="p-4 rounded-2xl bg-white border border-[#ede7df] space-y-3 shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-[#ede7df]">
                    <h3 className="text-xs font-bold text-[#0a0a0a] uppercase font-mono">gerenciamento de usuários</h3>
                    <button 
                      onClick={() => setActiveTab("Visao Geral")}
                      className="text-[9px] text-[#7c3aed] hover:underline cursor-pointer font-mono"
                    >
                      voltar
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto text-[10px] font-mono">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[#737373] border-b border-[#ede7df] font-mono uppercase text-[9px]">
                          <th className="pb-2 font-normal">nome</th>
                          <th className="pb-2 font-normal">e-mail</th>
                          <th className="pb-2 font-normal">cargo</th>
                          <th className="pb-2 font-normal">status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#ede7df] text-[#525252]">
                        <tr>
                          <td className="py-2.5 font-semibold">pedro henrique</td>
                          <td className="py-2.5 text-[#737373]">pedro@conecta.com.br</td>
                          <td className="py-2.5"><span className="text-[#7c3aed] font-semibold">admin</span></td>
                          <td className="py-2.5"><span className="text-emerald-600 font-bold">ativo</span></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-semibold">guilherme silva</td>
                          <td className="py-2.5 text-[#737373]">guilherme@conecta.com.br</td>
                          <td className="py-2.5">professor</td>
                          <td className="py-2.5"><span className="text-emerald-600 font-bold">ativo</span></td>
                        </tr>
                        <tr>
                          <td className="py-2.5 font-semibold">ana costa</td>
                          <td className="py-2.5 text-[#737373]">ana.costa@aluno.com</td>
                          <td className="py-2.5">aluno</td>
                          <td className="py-2.5"><span className="text-emerald-600 font-bold">ativo</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Categories management representation */}
              {activeTab === "Categorias" && (
                <div className="p-4 rounded-2xl bg-white border border-[#ede7df] space-y-3 font-mono shadow-sm">
                  <div className="flex items-center justify-between pb-2 border-b border-[#ede7df]">
                    <h3 className="text-xs font-bold text-[#0a0a0a] uppercase font-mono">tags e disciplinas</h3>
                    <button 
                      onClick={() => setActiveTab("Visao Geral")}
                      className="text-[9px] text-[#7c3aed] hover:underline cursor-pointer font-mono"
                    >
                      voltar
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-xl bg-[#f5f0e9] border border-[#ede7df] text-[#7c3aed] text-[10px] font-semibold">programação</span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-[#ede7df] text-[#737373] text-[10px]">design ux</span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-[#ede7df] text-[#737373] text-[10px]">gestão ágil</span>
                    <span className="px-2.5 py-1 rounded-xl bg-white border border-[#ede7df] text-[#737373] text-[10px]">marketing</span>
                  </div>
                </div>
              )}
            </main>
            
            {/* Mobile Bottom Navigation Bar */}
            <div className="flex md:hidden bg-[#fdfcfa] border-t border-[#ede7df] justify-around py-2.5 px-6 shrink-0 z-20">
              <button 
                onClick={() => setActiveTab("Visao Geral")}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === "Visao Geral" ? "text-[#7c3aed] font-bold" : "text-[#737373] hover:text-[#0a0a0a]"
                }`}
              >
                <LayoutGrid size={14} />
                <span className="text-[8px] font-mono tracking-widest font-semibold uppercase">geral</span>
              </button>
              <button 
                onClick={() => setActiveTab("Usuarios")}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === "Usuarios" ? "text-[#7c3aed] font-bold" : "text-[#737373] hover:text-[#0a0a0a]"
                }`}
              >
                <Users size={14} />
                <span className="text-[8px] font-mono tracking-widest font-semibold uppercase">usuários</span>
              </button>
              <button 
                onClick={() => setActiveTab("Categorias")}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  activeTab === "Categorias" ? "text-[#7c3aed] font-bold" : "text-[#737373] hover:text-[#0a0a0a]"
                }`}
              >
                <FolderTreeIcon size={14} />
                <span className="text-[8px] font-mono tracking-widest font-semibold uppercase">tags</span>
              </button>
              <button 
                onClick={() => setShowDashboard(false)}
                className="flex flex-col items-center gap-1 text-[#737373] hover:text-[#0a0a0a] transition-colors cursor-pointer"
              >
                <ChevronLeft size={14} />
                <span className="text-[8px] font-mono tracking-widest font-semibold uppercase">voltar</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
