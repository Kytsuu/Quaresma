
import React from 'react';
import { Star, Crown, Sparkles, ShieldCheck } from 'lucide-react';

export const MotivationSection: React.FC<{ completedCount: number }> = ({ completedCount }) => {
  const progressPercent = (completedCount / 40) * 100;

  return (
    <section className="mt-12 md:mt-20 relative px-0">
      <div className="max-w-4xl mx-auto bg-stone-950 rounded-[2rem] md:rounded-[4rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl border border-white/10 group">
        
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(168,85,247,0.1)_0%,_rgba(0,0,0,0)_70%)] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center">
          
          <div className="mb-6 md:mb-8 flex flex-col items-center">
            <div className="bg-gradient-to-b from-yellow-300 to-yellow-600 p-4 rounded-full shadow-lg border-2 border-stone-950">
              <Crown className="w-8 h-8 md:w-10 md:h-10 text-stone-950" />
            </div>
            <span className="mt-4 text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-yellow-500 font-black">Tesouro Celestial</span>
          </div>

          <h3 className="text-2xl md:text-6xl font-bold mb-6 md:mb-8 font-serif italic text-white leading-tight">
            O Horizonte da Glória
          </h3>
          
          <p className="text-stone-400 leading-relaxed mb-8 md:mb-12 text-sm md:text-xl font-light max-w-2xl mx-auto">
            Sua persistência é um ato de amor. Ao concluir, um 
            <span className="text-yellow-500 font-bold mx-1">Presente Espiritual</span> será revelado.
          </p>

          <div className="w-full max-w-2xl flex flex-col md:grid md:grid-cols-3 gap-8 items-center border-t border-white/5 pt-8 md:pt-12">
            
            <div className="flex flex-col items-center gap-3 order-2 md:order-1">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border border-stone-900 bg-stone-800 flex items-center justify-center">
                    <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  </div>
                ))}
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-stone-600">Comunidade em Oração</span>
            </div>

            <div className="relative flex justify-center py-2 order-1 md:order-2">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-white/5 flex items-center justify-center relative">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
                  <circle
                    cx="50%" cy="50%" r="45%"
                    fill="transparent"
                    stroke="#ca8a04"
                    strokeWidth="4"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progressPercent) / 100}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="flex flex-col items-center">
                  <span className="text-2xl md:text-4xl font-serif font-black text-yellow-500">{40 - completedCount}</span>
                  <span className="text-[7px] md:text-[8px] uppercase tracking-widest text-stone-600">Faltam</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 order-3 md:order-3">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-yellow-500" />
                <span className="text-[8px] md:text-[10px] text-white font-black uppercase tracking-widest">
                  {progressPercent < 100 ? 'Em Jornada' : 'Finalizado'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
