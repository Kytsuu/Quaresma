
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

const STORAGE_KEY = 'quaresma_app_state_v6';

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

  // Controlamos a visualização baseada no progresso do funil
  const [view, setView] = useState<'quiz' | 'landing' | 'app'>(() => {
    if (state.user && state.quizResult) return 'app';
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
    setState(prev => ({ 
      ...prev, 
      quizResult,
      // Criamos um usuário temporário para a Landing Page
      user: { name: userName, startDate: new Date().toISOString() }
    }));
    setView('landing');
  };

  const handleStartFromLP = () => {
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

  if (view === 'quiz') {
    return <QuizFunnel onComplete={handleQuizComplete} />;
  }

  if (view === 'landing') {
    return <LandingPage onStart={handleStartFromLP} quizResult={state.quizResult} />;
  }

  const progress = Math.round((state.completedDays.length / 40) * 100);
  const currentDevotionalDay = state.completedDays.length + 1 <= 40 ? state.completedDays.length + 1 : 40;

  return (
    <div className="min-h-screen pb-40 selection:bg-purple-200">
      <header className="relative text-stone-900 pt-16 md:pt-24 pb-24 md:pb-40 overflow-hidden px-4">
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center mb-10">
            <div className="bg-white/70 backdrop-blur-md p-4 rounded-[2rem] border border-white/80 shadow-xl mb-6 transform hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-yellow-600" />
            </div>
            <span className="uppercase tracking-[0.5em] text-[10px] font-black text-purple-900 mb-6 bg-white/50 px-6 py-1.5 rounded-full border border-white/30">
              Jornada Personalizada
            </span>
            <h1 className="text-4xl md:text-8xl font-black mb-8 font-serif italic text-stone-900 leading-tight text-shadow-elegant">
              A sua Abençoada Quaresma
            </h1>
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-2xl px-8 py-4 rounded-[2.5rem] border border-white shadow-xl">
              <p className="text-lg md:text-2xl text-stone-700 font-medium">
                Paz de Cristo, <span className="font-black text-purple-900 italic text-shadow-golden">{state.user?.name}</span>.
              </p>
            </div>
          </div>

          <div className="max-w-xs mx-auto mt-12 bg-white/90 p-8 rounded-[2.5rem] border border-white shadow-2xl relative group">
            <div className="absolute -top-3 -left-3 bg-purple-700 text-white p-2.5 rounded-full shadow-xl">
              <Cross className="w-4 h-4" />
            </div>
            <div className="flex justify-between items-end mb-5">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-800">Progresso</span>
              <span className="text-4xl font-serif font-black text-purple-950">{progress}%</span>
            </div>
            <div className="w-full h-4 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div 
                className="h-full bg-gradient-to-r from-purple-800 to-yellow-400 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <DailyReflection day={currentDevotionalDay} />

        <div className="bg-white/95 backdrop-blur-[40px] rounded-[3rem] shadow-2xl p-8 md:p-20 border border-white/50">
          <div className="flex items-center gap-6 mb-12 border-b border-stone-200/50 pb-10">
            <div className="bg-stone-900 p-6 rounded-[2rem] shadow-2xl text-white">
              <Calendar className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-stone-900 font-serif">Estações do Coração</h2>
          </div>

          <DayGrid 
            completedDays={state.completedDays} 
            onSelectDay={handleSelectDay} 
            lastCompletion={state.lastCompletionTimestamp}
          />

          <MotivationSection completedCount={state.completedDays.length} />
        </div>
      </main>

      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] md:w-fit bg-white/95 backdrop-blur-3xl border border-white/80 p-4 rounded-[2.5rem] flex justify-center items-center shadow-2xl z-40">
        <div className="flex items-center justify-around gap-4 md:gap-8 w-full md:px-6">
          <div onClick={() => setShowBibleShare(true)} className="flex flex-col items-center text-stone-400 cursor-pointer hover:text-purple-700 transition-all p-2">
            <BookOpen className="w-6 h-6" />
            <span className="text-[8px] uppercase font-black mt-2 tracking-widest">Palavra</span>
          </div>
          <div onClick={() => setShowCandle(true)} className="flex flex-col items-center text-amber-500 cursor-pointer hover:text-amber-600 transition-all p-2">
            <Flame className="w-6 h-6" />
            <span className="text-[8px] uppercase font-black mt-2 tracking-widest">Vela</span>
          </div>
          <div onClick={() => {
              const maxCompleted = state.completedDays.length > 0 ? Math.max(...state.completedDays) : 0;
              if (maxCompleted < 40) handleSelectDay(maxCompleted + 1);
            }}
            className="bg-stone-950 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl border-4 border-white active:scale-90 transition-all cursor-pointer"
          >
            <Cross className="w-8 h-8 text-white" />
          </div>
          <div onClick={() => setShowAbout(true)} className="flex flex-col items-center text-stone-400 cursor-pointer hover:text-purple-700 transition-all p-2">
            <Info className="w-6 h-6" />
            <span className="text-[8px] uppercase font-black mt-2 tracking-widest">Sobre</span>
          </div>
          <div onClick={() => setShowSettings(true)} className="flex flex-col items-center text-stone-400 cursor-pointer hover:text-purple-700 transition-all p-2">
            <Settings className="w-6 h-6" />
            <span className="text-[8px] uppercase font-black mt-2 tracking-widest">Config</span>
          </div>
        </div>
      </footer>

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
      {showWelcome && state.user && <WelcomeModal userName={state.user.name} onOpenAbout={() => { setShowWelcome(false); setShowAbout(true); }} onClose={() => setShowWelcome(false)} />}
      {showBibleShare && <BibleShareModal onClose={() => setShowBibleShare(false)} />}
    </div>
  );
};

export default App;
