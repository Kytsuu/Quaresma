
import React, { useState, useEffect } from 'react';
import { User, AppState, DayNote, QuizResult } from './types';
import { LandingPage } from './components/LandingPage';
import { QuizFunnel } from './components/QuizFunnel';
import { DayGrid } from './components/DayGrid';
import { ContentModal } from './components/ContentModal';
import { DailyReflection } from './components/DailyReflection';
import { MotivationSection } from './components/MotivationSection';
import { AboutModal } from './components/AboutModal';
import { WelcomeModal } from './components/WelcomeModal';
import { BibleShareModal } from './components/BibleShareModal';
import { SettingsModal } from './components/SettingsModal';
import { BonusFunnelModal } from './components/BonusFunnelModal';
import { CandleModal } from './components/CandleModal';
import { Cross, Calendar, BookOpen, Sparkles, Info, Settings, Gift, Flame } from 'lucide-react';

const STORAGE_KEY = 'quaresma_app_state_v5';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Erro ao carregar banco de dados local", e);
      }
    }
    return {
      user: null,
      completedDays: [],
      selectedDay: null,
      lastCompletionTimestamp: null,
      dayNotes: {},
      quizResult: null,
    };
  });

  // Controle de Visualização
  // Se não tem usuário, o fluxo SEMPRE começa no Quiz
  const [view, setView] = useState<'quiz' | 'landing' | 'app'>(() => {
    if (state.user) return 'app';
    return 'quiz';
  });

  const [showAbout, setShowAbout] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showBibleShare, setShowBibleShare] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [showCandle, setShowCandle] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const handleQuizComplete = (quizResult: QuizResult, userName: string) => {
    // Ao completar o quiz e fornecer o nome na página de lead, salvamos o resultado
    // Mas ainda não criamos o usuário completo até passar pela LP
    setState(prev => ({ 
      ...prev, 
      quizResult,
      // Temporariamente guardamos o nome para criar o usuário depois da LP
      user: prev.user ? prev.user : { name: userName, startDate: new Date().toISOString() }
    }));
    setView('landing');
  };

  const handleStartFromLP = () => {
    // Ao clicar para começar na LP, o usuário já foi "capturado" no Quiz
    setView('app');
    setShowWelcome(true);
  };

  const handleSelectDay = (day: number) => {
    setState(prev => ({ ...prev, selectedDay: day }));
  };

  const handleCompleteDay = (day: number, notes: DayNote) => {
    setState(prev => {
      const isAlreadyCompleted = prev.completedDays.includes(day);
      const newCompletedDays = isAlreadyCompleted ? prev.completedDays : [...prev.completedDays, day];
      
      return {
        ...prev,
        completedDays: newCompletedDays,
        lastCompletionTimestamp: isAlreadyCompleted ? prev.lastCompletionTimestamp : Date.now(),
        dayNotes: {
          ...prev.dayNotes,
          [day]: notes
        }
      };
    });
  };

  // Fluxo de entrada
  if (view === 'quiz') {
    return <QuizFunnel onComplete={handleQuizComplete} />;
  }

  if (view === 'landing') {
    return <LandingPage onStart={handleStartFromLP} quizResult={state.quizResult} />;
  }

  // Dashboard Principal
  const progress = Math.round((state.completedDays.length / 40) * 100);
  const currentDevotionalDay = state.completedDays.length + 1 <= 40 ? state.completedDays.length + 1 : 40;

  return (
    <div className="min-h-screen pb-40 selection:bg-purple-200">
      {/* Header Section */}
      <header className="relative text-stone-900 pt-16 md:pt-24 pb-24 md:pb-40 overflow-hidden px-4">
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center mb-10 md:mb-14">
            <div className="bg-white/70 backdrop-blur-md p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] border border-white/80 shadow-2xl mb-6 md:mb-10 transform hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 md:w-12 md:h-12 text-yellow-600" />
            </div>
            <span className="uppercase tracking-[0.5em] text-[10px] md:text-[12px] font-black text-purple-900 mb-6 bg-white/50 backdrop-blur-md px-6 py-1.5 rounded-full border border-white/30 shadow-sm">
              IA Ativa: Nível Pro
            </span>
            <h1 className="text-4xl md:text-8xl font-black mb-8 md:mb-12 font-serif italic text-stone-900 leading-tight text-shadow-elegant">
              A sua Abençoada Quaresma
            </h1>
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-2xl px-8 md:px-14 py-4 md:py-6 rounded-[2.5rem] md:rounded-[4rem] border border-white shadow-xl">
              <p className="text-lg md:text-3xl text-stone-700 font-medium">
                Paz de Cristo, <span className="font-black text-purple-900 italic text-shadow-golden">{state.user?.name}</span>.
              </p>
            </div>
          </div>

          <div className="max-w-xs md:max-w-md mx-auto mt-12 md:mt-16 bg-white/90 backdrop-blur-3xl p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] border border-white shadow-2xl relative group">
            <div className="absolute -top-3 -left-3 bg-purple-700 text-white p-2.5 rounded-full shadow-xl group-hover:rotate-12 transition-transform">
              <Cross className="w-4 h-4" />
            </div>
            <div className="flex justify-between items-end mb-5 md:mb-7">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-800">Seu Progresso</span>
              <span className="text-4xl md:text-6xl font-serif font-black text-purple-950">{progress}%</span>
            </div>
            <div className="w-full h-5 md:h-7 bg-stone-100 rounded-full overflow-hidden border-2 border-stone-200 p-1.5">
              <div 
                className="h-full bg-gradient-to-r from-purple-800 via-purple-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out shadow-inner"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
        <DailyReflection day={currentDevotionalDay} />

        <div className="bg-white/95 backdrop-blur-[40px] rounded-[3rem] md:rounded-[5rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] p-8 md:p-20 border border-white/50">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-12 md:mb-20 border-b border-stone-200/50 pb-10 md:pb-14 text-center md:text-left">
            <div className="bg-gradient-to-br from-purple-700 to-indigo-950 p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-2xl border-4 border-white shrink-0">
              <Calendar className="w-8 h-8 md:w-14 md:h-14 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-5xl font-bold text-stone-900 font-serif leading-tight">Estações do Coração</h2>
              <p className="text-sm md:text-xl text-stone-500 font-light italic mt-1 md:mt-2">"40 dias de renovação e fé"</p>
            </div>
          </div>

          <DayGrid 
            completedDays={state.completedDays} 
            onSelectDay={handleSelectDay} 
            lastCompletion={state.lastCompletionTimestamp}
          />

          <MotivationSection completedCount={state.completedDays.length} />
        </div>
      </main>

      {/* Footer Nav Celestial */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] md:w-fit bg-white/95 backdrop-blur-3xl border border-white/80 p-4 md:p-6 rounded-[2.5rem] md:rounded-[4rem] flex justify-center items-center shadow-[0_30px_60px_rgba(0,0,0,0.2)] z-40">
        <div className="flex items-center justify-around md:justify-center gap-4 md:gap-10 w-full md:px-8">
          <div 
            onClick={() => setShowBibleShare(true)}
            className="flex flex-col items-center text-stone-400 cursor-pointer hover:text-purple-700 transition-all p-2 group"
          >
            <BookOpen className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] md:text-[10px] uppercase font-black mt-2 tracking-widest">Palavra</span>
          </div>

          <div 
            onClick={() => setShowCandle(true)}
            className="flex flex-col items-center text-amber-500 cursor-pointer hover:text-amber-600 transition-all p-2 group"
          >
            <Flame className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] md:text-[10px] uppercase font-black mt-2 tracking-widest">Vela</span>
          </div>
          
          <div 
            onClick={() => setShowBonus(true)}
            className="flex flex-col items-center text-stone-400 cursor-pointer hover:text-amber-700 transition-all p-2 group relative"
          >
            <Gift className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform animate-pulse" />
            <span className="text-[8px] md:text-[10px] uppercase font-black mt-2 tracking-widest">Bônus</span>
          </div>

          <div 
            onClick={() => {
              const maxCompleted = state.completedDays.length > 0 ? Math.max(...state.completedDays) : 0;
              if (maxCompleted < 40) handleSelectDay(maxCompleted + 1);
            }}
            className="bg-gradient-to-b from-purple-800 to-black w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-2xl border-4 border-white shrink-0 active:scale-90 transition-all cursor-pointer group"
          >
            <Cross className="w-6 h-6 md:w-10 md:h-10 text-white group-hover:rotate-12 transition-transform" />
          </div>

          <div 
            onClick={() => setShowAbout(true)}
            className="flex flex-col items-center text-stone-400 cursor-pointer hover:text-purple-700 transition-all p-2 group"
          >
            <Info className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] md:text-[10px] uppercase font-black mt-2 tracking-widest">Sobre</span>
          </div>

          <div 
            onClick={() => setShowSettings(true)}
            className="flex flex-col items-center text-stone-400 cursor-pointer hover:text-purple-700 transition-all p-2 group"
          >
            <Settings className="w-6 h-6 md:w-7 md:h-7 group-hover:scale-110 transition-transform" />
            <span className="text-[8px] md:text-[10px] uppercase font-black mt-2 tracking-widest">IA</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {state.selectedDay && state.user && (
        <ContentModal 
          day={state.selectedDay}
          user={state.user}
          isCompleted={state.completedDays.includes(state.selectedDay)}
          savedNotes={state.dayNotes[state.selectedDay]}
          onClose={() => setState(prev => ({ ...prev, selectedDay: null }))}
          onComplete={handleCompleteDay}
        />
      )}

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
      {showBonus && <BonusFunnelModal onClose={() => setShowBonus(false)} />}
      {showCandle && <CandleModal onClose={() => setShowCandle(false)} />}
      
      {showWelcome && state.user && (
        <WelcomeModal 
          userName={state.user.name} 
          onOpenAbout={() => {
            setShowWelcome(false);
            setShowAbout(true);
          }}
          onClose={() => setShowWelcome(false)}
        />
      )}

      {showBibleShare && <BibleShareModal onClose={() => setShowBibleShare(false)} />}
    </div>
  );
};

export default App;
