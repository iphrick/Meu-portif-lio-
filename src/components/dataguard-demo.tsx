"use client";

import React, { useState } from "react";
import { 
  Shield, 
  Activity, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  FileSpreadsheet,
  TrendingDown,
  TrendingUp,
  ChevronRight,
  Database,
  Layers,
  RefreshCw
} from "lucide-react";

interface DataGuardDemoProps {
  onBackToPortfolio?: () => void;
}

type FileState = "dirty" | "clean" | "idle" | "uploading";

export default function DataGuardDemo({ onBackToPortfolio }: DataGuardDemoProps) {
  const [activeTab, setActiveTab] = useState<"cargas" | "monitoramento">("monitoramento");
  const [fileState, setFileState] = useState<FileState>("dirty");
  const [uploadProgress, setUploadProgress] = useState(0);

  const startSimulation = (type: "dirty" | "clean") => {
    setFileState("uploading");
    setUploadProgress(0);
    
    // Simulate upload progress interval
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setFileState(type);
            setActiveTab("monitoramento"); // Automatically direct to dashboard to see results!
          }, 400);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  // Metrics database based on active file state
  const metrics = {
    dirty: {
      healthScore: "33.0%",
      healthStatus: "CRÍTICO",
      healthDesc: "Problemas graves e volumosos. A qualidade dos dados está seriamente comprometida. (Última carga: clientes_complexo_grande.csv)",
      qualityScore: "33.0%",
      qualityDiff: "-17.0%",
      qualityDiffColor: "text-red-600",
      nullFields: "0.90%",
      nullDiff: "-0.14%",
      nullDiffColor: "text-emerald-600", // Null fields decreased slightly, which is good
      duplicates: "29.00%",
      duplicatesDiff: "+20.67%",
      duplicatesDiffColor: "text-red-600",
      quarantine: "67.00%",
      quarantineDiff: "+17.00%",
      quarantineDiffColor: "text-red-600",
      fileName: "clientes_complexo_grande.csv",
      avgScore: "33%",
      uploadsCount: 12,
      recordsCount: "1.098",
      completedCount: 9
    },
    clean: {
      healthScore: "94.5%",
      healthStatus: "SAUDÁVEL",
      healthDesc: "Dados limpos e estruturados. Todos os esquemas de validação de dados em total conformidade. (Última carga: vendas_consolidado_limpo.csv)",
      qualityScore: "94.5%",
      qualityDiff: "+61.5%",
      qualityDiffColor: "text-emerald-600",
      nullFields: "0.02%",
      nullDiff: "-0.88%",
      nullDiffColor: "text-emerald-600",
      duplicates: "0.05%",
      duplicatesDiff: "-28.95%",
      duplicatesDiffColor: "text-emerald-600",
      quarantine: "2.00%",
      quarantineDiff: "-65.00%",
      quarantineDiffColor: "text-emerald-600",
      fileName: "vendas_consolidado_limpo.csv",
      avgScore: "81%", // Combined average improved
      uploadsCount: 13,
      recordsCount: "3.420",
      completedCount: 11
    }
  };

  const currentMetrics = fileState === "clean" ? metrics.clean : metrics.dirty;
  const isHealthy = fileState === "clean";

  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-[#ede7df] relative min-h-[600px] flex flex-col text-[#525252] font-mono lowercase rounded-2xl shadow-sm overflow-hidden">
      
      {/* Simulation Watermark Bar */}
      <div className="bg-[#fdfcfa] border-b border-[#ede7df] px-4 py-2 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
          <span className="text-[10px] tracking-wider text-[#737373]">
            {"[ambiente de simulação interativa: dataguard etl]"}
          </span>
        </div>
        <div className="flex gap-2">
          {onBackToPortfolio && (
            <button 
              onClick={onBackToPortfolio}
              className="text-[9px] px-2.5 py-1 border border-[#ede7df] bg-white hover:bg-[#f5f0e9] text-[#737373] hover:text-[#0a0a0a] transition-colors cursor-pointer uppercase font-bold tracking-wider rounded-lg"
            >
              voltar
            </button>
          )}
        </div>
      </div>

      {/* Header / Navbar */}
      <header className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#ede7df] bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#fdfcfa] border border-[#ede7df] flex items-center justify-center text-[#2563eb] rounded-lg">
            <Shield size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-[#0a0a0a] tracking-tight">dataguard etl</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#2563eb]/20 bg-[#2563eb]/10 text-[#2563eb] text-[8px] font-bold tracking-wider uppercase rounded-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]" /> sistema ativo
              </span>
            </div>
            <span className="text-[9px] text-[#737373]">sistema de qualidade de dados</span>
          </div>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-[#f5f0e9] p-1 border border-[#ede7df] rounded-xl">
          <button
            onClick={() => setActiveTab("cargas")}
            className={`px-3 py-1.5 text-[10px] flex items-center gap-2 transition-colors cursor-pointer rounded-lg ${
              activeTab === "cargas" 
                ? "bg-[#2563eb] text-white font-bold" 
                : "text-[#737373] hover:text-[#0a0a0a]"
            }`}
          >
            <Layers size={11} /> dashboard de cargas
          </button>
          <button
            onClick={() => setActiveTab("monitoramento")}
            className={`px-3 py-1.5 text-[10px] flex items-center gap-2 transition-colors cursor-pointer rounded-lg ${
              activeTab === "monitoramento" 
                ? "bg-[#2563eb] text-white font-bold" 
                : "text-[#737373] hover:text-[#0a0a0a]"
            }`}
          >
            <Activity size={11} /> monitoramento contínuo
          </button>
        </div>
      </header>

      {/* Main viewport area */}
      <div className="flex-1 p-6 space-y-6 z-10 overflow-y-auto max-h-[650px]">
        {activeTab === "cargas" ? (
          // ================= CARGAS VIEW (UPLOAD) =================
          <div className="space-y-6">
            
            {/* Top Indicator Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wider">{"// uploads"}</span>
                  <UploadCloud size={12} className="text-[#737373]" />
                </div>
                <div className="text-xl font-bold text-[#0a0a0a] mt-1">{currentMetrics.uploadsCount}</div>
                <span className="text-[9px] text-[#737373] block mt-1">total de arquivos enviados</span>
              </div>

              <div className="p-4 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wider">{"// registros"}</span>
                  <Database size={12} className="text-[#737373]" />
                </div>
                <div className="text-xl font-bold text-[#0a0a0a] mt-1">{currentMetrics.recordsCount}</div>
                <span className="text-[9px] text-[#737373] block mt-1">registros processados</span>
              </div>

              <div className="p-4 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wider">{"// score médio"}</span>
                  <Activity size={12} className="text-[#737373]" />
                </div>
                <div className="text-xl font-bold mt-1 text-[#2563eb]">{currentMetrics.avgScore}</div>
                <span className="text-[9px] text-[#737373] block mt-1">qualidade geral dos dados</span>
              </div>

              <div className="p-4 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wider">{"// concluídos"}</span>
                  <CheckCircle2 size={12} className="text-[#737373]" />
                </div>
                <div className="text-xl font-bold text-[#0a0a0a] mt-1">{currentMetrics.completedCount}</div>
                <span className="text-[9px] text-[#737373] block mt-1">arquivos concluídos</span>
              </div>
            </div>

            {/* Drag & Drop simulated area */}
            <div className="p-8 border border-dashed border-[#ede7df] bg-[#fdfcfa]/50 text-center space-y-6 rounded-2xl">
              
              {fileState === "uploading" ? (
                // Uploading loading state
                <div className="py-6 space-y-4 max-w-xs mx-auto">
                  <RefreshCw size={24} className="animate-spin text-[#2563eb] mx-auto" />
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-[#0a0a0a]">processando arquivo: {uploadProgress}%</div>
                    <div className="w-full h-2 bg-[#f5f0e9] overflow-hidden border border-[#ede7df] rounded-full">
                      <div className="h-full bg-[#2563eb] transition-all duration-200" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <span className="text-[9px] text-[#737373] block">executando regras de integridade schema (pydantic)</span>
                  </div>
                </div>
              ) : (
                // Default drag & drop instruction
                <div className="space-y-4 py-4">
                  <div className="w-12 h-12 border border-[#ede7df] bg-white flex items-center justify-center text-[#737373] mx-auto rounded-full shadow-sm">
                    <UploadCloud size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xs font-bold text-[#0a0a0a]">arraste seu arquivo aqui ou clique para selecionar</h4>
                    <p className="text-[10px] text-[#737373]">formatos aceitos: csv, excel (xlsx, xls)</p>
                  </div>
                  
                  {/* Quick select buttons */}
                  <div className="flex items-center justify-center gap-2 pt-2 text-[10px]">
                    <span className="px-2 py-0.5 border border-[#ede7df] bg-white text-[#737373] rounded-lg shadow-sm">.csv</span>
                    <span className="px-2 py-0.5 border border-[#ede7df] bg-white text-[#737373] rounded-lg shadow-sm">.xlsx</span>
                    <span className="px-2 py-0.5 border border-[#ede7df] bg-white text-[#737373] rounded-lg shadow-sm">.xls</span>
                  </div>
                </div>
              )}
            </div>

            {/* Simulating Data Sets Upload Options card */}
            <div className="p-5 border border-[#ede7df] bg-[#fdfcfa] space-y-3 rounded-2xl">
              <h4 className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">{"// simular upload de arquivo"}</h4>
              <p className="text-[10px] text-[#737373] leading-relaxed">
                escolha carregar um conjunto de dados poluído ou estruturado para testar a resposta do pipeline do dataguard etl.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => startSimulation("dirty")}
                  className="flex-1 p-3.5 border border-red-200 bg-red-50 hover:bg-red-100/50 text-left transition-all cursor-pointer flex items-center justify-between rounded-xl"
                >
                  <div>
                    <div className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                      <FileSpreadsheet size={13} /> clientes_complexo_grande.csv
                    </div>
                    <span className="text-[9px] text-red-600 block mt-1 font-mono">dados corrompidos, campos nulos e duplicatas</span>
                  </div>
                  <ChevronRight size={14} className="text-red-500" />
                </button>

                <button
                  onClick={() => startSimulation("clean")}
                  className="flex-1 p-3.5 border border-emerald-200 bg-emerald-50 hover:bg-emerald-100/50 text-left transition-all cursor-pointer flex items-center justify-between rounded-xl"
                >
                  <div>
                    <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5">
                      <FileSpreadsheet size={13} /> vendas_consolidado_limpo.csv
                    </div>
                    <span className="text-[9px] text-emerald-600 block mt-1 font-mono">dados sanitizados e em conformidade estrita</span>
                  </div>
                  <ChevronRight size={14} className="text-emerald-500" />
                </button>
              </div>
            </div>

          </div>
        ) : (
          // ================= MONITORAMENTO VIEW (DASHBOARD) =================
          <div className="space-y-6">
            
            {/* Health Indicators split row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              
              {/* Giant health indicator panel */}
              <div className="lg:col-span-1 p-5 border border-[#ede7df] bg-[#fdfcfa] flex flex-col justify-between text-center relative overflow-hidden group rounded-2xl shadow-sm">
                <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wider">
                  {"// indicador de saúde dos dados"}
                </span>

                <div className="my-6 space-y-2">
                  <div className={`text-4xl md:text-5xl font-extrabold transition-colors ${
                    isHealthy ? "text-emerald-600" : "text-red-600"
                  }`}>
                    {currentMetrics.healthScore}
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 border text-[10px] font-bold uppercase rounded-lg ${
                    isHealthy 
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                      : "bg-red-50 text-red-700 border-red-200 animate-pulse"
                  }`}>
                    {currentMetrics.healthStatus}
                  </span>
                </div>

                <div className="p-3 bg-white border border-[#ede7df] text-[10px] text-[#737373] leading-relaxed text-left rounded-xl">
                  {currentMetrics.healthDesc}
                </div>
              </div>

              {/* Auxiliary indicators (4 cards grid) */}
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Score */}
                <div className="p-4 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm space-y-2">
                  <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wider">{"// score de qualidade"}</span>
                  <div className="text-xl font-bold text-[#0a0a0a]">{currentMetrics.qualityScore}</div>
                  <div className={`text-[9px] font-bold ${currentMetrics.qualityDiffColor}`}>
                    {currentMetrics.qualityDiff} em relação à carga anterior
                  </div>
                </div>

                {/* Nulls */}
                <div className="p-4 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm space-y-2">
                  <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wider">{"// campos nulos"}</span>
                  <div className="text-xl font-bold text-[#0a0a0a]">{currentMetrics.nullFields}</div>
                  <div className={`text-[9px] font-bold ${currentMetrics.nullDiffColor}`}>
                    {currentMetrics.nullDiff} versus teto aceitável (1.00%)
                  </div>
                </div>

                {/* Duplicates */}
                <div className="p-4 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm space-y-2">
                  <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wider">{"// duplicidades"}</span>
                  <div className="text-xl font-bold text-[#0a0a0a]">{currentMetrics.duplicates}</div>
                  <div className={`text-[9px] font-bold ${currentMetrics.duplicatesDiffColor}`}>
                    {currentMetrics.duplicatesDiff} versus teto aceitável (0.10%)
                  </div>
                </div>

                {/* Quarantine */}
                <div className="p-4 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm space-y-2">
                  <span className="text-[9px] font-bold text-[#737373] uppercase tracking-wider">{"// registros na quarentena"}</span>
                  <div className="text-xl font-bold text-[#0a0a0a]">{currentMetrics.quarantine}</div>
                  <div className={`text-[9px] font-bold ${currentMetrics.quarantineDiffColor}`}>
                    {currentMetrics.quarantineDiff} de rejeitados no pipeline
                  </div>
                </div>

              </div>

            </div>

            {/* Trends and alerts list */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Trends & Insights */}
              <div className="p-5 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">{"// análise de tendências & insights"}</h4>
                  <TrendingDown size={12} className="text-[#737373]" />
                </div>

                <div className="space-y-3">
                  {!isHealthy ? (
                    // Dirty insights
                    <>
                      <div className="p-3 bg-red-50 border border-red-100 text-xs flex gap-3 rounded-xl">
                        <TrendingDown size={14} className="text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-950">
                            a qualidade geral dos dados caiu <strong className="text-red-600">17.0%</strong> em relação à última carga.
                          </p>
                          <span className="text-[9px] text-[#737373] block mt-1">comparando clientes_teste.csv com {currentMetrics.fileName}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-yellow-50 border border-yellow-100 text-xs flex gap-3 rounded-xl">
                        <AlertCircle size={14} className="text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-yellow-950">
                            a duplicidade de registros aumentou <strong className="text-yellow-600 font-mono">20.7%</strong> nesta carga. supera os limites operacionais recomendados.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Clean insights
                    <>
                      <div className="p-3 bg-emerald-50 border border-emerald-100 text-xs flex gap-3 rounded-xl">
                        <TrendingUp size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-emerald-950">
                            a qualidade geral subiu <strong className="text-emerald-600">+61.5%</strong> após a carga do novo lote sanitizado.
                          </p>
                          <span className="text-[9px] text-[#737373] block mt-1">arquivo: {currentMetrics.fileName} em total conformidade.</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white border border-[#ede7df] text-xs flex gap-3 rounded-xl">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[#737373]">
                            fator de registros nulos sob controle: <span className="text-zinc-800">0.02%</span> (abaixo do teto tolerável).
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Active alerts */}
              <div className="p-5 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#0a0a0a] uppercase tracking-wider">{"// alertas de degradação ativos"}</h4>
                  <AlertTriangle size={12} className="text-[#737373]" />
                </div>

                <div className="space-y-3">
                  {!isHealthy ? (
                    // Dirty alerts
                    <>
                      <div className="p-3 bg-red-50 border border-red-100 text-xs flex justify-between items-start rounded-xl">
                        <div>
                          <div className="font-bold text-red-600 text-[10px]">quarentena crítica</div>
                          <p className="text-red-950 mt-1">registros rejeitados superando o limite operacional de 15%.</p>
                          <span className="text-[9px] text-red-600/70 block mt-1">arquivo: {currentMetrics.fileName}</span>
                        </div>
                        <span className="text-[9px] text-[#737373] shrink-0">12/06 02:47</span>
                      </div>
                      
                      <div className="p-3 bg-red-50 border border-red-100 text-xs flex justify-between items-start rounded-xl">
                        <div>
                          <div className="font-bold text-red-600 text-[10px]">queda brusca de qualidade</div>
                          <p className="text-red-950 mt-1">score de integridade geral caiu abaixo de 50.0% na fila de etl.</p>
                        </div>
                        <span className="text-[9px] text-[#737373] shrink-0">12/06 02:45</span>
                      </div>
                    </>
                  ) : (
                    // Clean alerts (All resolved)
                    <div className="py-8 text-center space-y-3 bg-white border border-[#ede7df] rounded-xl">
                      <div className="w-9 h-9 border border-[#ede7df] bg-[#f5f0e9] flex items-center justify-center text-emerald-500 mx-auto rounded-full">
                        <CheckCircle2 size={14} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold text-[#0a0a0a]">nenhum alerta pendente</div>
                        <p className="text-[9px] text-[#737373] max-w-[170px] mx-auto">sistemas em perfeita conformidade. qualidade saudável.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Quick Switch Button at bottom for convenience */}
            <div className="text-center">
              <button
                onClick={() => startSimulation(isHealthy ? "dirty" : "clean")}
                className="text-[10px] bg-[#f5f0e9] hover:bg-[#ede7df] border border-[#ede7df] text-[#737373] hover:text-[#0a0a0a] px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                alternar simulação de arquivo: {isHealthy ? "clientes_complexo_grande.csv (dirty)" : "vendas_consolidado_limpo.csv (clean)"}
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
