
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Cross, Loader2, Star, Quote, Heart, ChevronRight, User as UserIcon } from 'lucide-react';
import { VirtueProfile, QuizResult } from '../types';
import { generateQuizEncouragement, generateQuizDiagnostic } from '../services/geminiService';

interface Question {
  id: number;
  text: string;
  imageUrl: string;
  options: { text: string; profile: VirtueProfile }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Quando surge um deserto na sua vida, qual seu primeiro impulso?",
    imageUrl: "https://images.unsplash.com/photo-1509316785289-025f54846b73?q=80&w=1200&auto=format&fit=crop",
    options: [
      { text: "Buscar entender o porquê na fé", profile: "Sabedoria" },
      { text: "Tentar resolver logo através do trabalho", profile: "Ação" },
      { text: "Buscar refúgio no silêncio interior", profile: "Contemplação" },
      { text: "Entregar-se totalmente à vontade de Deus", profile: "Fé" }
    ]
  },
  {
    id: 2,
    text: "Na sua oração diária, você prefere...",
    imageUrl: "https://images.unsplash.com/photo-1544427928-c49cdfebf194?q=80&w=1200&auto=format&fit=crop",
    options: [
      { text: "Ler e estudar a vida dos santos", profile: "Sabedoria" },
      { text: "Oferecer suas tarefas como sacrifício", profile: "Ação" },
      { text: "Ficar em silêncio absoluto diante de Deus", profile: "Contemplação" },
      { text: "Conversar com intimidade com o Senhor", profile: "Fé" }
    ]
  },
  {
    id: 3,
    text: "O que mais te atrai na vida espiritual?",
    imageUrl: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?q=80&w=1200&auto=format&fit=crop",
    options: [
      { text: "A verdade profunda da teologia", profile: "Sabedoria" },
      { text: "A força para ajudar o próximo", profile: "Ação" },
      { text: "A paz que o mundo não pode dar", profile: "Contemplação" },
      { text: "A beleza da entrega e da confiança", profile: "Fé" }
    ]
  },
  {
    id: 4,
    text: "Como você descreveria seu coração neste momento?",
    imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
    options: [
      { text: "Em busca de respostas e luz", profile: "Sabedoria" },
      { text: "Pronto para a batalha espiritual", profile: "Ação" },
      { text: "Cansado e em busca de repouso no Pai", profile: "Contemplação" },
      { text: "Esperançoso apesar das dores", profile: "Fé" }
    ]
  }
];

const FEEDBACK_IMAGE = "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop";

interface QuizFunnelProps {
  onComplete: (result: QuizResult, userName: string) => void;
}

export const QuizFunnel: React.FC<QuizFunnelProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'intro' | 'questions' | 'lead' | 'loading'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<VirtueProfile[]>([]);
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [leadName, setLeadName] = useState('');

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = async (profile: VirtueProfile) => {
    const newAnswers = [...userAnswers, profile];
    setUserAnswers(newAnswers);

    if (newAnswers.length === 2 || newAnswers.length === 4) {
      setIsAiThinking(true);
      const feedbackRes = await generateQuizEncouragement(newAnswers);
      setAiFeedback(feedbackRes.message);
      setIsAiThinking(false);
      
      setTimeout(() => {
        if (newAnswers.length === 4) {
          setAiFeedback(null);
          setStep('lead');
        } else {
          setAiFeedback(null);
          setCurrentQuestionIndex(prev => prev + 1);
        }
      }, 4000);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (leadName.trim()) {
      generateFinalResult(userAnswers);
    }
  };

  const generateFinalResult = async (answers: VirtueProfile[]) => {
    setStep('loading');
    const counts = answers.reduce((acc, profile) => {
      acc[profile] = (acc[profile] || 0) + 1;
      return acc;
    }, {} as Record<VirtueProfile, number>);

    const dominantProfile = (Object.keys(counts) as VirtueProfile[]).sort((a, b) => counts[b] - counts[a])[0];
    const diagnosticRes = await generateQuizDiagnostic(dominantProfile, answers);
    
    // Pequeno delay para garantir que o usuário veja a animação de carregamento (psicologia do esforço)
    setTimeout(() => {
      if (diagnosticRes) {
        onComplete({
          profile: dominantProfile,
          ...diagnosticRes
        }, leadName);
      }
    }, 4500);
  };

  if (step === 'intro') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-stone-50 overflow-hidden relative selection:bg-amber-100">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(245,158,11,0.1)_0%,_rgba(255,255,255,0)_70%)]"></div>
          <div className="cloud-layer opacity-5"></div>
        </div>
        
        <div className="max-w-2xl w-full bg-white rounded-[4rem] p-10 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-amber-100 relative z-10 text-center animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="bg-amber-50 w-24 h-24 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 border border-amber-100 shadow-inner rotate-3">
            <Sparkles className="w-12 h-12 text-amber-600 animate-pulse" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black font-serif italic text-stone-900 mb-8 leading-tight text-shadow-elegant">
            Descubra sua Virtude Predominante
          </h2>
          
          <p className="text-stone-500 text-lg md:text-2xl font-light leading-relaxed mb-12 max-w-lg mx-auto">
            A Quaresma é o tempo de conhecer o próprio coração. Antes de entrar no deserto, entenda qual <span className="text-amber-700 font-bold">arma espiritual</span> Deus te deu para esta batalha.
          </p>

          <button
            onClick={() => setStep('questions')}
            className="group w-full bg-stone-900 hover:bg-black text-white py-7 rounded-[2rem] font-black uppercase tracking-[0.4em] text-[14px] shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4"
          >
            Iniciar meu Diagnóstico
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <p className="mt-8 text-[10px] uppercase font-black tracking-widest text-stone-300">
            Passo 1: Elevação de Consciência
          </p>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-stone-50">
        <div className="max-w-2xl w-full">
          <div className="mb-8 flex items-center justify-between px-6">
            <div className="flex gap-3">
              {questions.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-2 w-16 rounded-full transition-all duration-700 ${i <= currentQuestionIndex ? 'bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-stone-200'}`}
                />
              ))}
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-stone-400">Estação {currentQuestionIndex + 1}/4</span>
          </div>

          <div className="bg-white rounded-[4rem] shadow-2xl border border-stone-100 relative overflow-hidden min-h-[650px] flex flex-col animate-in fade-in zoom-in-95 duration-700">
            {aiFeedback ? (
              <div className="flex flex-col h-full items-center justify-center text-center p-10 md:p-20 bg-stone-900 text-white relative">
                <div className="absolute inset-0 z-0">
                  <img src={FEEDBACK_IMAGE} className="w-full h-full object-cover opacity-20" alt="Reflexão" />
                </div>
                <div className="relative z-10 space-y-10">
                  <div className="bg-white/10 backdrop-blur-md w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border border-white/20">
                     <Quote className="w-12 h-12 text-amber-400" />
                  </div>
                  <p className="text-3xl md:text-5xl font-serif italic leading-relaxed font-bold px-4 max-w-xl mx-auto">
                    "{aiFeedback}"
                  </p>
                  <div className="flex flex-col items-center gap-4 pt-6">
                     <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                     <p className="text-[10px] uppercase font-black tracking-[0.5em] text-white/40">Sintonizando sabedoria...</p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="h-64 md:h-80 relative overflow-hidden shrink-0">
                  <img 
                    src={currentQuestion.imageUrl} 
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-[10s] ease-linear" 
                    alt="Cenário Espiritual" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-xl">
                      <Sparkles className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </div>

                <div className="p-10 md:p-16 space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                  <h3 className="text-3xl md:text-5xl font-serif font-black text-stone-900 leading-[1.2]">
                    {currentQuestion.text}
                  </h3>

                  <div className="grid gap-5">
                    {currentQuestion.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(option.profile)}
                        disabled={isAiThinking}
                        className="group flex items-center justify-between p-8 rounded-[2.5rem] border-2 border-stone-100 hover:border-amber-500 hover:bg-amber-50 transition-all text-left active:scale-[0.98] disabled:opacity-50"
                      >
                        <span className="text-xl text-stone-700 font-medium group-hover:text-amber-900 transition-colors">{option.text}</span>
                        <div className="bg-stone-50 p-2 rounded-full group-hover:bg-amber-100 transition-colors">
                          <ChevronRight className="w-6 h-6 text-stone-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'lead') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(16,185,129,0.05)_0%,_rgba(255,255,255,0)_70%)]"></div>
        </div>
        
        <div className="max-w-xl w-full bg-white rounded-[4rem] p-10 md:p-16 shadow-2xl border border-emerald-100 relative z-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 text-center">
          <div className="text-center mb-10">
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 shadow-inner">
              <UserIcon className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-black font-serif italic text-stone-900 mb-4">Seu Diagnóstico está Pronto!</h2>
            <p className="text-stone-500 font-light leading-relaxed max-w-sm mx-auto">
              Analisamos suas respostas e identificamos uma inclinação poderosa em sua alma. Como devemos te chamar no seu relatório profético?
            </p>
          </div>

          <form onSubmit={handleLeadSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] uppercase font-black tracking-[0.3em] text-stone-400 ml-4">Seu Nome ou Apelido</label>
              <input
                type="text"
                required
                value={leadName}
                onChange={(e) => setLeadName(e.target.value)}
                placeholder="Ex: João, Maria..."
                className="w-full px-8 py-5 rounded-3xl border-2 border-stone-100 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 outline-none transition-all text-lg font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 rounded-3xl font-black uppercase tracking-[0.4em] text-[13px] shadow-[0_20px_40px_rgba(16,185,129,0.2)] transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-4"
            >
              Revelar meu Perfil na LP
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <p className="text-[9px] text-center uppercase font-black tracking-widest text-stone-300">
              Passo Final: O Mapa da sua Conversão
            </p>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-stone-950 text-white">
        <div className="max-w-md w-full text-center space-y-16">
          <div className="relative">
            <div className="w-32 h-32 border-2 border-amber-500/20 rounded-full mx-auto animate-ping opacity-20"></div>
            <Cross className="w-16 h-16 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          
          <div className="space-y-6">
            <h4 className="text-3xl font-serif italic font-bold">Invocando Sabedoria para {leadName}...</h4>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 animate-progress"></div>
            </div>
          </div>

          <div className="bg-white/5 p-10 rounded-[3rem] border border-white/10 animate-pulse">
            <p className="text-stone-300 text-lg italic font-light leading-relaxed">
              "Fizeste-nos para Ti e o nosso coração está inquieto enquanto não repousar em Ti."
            </p>
            <span className="text-[10px] uppercase tracking-[0.4em] font-black mt-6 block text-amber-600/60">— Santo Agostinho</span>
          </div>
        </div>
        <style>{`
          @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
          .animate-progress { animation: progress 4.5s linear forwards; }
        `}</style>
      </div>
    );
  }

  return null;
};
