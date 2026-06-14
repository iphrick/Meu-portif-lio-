"use client";

import React, { useState, useRef } from "react";
import { 
  Database, 
  Smartphone, 
  WifiOff, 
  CloudLightning, 
  UploadCloud, 
  Server, 
  Cpu, 
  Tv, 
  Network, 
  Check, 
  Layers, 
  HelpCircle,
  Brain,
  ShieldCheck,
  AlertTriangle,
  Award
} from "lucide-react";

interface ArchitectureViewerProps {
  project: "motosys" | "conecta" | "juriquest" | "dataguard";
}

export default function ArchitectureViewer({ project }: ArchitectureViewerProps) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement>(null);

  // 1. Data for Motosys Offline-First Sync Architecture
  const motosysNodes = [
    {
      id: "ui",
      title: "ui / entrada de dados",
      tech: "react native / next.js",
      icon: <Smartphone className="text-[#ff4d1d]" size={16} />,
      desc: "o mecânico cria a ordem de serviço pelo celular, preenchendo a placa e checklist em menos de 30 segundos. a interface continua responsiva mesmo sem nenhuma conectividade.",
      tip: "usa estado local otimista para resposta imediata ao usuário."
    },
    {
      id: "localdb",
      title: "banco local (indexeddb)",
      tech: "rxdb / localforage",
      icon: <Database className="text-[#ff4d1d]" size={16} />,
      desc: "os dados são gravados localmente em um banco de dados relacional leve no próprio dispositivo do usuário.",
      tip: "garante persistência permanente mesmo se a aba ou aplicativo fechar acidentalmente."
    },
    {
      id: "queue",
      title: "gerenciador de fila (sync)",
      tech: "custom sync queue",
      icon: <Layers className="text-[#ff4d1d]" size={16} />,
      desc: "se o dispositivo estiver sem internet, as mutações de escrita são empilhadas em uma fila de sincronização persistente com carimbo de data/hora.",
      tip: "implementa lógica retry-with-backoff para prevenir concorrência de rede."
    },
    {
      id: "monitor",
      title: "monitor de conectividade",
      tech: "navigator api + event listeners",
      icon: <WifiOff className="text-[#ff4d1d]" size={16} />,
      desc: "escuta eventos de rede do sistema operacional e testa conexões ping periódicas silenciosas para determinar se há internet real trafegável.",
      tip: "evita falsos-positivos de redes wi-fi públicas sem conexão wan ativa."
    },
    {
      id: "cloud",
      title: "nuvem & firestore",
      tech: "firebase sync service",
      icon: <CloudLightning className="text-[#ff4d1d]" size={16} />,
      desc: "ao recuperar sinal, os lotes da fila local são descarregados no firestore, resolvendo conflitos pelo modelo 'last write wins'.",
      tip: "faturamento e relatórios globais são atualizados no painel do dono da oficina imediatamente."
    }
  ];

  // 2. Data for Conecta Ensino Video Transcoding Architecture
  const conectaNodes = [
    {
      id: "upload",
      title: "upload do professor",
      tech: "dashboard admin / next.js s3 uploader",
      icon: <UploadCloud className="text-[#7c3aed]" size={16} />,
      desc: "o professor seleciona a aula em mp4. o sistema gera uma url pré-assinada de upload direto para evitar sobrecarga no servidor node.",
      tip: "upload direto ao s3 maximiza velocidade e reduz custos de tráfego de rede."
    },
    {
      id: "ingest",
      title: "bucket ingest (s3)",
      tech: "amazon s3 + lambda triggers",
      icon: <Server className="text-[#7c3aed]" size={16} />,
      desc: "armazena o vídeo original bruto. um trigger no s3 executa instantaneamente uma função serverless aws lambda ao concluir o upload.",
      tip: "lambda extrai metadados do vídeo (tamanho, formato) e inicia a tarefa de transcodificação."
    },
    {
      id: "transcode",
      title: "transcodificador (ffmpeg/mediaconvert)",
      tech: "aws elemental mediaconvert",
      icon: <Cpu className="text-[#7c3aed]" size={16} />,
      desc: "converte o vídeo bruto em formato hls (http live streaming), gerando resoluções (1080p, 720p, 480p) e segmentando-o em pequenos fragmentos de 4s (.ts).",
      tip: "hls previne pirataria convencional de download direto e otimiza a largura de banda conforme a qualidade da internet do aluno."
    },
    {
      id: "cdn",
      title: "distribuição cdn",
      tech: "amazon cloudfront cdn",
      icon: <Network className="text-[#7c3aed]" size={16} />,
      desc: "faz cache de todos os segmentos de vídeo (.ts) e arquivos de índice (.m3u8) nas bordas globais mais próximas do aluno.",
      tip: "reduz a latência de início do vídeo para menos de 500ms mundialmente."
    },
    {
      id: "player",
      title: "player hls seguro",
      tech: "react player + hls.js + signed cookies",
      icon: <Tv className="text-[#7c3aed]" size={16} />,
      desc: "o aluno assiste à aula em um player customizado. os links expiram rapidamente e necessitam de tokens de autenticação válidos para serem decodificados.",
      tip: "mudança dinâmica inteligente de qualidade (adaptive bitrate streaming) integrada nativamente."
    }
  ];

  // 3. Data for JuriQuest Gamification Engine
  const juriquestNodes = [
    {
      id: "jq_ui",
      title: "dashboard de questões",
      tech: "react frontend",
      icon: <Smartphone className="text-[#db2777]" size={16} />,
      desc: "o aluno seleciona a matéria atual. o frontend solicita uma nova questão para o motor de gamificação, enviando o histórico de erros do usuário.",
      tip: "reduz latência guardando o estado do progresso no localstorage do dispositivo do estudante."
    },
    {
      id: "jq_cache",
      title: "cache de sessão",
      tech: "redis / local memory cache",
      icon: <Layers className="text-[#db2777]" size={16} />,
      desc: "verifica se há questões pré-geradas no cache temporário para o usuário atual, garantindo que o tempo de resposta do clique seja de poucos milissegundos.",
      tip: "evita gargalos de banco de dados sob acessos massivos simultâneos."
    },
    {
      id: "jq_engine",
      title: "filtro de repetição espaçada",
      tech: "supermemo-2 / leitner algorithm",
      icon: <Brain className="text-[#db2777]" size={16} />,
      desc: "algoritmo computacional que seleciona a pergunta adequada baseado na curva de esquecimento do aluno, priorizando matérias com maiores taxas de erros.",
      tip: "garante fixação de conteúdo de longo prazo ajustando o intervalo de retorno da questão."
    },
    {
      id: "jq_db",
      title: "banco de questões",
      tech: "postgresql / nosql json",
      icon: <Database className="text-[#db2777]" size={16} />,
      desc: "banco de dados estruturado contendo milhares de questões da oab e concursos catalogadas por matéria, complexidade e justificativa jurídica.",
      tip: "consultas indexadas asseguram a filtragem imediata em tabelas de grande escala."
    },
    {
      id: "jq_stats",
      title: "atualizador de métricas",
      tech: "points & levels worker",
      icon: <Award className="text-[#db2777]" size={16} />,
      desc: "processa as respostas certas ou erradas, recalcula o score do usuário e despacha eventos para subir de nível e rank no painel.",
      tip: "lógica transacional previne fraudes de pontuação e envia logs para relatórios de progresso."
    }
  ];

  // 4. Data for DataGuard ETL Quality Pipeline
  const dataguardNodes = [
    {
      id: "dg_ingest",
      title: "upload & ingestão",
      tech: "etl file uploader (papaparse / pandas chunking)",
      icon: <UploadCloud className="text-[#2563eb]" size={16} />,
      desc: "o arquivo de dados (csv/xlsx) é carregado e particionado em blocos na memória para evitar gargalos em datasets de grande volume.",
      tip: "evita estouro de heap no node.js processando as linhas por fluxos de streaming."
    },
    {
      id: "dg_schema",
      title: "validador de regras de schema",
      tech: "pydantic / great expectations engine",
      icon: <ShieldCheck className="text-[#2563eb]" size={16} />,
      desc: "valida a tipagem de cada coluna, campos obrigatórios, faixas numéricas aceitáveis e formatos esperados de strings.",
      tip: "assegura conformidade com o dicionário de dados definido pela equipe de engenharia."
    },
    {
      id: "dg_split",
      title: "separador de fluxo (quarentena)",
      tech: "data splitting service",
      icon: <Layers className="text-[#2563eb]" size={16} />,
      desc: "registros conformes continuam no pipeline. registros com falha (nulos, duplicados, tipagem errada) são expurgados para uma tabela de quarentena.",
      tip: "permite auditar erros sem precisar abortar ou travar a carga do arquivo inteiro."
    },
    {
      id: "dg_score",
      title: "calculador de integridade",
      tech: "data health profiler",
      icon: <Cpu className="text-[#2563eb]" size={16} />,
      desc: "analisa a proporção de linhas saudáveis vs. quarentena para gerar o score de saúde geral, porcentagem de nulos e duplicatas.",
      tip: "calcula desvios estatísticos de volume comparado com cargas históricas."
    },
    {
      id: "dg_alerts",
      title: "despachante de alertas",
      tech: "slack / webhooks dispatcher",
      icon: <AlertTriangle className="text-[#2563eb]" size={16} />,
      desc: "se o score consolidado cair abaixo do limite crítico (ex: 50.0%), dispara alertas imediatos e notifica o painel de monitoramento.",
      tip: "bloqueia a promoção de dados corrompidos para o data warehouse de produção."
    }
  ];

  // Selected Nodes selector
  let currentNodes = motosysNodes;
  let accentColor = "border-[#ff4d1d] text-[#ff4d1d] bg-[#ff4d1d]/5";
  let hoverBorderColor = "hover:border-[#ff4d1d]/50";
  let pulsePingColor = "bg-[#ff4d1d]";
  let pulseBgColor = "bg-[#ff4d1d]";
  
  if (project === "conecta") {
    currentNodes = conectaNodes;
    accentColor = "border-[#7c3aed] text-[#7c3aed] bg-[#7c3aed]/5";
    hoverBorderColor = "hover:border-[#7c3aed]/50";
    pulsePingColor = "bg-[#7c3aed]";
    pulseBgColor = "bg-[#7c3aed]";
  } else if (project === "juriquest") {
    currentNodes = juriquestNodes;
    accentColor = "border-[#db2777] text-[#db2777] bg-[#db2777]/5";
    hoverBorderColor = "hover:border-[#db2777]/50";
    pulsePingColor = "bg-[#db2777]";
    pulseBgColor = "bg-[#db2777]";
  } else if (project === "dataguard") {
    currentNodes = dataguardNodes;
    accentColor = "border-[#2563eb] text-[#2563eb] bg-[#2563eb]/5";
    hoverBorderColor = "hover:border-[#2563eb]/50";
    pulsePingColor = "bg-[#2563eb]";
    pulseBgColor = "bg-[#2563eb]";
  }

  return (
    <div className="space-y-6 w-full lowercase font-mono">
      {/* Short Summary Block */}
      <div className="p-4 border border-[#ede7df] bg-white text-xs text-[#525252] leading-relaxed rounded-2xl shadow-sm">
        {project === "motosys" && (
          <p>
            esta arquitetura <strong>offline-first</strong> garante a operacionalidade da oficina mesmo em garagens subterrâneas ou áreas rurais sem sinal de celular. os dados fluem de forma unidirecional para o banco local e sincronizam sob demanda de forma transacional segura.
          </p>
        )}
        {project === "conecta" && (
          <p>
            pipeline de processamento de mídia escalável de <strong>ponta a ponta</strong>. permite streaming estável e protegido de cursos em vídeo, garantindo custo controlado através de processos serverless que só consomem computação durante o upload.
          </p>
        )}
        {project === "juriquest" && (
          <p>
            motor de gamificação orientado ao aprendizado contínuo. seleciona dinamicamente a próxima pergunta otimizada para o perfil do estudante, garantindo baixa latência de resposta por meio de camadas estruturadas de cache temporário.
          </p>
        )}
        {project === "dataguard" && (
          <p>
            pipeline de verificação de integridade de dados que funciona como um <strong>gatekeeper</strong>. impede a ingestão de registros com anomalias estruturais nos sistemas analíticos, minimizando bugs de bi e facilitando auditorias.
          </p>
        )}
      </div>

      {/* Grid containing Flow Chart and Side Details */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        {/* Flowchart Diagram (Left 3 columns) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] tracking-widest text-[#737373] block font-bold">
              {"// fluxo do sistema (clique para detalhar)"}
            </span>
            {selectedNode === null && (
              <span className="text-[9px] text-[#525252] bg-white border border-[#ede7df] px-2 py-0.5 animate-pulse rounded">
                selecione uma etapa para ver especificações
              </span>
            )}
          </div>

          <div className="space-y-3 relative">
            {currentNodes.map((node, index) => (
              <div key={node.id} className="flex flex-col items-center">
                {/* Node Card */}
                <button
                  onClick={() => {
                    const isNewSelect = node.id !== selectedNode;
                    setSelectedNode(isNewSelect ? node.id : null);
                    if (isNewSelect && typeof window !== "undefined" && window.innerWidth < 1024 && detailsRef.current) {
                      setTimeout(() => {
                        detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
                      }, 100);
                    }
                  }}
                  className={`w-full max-w-sm p-3.5 border text-left transition-all duration-300 relative group cursor-pointer rounded-xl ${
                    selectedNode === node.id 
                      ? `${accentColor} shadow-sm` 
                      : `bg-white border-[#ede7df] ${hoverBorderColor} hover:bg-[#fdfcfa]`
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#f5f0e9] border border-[#ede7df] flex items-center justify-center relative rounded-lg">
                      {node.icon}
                      {/* Pulse dot for onboarding UX suggestion on first node */}
                      {index === 0 && selectedNode === null && (
                        <span className="absolute -top-0.5 -right-0.5 flex h-1.5 w-1.5">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulsePingColor} opacity-75`}></span>
                          <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${pulseBgColor}`}></span>
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-[#0a0a0a] tracking-tight flex items-center gap-1.5">
                        {node.title}
                        {index === 0 && selectedNode === null && (
                          <span className="text-[8px] font-normal text-[#737373] uppercase border border-[#ede7df] px-1 bg-[#f5f0e9] rounded">
                            iniciar
                          </span>
                        )}
                      </div>
                      <div className="text-[9px] text-[#737373] mt-0.5 truncate">{node.tech}</div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                      selectedNode === node.id 
                        ? "border-current text-white bg-current/25" 
                        : "border-[#ede7df] text-[#737373] group-hover:border-[#d4d4d4]"
                    }`}>
                      {selectedNode === node.id ? (
                        <Check size={10} className="text-current" />
                      ) : (
                        <span className="w-1.5 h-1.5 bg-[#ede7df] rounded-full" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Connecting downward arrow (only between nodes) */}
                {index < currentNodes.length - 1 && (
                  <div className="h-6 flex flex-col items-center justify-center my-0.5 relative">
                    <div className="w-0.5 h-full bg-[#ede7df]" />
                    <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-r border-b border-[#ede7df] rotate-45" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected Node Technical Details (Right 2 columns) */}
        <div ref={detailsRef} className="lg:col-span-2 space-y-4 scroll-mt-6">
          <span className="text-[9px] tracking-widest text-[#737373] block font-bold">
            {"// especificações técnicas e desafios"}
          </span>

          <div className="p-5 border border-[#ede7df] bg-white min-h-[220px] lg:min-h-[300px] flex flex-col justify-between transition-all duration-300 rounded-2xl shadow-sm">
            {selectedNode ? (
              // If a node is selected, render details
              (() => {
                const node = currentNodes.find(n => n.id === selectedNode);
                if (!node) return null;
                return (
                  <div className="space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Title block */}
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#f5f0e9] border border-[#ede7df] flex items-center justify-center rounded-xl">
                          {node.icon}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-[#0a0a0a] leading-none">{node.title}</h4>
                          <span className="text-[9px] text-[#737373] block mt-1 uppercase tracking-wider bg-[#f5f0e9] px-1.5 py-0.5 border border-[#ede7df] w-fit rounded">
                            {node.tech}
                          </span>
                        </div>
                      </div>

                      {/* Detailed Description */}
                      <div className="space-y-2 text-xs">
                        <span className="text-[9px] text-[#737373] tracking-widest block font-bold">funcionamento</span>
                        <p className="text-[#525252] leading-relaxed">{node.desc}</p>
                      </div>
                    </div>

                    {/* Pro Tip/Engineering Highlight */}
                    <div className="p-3 bg-[#f5f0e9] border border-[#ede7df] space-y-1.5 mt-4 rounded-xl">
                      <span className="text-[9px] font-bold text-[#737373] uppercase flex items-center gap-1">
                        <HelpCircle size={10} className="text-[#737373]" /> destaque de engenharia
                      </span>
                      <p className="text-[10px] text-[#737373] leading-relaxed">{node.tip}</p>
                    </div>
                  </div>
                );
              })()
            ) : (
              // Empty selection state
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-10 h-10 border border-[#ede7df] bg-[#f5f0e9] flex items-center justify-center text-[#737373] rounded-full">
                  <HelpCircle size={16} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#a3a3a3]">nenhum nó selecionado</h4>
                  <p className="text-[10px] text-[#737373] max-w-[200px] leading-relaxed">
                    clique em qualquer uma das etapas do diagrama de fluxo de dados ao lado para ver explicações de engenharia e escolhas de design técnico.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
