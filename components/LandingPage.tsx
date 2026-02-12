
import React from 'react';
import { Cross, Sparkles, ArrowRight, Zap, Heart, CheckCircle2, Footprints, Star, Quote } from 'lucide-react';
import { QuizResult } from '../types';

interface LandingPageProps {
  onStart: () => void;
  quizResult?: QuizResult | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, quizResult }) => {
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-purple-200">
      <header className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-4 overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-12">
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-10 duration-1000">
            
            {quizResult && (
              <div className="w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl border border-amber-100 mb-16 animate-in zoom-in-95 duration-1000">
                <div className="flex flex-col items-center gap-6 mb-8 text-center">
                  <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center border border-amber-100 shadow-sm">
                    <Star className="w-8 h-8 text-amber-600 fill-amber-200" />
                  </div>
                  <div>
                    <span className="uppercase tracking-[0.4em] text-[10px] font-black text-amber-600">Seu Perfil Profético</span>
                    <h3 className="text-4xl md:text-6xl font-black font-serif italic text-stone-900 leading-none mt-2">
                      {quizResult.profile}
                    </h3>
                  </div>
                </div>

                <div className="bg-stone-50 p-8 rounded-[2rem] border border-stone-100 mb-8 relative">
                  <Quote className="absolute top-4 right-6 w-10 h-10 text-stone-200" />
                  <p className="text-xl md:text-2xl font-serif italic text-stone-800 leading-relaxed font-bold">
                    "{quizResult.verse}"
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mt-4">— {quizResult.reference}</p>
                </div>

                <p className="text-stone-500 text-lg leading-relaxed font-light italic border-l-4 border-amber-200 pl-6 text-left">
                  {quizResult.diagnostic}
                </p>
              </div>
            )}

            <div className="bg-white/80 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl mb-12 border border-purple-100">
              <Cross className="w-12 h-12 text-purple-800" />
            </div>
            
            <h1 className="text-5xl md:text-9xl font-black font-serif italic text-stone-900 leading-[1] mb-10 text-shadow-elegant max-w-4xl mx-auto">
              A sua Abençoada Quaresma
            </h1>
            
            <p className="text-xl md:text-4xl text-stone-600 font-light max-w-3xl mx-auto leading-relaxed mb-12">
              Transforme seus 40 dias sagrados com um caminho <span className="text-purple-800 font-bold italic underline decoration-purple-300">personalizado para sua alma</span>.
            </p>

            <button
              onClick={onStart}
              className="group relative bg-stone-950 hover:bg-black text-white px-16 py-8 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[14px] md:text-[17px] shadow-2xl transition-all hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-6"
            >
              Iniciar minha Jornada Completa
              <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
            </button>
          </div>
        </div>
      </header>

      <section className="py-40 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="bg-stone-50 p-16 rounded-[4rem] border border-stone-100 space-y-8">
            <Zap className="w-10 h-10 text-purple-700" />
            <h4 className="text-3xl font-serif font-bold italic">IA Devocional</h4>
            <p className="text-stone-500 text-lg leading-relaxed">Reflexões únicas geradas para o seu momento de vida.</p>
          </div>
          <div className="bg-stone-50 p-16 rounded-[4rem] border border-stone-100 space-y-8">
            <Footprints className="w-10 h-10 text-amber-700" />
            <h4 className="text-3xl font-serif font-bold italic">40 Estações</h4>
            <p className="text-stone-500 text-lg leading-relaxed">Um mapa interativo que registra sua evolução espiritual.</p>
          </div>
          <div className="bg-stone-50 p-16 rounded-[4rem] border border-stone-100 space-y-8">
            <Heart className="w-10 h-10 text-emerald-700" />
            <h4 className="text-3xl font-serif font-bold italic">Conversão</h4>
            <p className="text-stone-500 text-lg leading-relaxed">Desafios práticos para gerar frutos concretos de fé.</p>
          </div>
        </div>
      </section>

      <footer className="py-24 bg-white border-t border-stone-100 text-center">
        <p className="text-[12px] uppercase tracking-[0.6em] font-black text-stone-300 italic">
          A sua Abençoada Quaresma • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
