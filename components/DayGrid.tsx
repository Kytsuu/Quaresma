
import React from 'react';
import { CheckCircle, Crown, Star, Sparkles, Trophy, Gift } from 'lucide-react';

interface DayGridProps {
  completedDays: number[];
  onSelectDay: (day: number) => void;
  lastCompletion: number | null;
}

export const DayGrid: React.FC<DayGridProps> = ({ completedDays, onSelectDay, lastCompletion }) => {
  const days = Array.from({ length: 40 }, (_, i) => i + 1);
  
  return (
    <div className="relative py-10 md:py-16">
      {/* Background Cross */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] overflow-hidden">
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full max-w-2xl text-stone-900 fill-current"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect x="48" y="5" width="4" height="90" rx="1" />
          <rect x="20" y="35" width="60" height="4" rx="1" />
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-3 md:gap-8 max-w-5xl mx-auto relative z-10 px-1 md:px-4">
        {days.map((day) => {
          const completed = completedDays.includes(day);
          const isMilestone = day === 7 || day === 20;
          const isFinal = day === 40;
          
          return (
            <button
              key={day}
              onClick={() => onSelectDay(day)}
              className={`
                relative aspect-square flex flex-col items-center justify-center rounded-[1.5rem] md:rounded-[3rem] border-[3px] md:border-[4px] transition-all duration-700
                ${completed 
                  ? 'bg-purple-50 border-purple-200 text-purple-950 shadow-md scale-95 opacity-80' 
                  : isFinal
                    ? 'bg-gradient-to-br from-cyan-400 via-white to-emerald-400 border-cyan-300 text-cyan-950 shadow-[0_15px_50px_rgba(34,211,238,0.5)] animate-pulse-slow z-30 ring-4 ring-cyan-100/50 scale-105'
                    : isMilestone 
                      ? 'bg-gradient-to-br from-yellow-50 via-amber-100 to-yellow-200 border-amber-500 text-amber-900 shadow-[0_10px_40px_rgba(245,158,11,0.3)] hover:scale-105 active:scale-95 z-20 ring-2 ring-yellow-200/50'
                      : 'bg-white border-purple-400 text-stone-900 hover:border-purple-700 shadow-sm active:scale-95 hover:shadow-lg hover:scale-105'
                }
              `}
            >
              {/* Decorations */}
              {isFinal && (
                <>
                  <Sparkles className="absolute -top-4 -left-4 w-10 h-10 text-cyan-500 animate-spin-slow" />
                  <Sparkles className="absolute -bottom-4 -right-4 w-10 h-10 text-emerald-500 animate-bounce" />
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-600 to-emerald-500 text-white text-[8px] md:text-[11px] font-black px-4 py-1.5 rounded-full shadow-2xl border-2 border-white whitespace-nowrap uppercase tracking-[0.2em] z-40 animate-bounce">
                    GRANDE FINAL
                  </div>
                </>
              )}
              
              {isMilestone && !isFinal && (
                <>
                  <Sparkles className="absolute -top-2 -left-2 md:-top-4 md:-left-4 w-6 h-6 md:w-8 md:h-8 text-amber-500 animate-bounce" />
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-[7px] md:text-[10px] font-black px-3 py-1 rounded-full shadow-lg border border-white whitespace-nowrap uppercase tracking-[0.1em] z-30 ${day === 20 ? 'bg-gradient-to-r from-red-600 to-amber-600' : 'bg-gradient-to-r from-amber-600 to-yellow-500'}`}>
                    {day === 20 ? 'Metade' : 'Ouro'}
                  </div>
                </>
              )}

              {/* Status Icons */}
              <div className="absolute top-2 right-2 md:top-6 md:right-6">
                {completed ? (
                  <CheckCircle className="w-5 h-5 md:w-8 md:h-8 text-purple-600 fill-purple-100" />
                ) : isFinal ? (
                  <Trophy className="w-6 h-6 md:w-12 md:h-12 text-cyan-600 drop-shadow-lg" />
                ) : isMilestone ? (
                  <Crown className="w-5 h-5 md:w-10 md:h-10 text-amber-600 fill-yellow-300 drop-shadow-sm" />
                ) : (
                  <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-purple-500 animate-pulse" />
                )}
              </div>

              {/* Day Label */}
              <span className={`
                text-[9px] md:text-[13px] uppercase font-black tracking-[0.2em] mb-1 md:mb-3
                ${isFinal ? 'text-cyan-800' : isMilestone ? 'text-amber-800' : 'text-stone-400'}
              `}>
                DIA
              </span>

              {/* Number Container */}
              <div className={`
                w-12 h-12 md:w-24 md:h-24 rounded-full flex items-center justify-center border-[3px] md:border-[5px] transition-all duration-500
                ${completed 
                  ? 'bg-purple-800 border-white text-white' 
                  : isFinal
                    ? 'bg-gradient-to-b from-cyan-500 to-emerald-600 border-white text-white shadow-xl rotate-12 scale-110'
                    : isMilestone
                      ? 'bg-gradient-to-b from-yellow-400 via-amber-500 to-yellow-600 border-white text-white shadow-md'
                      : 'bg-stone-900 border-white text-white shadow-xl'
                }
              `}>
                <span className={`
                  font-serif font-black leading-none
                  ${isFinal || isMilestone ? 'text-2xl md:text-5xl' : 'text-xl md:text-4xl'}
                `}>{day}</span>
              </div>
              
              {!completed && (
                <div className={`mt-1 md:mt-3 flex items-center gap-1 font-black text-[7px] md:text-[10px] uppercase tracking-tighter ${isFinal ? 'text-cyan-700 animate-pulse' : 'text-stone-400'}`}>
                  {isFinal ? 'Vitória' : (isMilestone ? 'Marco' : 'Passo')}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
