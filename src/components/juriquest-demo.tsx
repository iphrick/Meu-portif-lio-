"use client";

import React, { useState } from "react";
import { 
  Scale, 
  Gavel, 
  FileText, 
  Briefcase, 
  Landmark, 
  ShieldCheck, 
  Award, 
  Heart, 
  HelpCircle, 
  RefreshCw, 
  Settings,
  Sparkles,
  CheckCircle2,
  XCircle,
  Play
} from "lucide-react";

interface JuriQuestDemoProps {
  onBackToPortfolio?: () => void;
}

interface Question {
  id: string;
  subject: string;
  questionText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export default function JuriQuestDemo({ onBackToPortfolio }: JuriQuestDemoProps) {
  const [activeSubject, setActiveSubject] = useState("CONSTITUCIONAL");
  const [level, setLevel] = useState(3);
  const [points, setPoints] = useState(200);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // Database of legal questions for the simulation
  const questionsDatabase: Record<string, Question> = {
    CONSTITUCIONAL: {
      id: "q_const",
      subject: "CONSTITUCIONAL",
      questionText: "Qual das opções representa um direito fundamental social previsto expressamente na Constituição de 1988?",
      options: [
        "Propriedade privada de bens de consumo",
        "Moradia e alimentação",
        "Liberdade plena de locomoção nacional",
        "Direito de herança e legítima defesa"
      ],
      correctIndex: 1,
      explanation: "A moradia e a alimentação são direitos sociais expressamente elencados no Art. 6º da Constituição Federal de 1988, enquanto os demais são direitos individuais previstos no Art. 5º."
    },
    PENAL: {
      id: "q_penal",
      subject: "PENAL",
      questionText: "De acordo com o Código Penal Brasileiro, considera-se em estado de legítima defesa quem:",
      options: [
        "Repele injusta agressão, atual ou iminente, a direito seu ou de outrem, usando moderadamente dos meios necessários",
        "Pratica o fato criminoso para salvar de perigo atual direito próprio ou alheio de ameaça inevitável",
        "Comete o fato típico sob coação moral irresistível de terceiro",
        "Age sob estrita obediência a ordem manifestamente legal de superior hierárquico"
      ],
      correctIndex: 0,
      explanation: "A legítima defesa está definida no Art. 25 do CP: repelir injusta agressão, atual ou iminente, a direito próprio ou alheio, usando moderadamente os meios necessários."
    },
    CIVIL: {
      id: "q_civil",
      subject: "CIVIL",
      questionText: "A emancipação voluntária por concessão dos pais, para menor de idade civil com no mínimo dezesseis anos completos, ocorre por:",
      options: [
        "Casamento civil homologado pelo Ministério Público",
        "Colação de grau em ensino superior oficial",
        "Instrumento público, independentemente de homologação judicial",
        "Sentença judicial obrigatória após audiência de tutela"
      ],
      correctIndex: 2,
      explanation: "Segundo o Art. 5º, parágrafo único, inciso I do Código Civil, a emancipação voluntária ocorre por outorga dos pais mediante instrumento público, sem necessidade de homologação judicial."
    },
    TRABALHO: {
      id: "q_trab",
      subject: "TRABALHO",
      questionText: "De acordo com as regras gerais da CLT, a duração normal do trabalho poderá ser acrescida de horas suplementares mediante acordo escrito, limitando-se a:",
      options: [
        "No máximo 1 hora extra diária",
        "No máximo 2 horas extras diárias",
        "No máximo 3 horas extras diárias",
        "No máximo 4 horas extras diárias"
      ],
      correctIndex: 1,
      explanation: "O Art. 59 da CLT estipula que a jornada diária normal pode ser acrescida de no máximo 2 horas extras, mediante acordo individual, convenção ou acordo coletivo."
    },
    ADMINISTRATIVO: {
      id: "q_admin",
      subject: "ADMINISTRATIVO",
      questionText: "O princípio da administração pública que veda a promoção pessoal de agentes públicos em publicidade de obras ou serviços é o da:",
      options: [
        "Legalidade estrita",
        "Impessoalidade",
        "Moralidade administrativa",
        "Eficiência operacional"
      ],
      correctIndex: 1,
      explanation: "O princípio da Impessoalidade, regulado no Art. 37, § 1º da CF, estabelece que a publicidade governamental deve ter caráter educativo/informativo e não pode conter símbolos ou imagens que caracterizem promoção pessoal."
    },
    TRIBUTÁRIO: {
      id: "q_trib",
      subject: "TRIBUTÁRIO",
      questionText: "A imunidade tributária que impede a instituição de impostos sobre templos de qualquer culto é classificada pela doutrina como uma imunidade:",
      options: [
        "Subjetiva ou pessoal",
        "Objetiva ou real",
        "Mista de caráter compulsório",
        "Condicionada a contraprestação estadual"
      ],
      correctIndex: 0,
      explanation: "A imunidade aos templos de qualquer culto (Art. 150, VI, 'b' da CF) é classificada como subjetiva (ou pessoal), pois foca na qualidade do sujeito (instituição religiosa) e não no bem tributado."
    },
    PREVIDÊNCIA: {
      id: "q_prev",
      subject: "PREVIDÊNCIA",
      questionText: "O período de carência regular exigido para a concessão do benefício previdenciário de auxílio por incapacidade temporária (antigo auxílio-doença) comum é de:",
      options: [
        "6 contribuições mensais",
        "10 contribuições mensais",
        "12 contribuições mensais",
        "18 contribuições mensais"
      ],
      correctIndex: 2,
      explanation: "De acordo com o Art. 25, I da Lei 8.213/91, a carência exigida para a incapacidade temporária é de 12 contribuições mensais, exceto em casos de acidentes ou doenças profissionais específicas."
    },
    BENEFÍCIOS: {
      id: "q_benef",
      subject: "BENEFÍCIOS",
      questionText: "Qual benefício da assistência social (BPC/LOAS) garante um salário mínimo mensal à pessoa portadora de deficiência e ao idoso que comprovem não possuir meios de subsistência?",
      options: [
        "Aposentadoria especial por invalidez",
        "Benefício de Prestação Continuada (BPC)",
        "Auxílio de inclusão profissional continuada",
        "Pensão assistencial alimentícia vitalícia"
      ],
      correctIndex: 1,
      explanation: "O Benefício de Prestação Continuada (BPC), regulamentado pela LOAS (Lei 8.742/93), garante um salário mínimo ao idoso acima de 65 anos ou pessoa com deficiência em situação de vulnerabilidade."
    }
  };

  const activeQuestion = questionsDatabase[activeSubject];

  const handleGenerateQuestion = () => {
    setShowQuestion(true);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  };

  const handleSelectAnswer = (index: number) => {
    if (answerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || answerSubmitted) return;
    setAnswerSubmitted(true);
    
    if (selectedAnswer === activeQuestion.correctIndex) {
      const newPoints = points + 50;
      setPoints(newPoints);
      if (newPoints >= 350 && level === 3) {
        setLevel(4);
      }
    } else {
      setPoints(Math.max(0, points - 20));
    }
  };

  const handleReset = () => {
    setLevel(3);
    setPoints(200);
    setShowQuestion(false);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  };

  const subjects = [
    { name: "CONSTITUCIONAL", icon: <Scale size={11} /> },
    { name: "PENAL", icon: <Gavel size={11} /> },
    { name: "CIVIL", icon: <FileText size={11} /> },
    { name: "TRABALHO", icon: <Briefcase size={11} /> },
    { name: "ADMINISTRATIVO", icon: <Landmark size={11} /> },
    { name: "TRIBUTÁRIO", icon: <Briefcase size={11} /> },
    { name: "PREVIDÊNCIA", icon: <ShieldCheck size={11} /> },
    { name: "BENEFÍCIOS", icon: <Award size={11} /> },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-[#ede7df] relative min-h-[600px] flex flex-col text-[#525252] font-mono lowercase rounded-2xl shadow-sm overflow-hidden">
      
      {/* Simulation Watermark Bar - Stōkt Style */}
      <div className="bg-[#fdfcfa] border-b border-[#ede7df] px-4 py-2 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#db2777]" />
          <span className="text-[10px] tracking-wider text-[#737373]">
            {"[ambiente de simulação interativa: juriquest]"}
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

      {/* Main Study Game Container */}
      <div className="flex-1 flex flex-col p-6 space-y-6 z-10">
        {/* Top Navbar replica */}
        <div className="flex items-center justify-between border-b border-[#ede7df] pb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#fdfcfa] border border-[#ede7df] flex items-center justify-center text-[#db2777]">
              <Scale size={14} />
            </div>
            <span className="font-bold text-base text-[#0a0a0a] tracking-tight">juriquest</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] tracking-wider font-semibold">
            <span className="text-[#737373] hover:text-[#0a0a0a] transition-colors cursor-pointer">{"[menu principal]"}</span>
            <div className="w-8 h-8 rounded-lg border border-[#ede7df] bg-[#fdfcfa] flex items-center justify-center p-0.5">
              <div className="w-full h-full rounded bg-[#db2777] text-white flex items-center justify-center font-bold text-[9px]">
                oab
              </div>
            </div>
          </div>
        </div>

        {/* Subjects & Controls Row */}
        <div className="p-4 border border-[#ede7df] bg-[#fdfcfa] rounded-2xl space-y-4">
          <span className="text-[9px] tracking-widest text-[#737373] block font-bold">
            {"// matéria atual"}
          </span>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Scrollable Categories Grid */}
            <div className="flex flex-wrap gap-2">
              {subjects.map(sub => (
                <button
                  key={sub.name}
                  onClick={() => {
                    setActiveSubject(sub.name);
                    setShowQuestion(false);
                    setSelectedAnswer(null);
                    setAnswerSubmitted(false);
                  }}
                  className={`px-3 py-1.5 border text-[10px] flex items-center gap-2 transition-all cursor-pointer rounded-xl ${
                    activeSubject === sub.name
                      ? "bg-[#db2777] text-white border-[#db2777] font-bold shadow-sm"
                      : "bg-white border-[#ede7df] text-[#737373] hover:text-[#0a0a0a] hover:border-[#ff4d1d]/40"
                  }`}
                >
                  {sub.icon}
                  <span className="tracking-wide">{sub.name}</span>
                </button>
              ))}
            </div>

            {/* Simulation controls */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleGenerateQuestion}
                className="bg-[#db2777] hover:bg-[#c2185b] text-white text-[10px] font-bold py-2 px-4 flex items-center gap-1.5 transition-all cursor-pointer uppercase rounded-xl shadow-sm"
              >
                <Sparkles size={11} /> gerar nível {level}
              </button>
              <button
                onClick={handleReset}
                className="bg-white border border-[#ede7df] hover:bg-[#f5f0e9] text-[#737373] text-[10px] py-2 px-4 flex items-center gap-1.5 transition-colors cursor-pointer uppercase rounded-xl"
              >
                <RefreshCw size={11} /> resetar
              </button>
              <button className="p-2 bg-white border border-[#ede7df] text-[#737373] hover:text-[#0a0a0a] hover:bg-[#f5f0e9] transition-colors cursor-pointer rounded-xl">
                <Settings size={11} />
              </button>
            </div>
          </div>

          {/* Gamification Stats */}
          <div className="flex items-center gap-6 pt-2 text-[10px] border-t border-[#ede7df]">
            <div className="flex items-center gap-2 bg-[#f5f0e9] px-3 py-1 border border-[#ede7df] rounded-lg">
              <span className="text-[#737373] tracking-widest text-[8px] font-bold">nível:</span>
              <span className="text-[#db2777] font-bold">{level}</span>
            </div>
            <div className="flex items-center gap-2 bg-[#f5f0e9] px-3 py-1 border border-[#ede7df] rounded-lg">
              <span className="text-[#737373] tracking-widest text-[8px] font-bold">pontos:</span>
              <span className="text-[#0a0a0a] font-bold">{points}</span>
            </div>
          </div>
        </div>

        {/* Content Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Question / Simulation Panel (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            {showQuestion ? (
              <div className="p-5 border border-[#ede7df] bg-white rounded-2xl shadow-sm space-y-6">
                
                {/* Question Text */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] bg-[#db2777]/10 border border-[#db2777]/20 text-[#db2777] font-bold px-2 py-0.5 rounded">
                      questão de simulação
                    </span>
                    <span className="text-[9px] text-[#737373]">matéria: {activeSubject}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0a0a0a] leading-relaxed">
                    {activeQuestion.questionText}
                  </h3>
                </div>

                {/* Multiple choice options */}
                <div className="space-y-2.5">
                  {activeQuestion.options.map((option, idx) => {
                    const optionLetter = String.fromCharCode(65 + idx); // A, B, C, D
                    
                    let optionStyle = "border-[#ede7df] bg-[#fdfcfa] hover:bg-[#ede7df]/30 hover:border-[#ede7df]/80 text-[#525252]";
                    if (selectedAnswer === idx) {
                      optionStyle = "border-[#db2777] text-[#db2777] bg-[#db2777]/5";
                    }
                    if (answerSubmitted) {
                      if (idx === activeQuestion.correctIndex) {
                        optionStyle = "border-emerald-500 bg-emerald-50 text-emerald-700";
                      } else if (selectedAnswer === idx) {
                        optionStyle = "border-red-500 bg-red-50 text-red-700";
                      } else {
                        optionStyle = "border-[#ede7df]/50 opacity-40 text-[#a3a3a3]";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(idx)}
                        disabled={answerSubmitted}
                        className={`w-full p-3.5 border text-left text-xs transition-all flex gap-3 items-center cursor-pointer rounded-xl ${optionStyle}`}
                      >
                        <span className={`w-5 h-5 flex items-center justify-center text-[10px] font-bold border rounded-lg ${
                          selectedAnswer === idx 
                            ? "bg-[#db2777] text-white border-[#db2777]"
                            : answerSubmitted && idx === activeQuestion.correctIndex
                            ? "bg-emerald-500 text-white border-emerald-500"
                            : "bg-[#f5f0e9] text-[#737373] border-[#ede7df]"
                        }`}>
                          {optionLetter}
                        </span>
                        <span className="flex-1 font-medium">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Action Submit / Explanation Panel */}
                <div className="pt-2">
                  {!answerSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedAnswer === null}
                      className="w-full bg-[#db2777] hover:bg-[#c2185b] text-white text-xs font-bold py-3 px-4 flex items-center justify-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase rounded-xl"
                    >
                      confirmar resposta <Play size={10} className="fill-current" />
                    </button>
                  ) : (
                    // Feedback card
                    <div className="p-4 bg-[#fdfcfa] border border-[#ede7df] rounded-2xl space-y-3">
                      <div className="flex items-center gap-2">
                        {selectedAnswer === activeQuestion.correctIndex ? (
                          <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold uppercase">
                            <CheckCircle2 size={14} /> resposta correta! (+50 pts)
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-red-600 text-xs font-bold uppercase">
                            <XCircle size={14} /> resposta incorreta (-20 pts)
                          </div>
                        )}
                      </div>
                      <p className="text-[11px] text-[#737373] leading-relaxed">
                        <strong className="text-[#525252]">justificativa:</strong> {activeQuestion.explanation}
                      </p>
                      <button
                        onClick={handleGenerateQuestion}
                        className="mt-2 text-xs font-bold text-[#db2777] hover:text-[#c2185b] flex items-center gap-1 cursor-pointer"
                      >
                        próxima questão &rarr;
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              // Empty study state
              <div className="p-8 border border-[#ede7df] bg-[#fdfcfa] text-center space-y-4 min-h-[300px] flex flex-col items-center justify-center rounded-2xl">
                <div className="w-12 h-12 border border-[#ede7df] bg-white flex items-center justify-center text-[#db2777] mx-auto rounded-full">
                  <HelpCircle size={20} />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <h4 className="text-sm font-bold text-[#0a0a0a]">pronto para testar seu conhecimento?</h4>
                  <p className="text-[11px] text-[#737373] leading-relaxed">
                    selecione uma das matérias jurídicas acima e clique em <strong>gerar nível {level}</strong> para simular a resposta de um questionário real do juriquest!
                  </p>
                </div>
                <button
                  onClick={handleGenerateQuestion}
                  className="bg-[#db2777] hover:bg-[#c2185b] text-white text-xs font-bold py-2.5 px-5 flex items-center gap-1.5 transition-all cursor-pointer uppercase rounded-xl"
                >
                  iniciar simulado
                </button>
              </div>
            )}
          </div>

          {/* Support / Help card (1 column) */}
          <div className="space-y-4">
            <span className="text-[9px] tracking-widest text-[#737373] block font-bold">
              {"// apoiar o projeto"}
            </span>

            {/* Donation UI Card mockup */}
            <div className="p-5 border border-[#ede7df] bg-[#fdfcfa] text-center space-y-4 flex flex-col justify-between min-h-[300px] rounded-2xl shadow-sm">
              <div className="space-y-3">
                {/* Heart badge */}
                <div className="w-10 h-10 border border-[#ede7df] bg-white flex items-center justify-center text-emerald-500 mx-auto rounded-full">
                  <Heart size={16} className="fill-current" />
                </div>

                <h3 className="text-sm font-bold text-[#0a0a0a] tracking-tight">
                  apoie o projeto, <br />
                  <span className="text-emerald-600">sua ajuda</span> nos motiva a melhorar.
                </h3>

                <p className="text-[11px] text-[#737373] leading-relaxed max-w-[190px] mx-auto">
                  o juriquest é gratuito e independente. contribua para mantermos o projeto ativo e em constante evolução.
                </p>
              </div>

              {/* Support button link */}
              <button 
                onClick={() => alert("simulação: redirecionando para página de apoio (chave pix / crowdfunding).")}
                className="w-full bg-[#0a0a0a] hover:bg-[#262626] text-white font-bold py-2.5 text-xs transition-colors cursor-pointer uppercase rounded-xl"
              >
                apoiar juriquest
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
