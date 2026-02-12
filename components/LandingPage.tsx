
import React from 'react';
import { Cross, Sparkles, ArrowRight, Zap, Heart, CheckCircle2, Footprints, Book, Star, Quote } from 'lucide-react';
import { QuizResult } from '../types';

interface LandingPageProps {
  onStart: () => void;
  quizResult?: QuizResult | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, quizResult }) => {
  return (
    <div className="min-h-screen bg-stone-50 selection:bg-purple-200">
      {/* Hero Section Personalizada com Resultado do Quiz */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-full bg-[radial-gradient(circle_at_50%_20%,_rgba(168,85,247,0.15)_0%,_rgba(255,255,255,0)_60%)]"></div>
          <div className="cloud-layer opacity-5"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 text-center space-y-12">
          <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-10 duration-1000">
            
            {/* NOVO: Bloco de Resultado em Destaque na Head da LP */}
            {quizResult && (
              <div className="w-full max-w-2xl bg-white rounded-[3rem] p-8 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-amber-100 mb-16 animate-in zoom-in-95 duration-1000">
                <div className="flex flex-col items-center gap-6 mb-8">
                  <div className="bg-amber-50 w-16 h-16 rounded-2xl flex items-center justify-center border border-amber-100 rotate-6 shadow-sm">
                    <Star className="w-8 h-8 text-amber-600 fill-amber-200" />
                  </div>
                  <div className="space-y-2">
                    <span className="uppercase tracking-[0.4em] text-[10px] font-black text-amber-600">Perfil Identificado</span>
                    <h3 className="text-4xl md:text-6xl font-black font-serif italic text-stone-900 leading-none">
                      {quizResult.profile}
                    </h3>
                  </div>
                </div>

                <div className="bg-stone-50 p-8 rounded-[2rem] border border-stone-100 mb-8 relative group">
                  <Quote className="absolute top-4 right-6 w-10 h-10 text-stone-200" />
                  <p className="text-xl md:text-2xl font-serif italic text-stone-800 leading-relaxed font-bold">
                    "{quizResult.verse}"
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mt-4">— {quizResult.reference}</p>
                </div>

                <p className="text-stone-500 text-lg leading-relaxed font-light italic border-l-4 border-amber-200 pl-6 text-left max-w-lg mx-auto">
                  {quizResult.diagnostic}
                </p>
              </div>
            )}

            <div className="bg-white/80 backdrop-blur-xl p-5 rounded-[2rem] shadow-2xl mb-12 border border-purple-100 rotate-3">
              <Cross className="w-12 h-12 text-purple-800" />
            </div>
            
            <span className="uppercase tracking-[0.6em] text-[10px] md:text-[13px] font-black text-purple-900/60 mb-8 bg-purple-50 px-10 py-3 rounded-full border border-purple-100 shadow-sm">
              Sua Conversão Começa Agora
            </span>
            
            <h1 className="text-5xl md:text-9xl font-black font-serif italic text-stone-900 leading-[1] mb-10 text-shadow-elegant max-w-4xl mx-auto">
              Chega de quaresmas fracas e genéricas.
            </h1>
            
            <p className="text-xl md:text-4xl text-stone-600 font-light max-w-3xl mx-auto leading-relaxed px-4">
              Use seu perfil de <span className="text-amber-700 font-bold italic">{quizResult?.profile || 'Fé'}</span> para viver 40 dias <span className="text-purple-800 font-bold italic underline decoration-purple-300">conscientes</span> e mais próximos de Deus.
            </p>
          </div>

          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <h2 className="text-lg md:text-3xl text-purple-900/70 font-medium font-serif italic max-w-3xl mx-auto">
              "Este é o mapa personalizado que você precisava para não chegar à Páscoa igual começou."
            </h2>

            <button
              onClick={onStart}
              className="group relative bg-stone-950 hover:bg-black text-white px-16 py-8 rounded-[3rem] font-black uppercase tracking-[0.4em] text-[14px] md:text-[17px] shadow-[0_40px_80px_rgba(0,0,0,0.3)] hover:shadow-[0_50px_100px_rgba(0,0,0,0.4)] transition-all hover:-translate-y-2 active:scale-95 flex items-center justify-center gap-6 mx-auto"
            >
              Iniciar Minha Jornada de {quizResult?.profile || ''}
              <ArrowRight className="w-7 h-7 group-hover:translate-x-3 transition-transform" />
            </button>
            
            <p className="text-[11px] uppercase font-black tracking-[0.5em] text-stone-400">
              Comece hoje. Seu perfil profético te guiará.
            </p>
          </div>
        </div>
      </header>

      {/* Connection Phrases Section */}
      <section className="py-40 px-4 relative overflow-hidden bg-stone-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-32 md:space-y-48 relative z-10">
          <div className="text-center space-y-10 transform hover:scale-105 transition-transform duration-700">
            <div className="h-px w-24 bg-amber-500/50 mx-auto mb-12"></div>
            <h3 className="text-3xl md:text-7xl font-serif italic text-white leading-tight font-medium">
              “Deus não chama você para uma quaresma perfeita, mas para uma quaresma <span className="text-amber-500">verdadeira</span>.”
            </h3>
          </div>

          <div className="text-center space-y-10 transform hover:scale-105 transition-transform duration-700">
            <h3 className="text-3xl md:text-7xl font-serif italic text-white leading-tight font-medium">
              “Quando a quaresma é genérica, ela não transforma. Quando é <span className="text-purple-400">pessoal</span>, ela permanece.”
            </h3>
          </div>

          <div className="text-center space-y-10 transform hover:scale-105 transition-transform duration-700">
            <h3 className="text-3xl md:text-7xl font-serif italic text-white leading-tight font-medium">
              “O problema não é falta de fé. <br/>É viver sem um <span className="text-emerald-400">caminho</span>.”
            </h3>
            <div className="h-px w-24 bg-emerald-500/50 mx-auto mt-12"></div>
          </div>
        </div>
      </section>

      {/* Features / Persuasion Section */}
      <section className="py-40 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
          <div className="bg-stone-50 p-16 rounded-[4rem] border border-stone-100 space-y-8 hover:shadow-2xl transition-all">
            <div className="bg-purple-100 w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-purple-700 shadow-inner">
              <Zap className="w-10 h-10" />
            </div>
            <h4 className="text-3xl font-serif font-bold italic text-stone-900">IA Devocional</h4>
            <p className="text-stone-500 text-lg leading-relaxed font-light">
              Reflexões geradas exclusivamente para o seu perfil identificado, fugindo de textos genéricos.
            </p>
          </div>

          <div className="bg-stone-50 p-16 rounded-[4rem] border border-stone-100 space-y-8 hover:shadow-2xl transition-all md:translate-y-12">
            <div className="bg-amber-100 w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-amber-700 shadow-inner">
              <Footprints className="w-10 h-10" />
            </div>
            <h4 className="text-3xl font-serif font-bold italic text-stone-900">40 Estações Reais</h4>
            <p className="text-stone-500 text-lg leading-relaxed font-light">
              Um mapa interativo que registra sua evolução, suas quedas e suas vitórias rumo à ressurreição.
            </p>
          </div>

          <div className="bg-stone-50 p-16 rounded-[4rem] border border-stone-100 space-y-8 hover:shadow-2xl transition-all">
            <div className="bg-emerald-100 w-20 h-20 rounded-[2.5rem] flex items-center justify-center text-emerald-700 shadow-inner">
              <Heart className="w-10 h-10" />
            </div>
            <h4 className="text-3xl font-serif font-bold italic text-stone-900">Propósito Prático</h4>
            <p className="text-stone-500 text-lg leading-relaxed font-light">
              Desafios diários que tiram você da zona de conforto espiritual e geram frutos concretos de caridade.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-48 px-4 text-center bg-stone-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <Cross className="w-[40rem] h-[40rem] absolute -top-40 -left-40 rotate-12" />
          <Cross className="w-[40rem] h-[40rem] absolute -bottom-40 -right-40 -rotate-12" />
        </div>

        <div className="max-w-4xl mx-auto space-y-16 relative z-10">
          <Sparkles className="w-16 h-16 text-amber-500 mx-auto animate-pulse" />
          <h2 className="text-5xl md:text-9xl font-black font-serif italic text-stone-900 leading-tight">
            Este tempo não volta mais.
          </h2>
          <p className="text-2xl text-stone-500 max-w-2xl mx-auto font-light leading-relaxed">
            Muitas quaresmas foram perdidas na distração. Não deixe que esta seja apenas mais uma no calendário.
          </p>
          
          <button
            onClick={onStart}
            className="group bg-gradient-to-br from-purple-800 to-black text-white px-20 py-10 rounded-[4rem] font-black uppercase tracking-[0.5em] text-[16px] md:text-[20px] shadow-[0_60px_120px_rgba(0,0,0,0.4)] hover:shadow-[0_80px_150px_rgba(107,33,168,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-8 mx-auto"
          >
            Quero meus 40 dias com Deus
            <ArrowRight className="w-8 h-8 group-hover:translate-x-4 transition-transform" />
          </button>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 pt-16">
            <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-stone-400">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Conversão Pessoal
            </div>
            <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-stone-400">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" /> Acesso Vitalício
            </div>
            <div className="flex items-center gap-4 text-[12px] font-black uppercase tracking-[0.3em] text-stone-400">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" /> IA Teológica Pro
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white border-t border-stone-100 text-center">
        <p className="text-[12px] uppercase tracking-[0.6em] font-black text-stone-300">
          Abençoada Quaresma • {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
};
