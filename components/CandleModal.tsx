
import React, { useState } from 'react';
import { X, Flame, User, Heart, Sparkles, Loader2 } from 'lucide-react';
import { generateCandleBlessing } from '../services/geminiService';

interface CandleModalProps {
  onClose: () => void;
}

export const CandleModal: React.FC<CandleModalProps> = ({ onClose }) => {
  const [personName, setPersonName] = useState('');
  const [intention, setIntention] = useState('');
  const [isLit, setIsLit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blessing, setBlessing] = useState('');

  const handleLightCandle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName.trim() || !intention.trim()) return;

    setLoading(true);
    const result = await generateCandleBlessing(intention, personName);
    setBlessing(result.blessing);
    setLoading(false);
    setIsLit(true);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-3xl animate-in fade-in duration-700">
      <div className="relative w-full max-w-lg bg-stone-900/40 rounded-[3.5rem] shadow-[0_50px_150px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-500 border border-white/5">
        
        {/* Decorative Light Leak */}
        <div className={`absolute -top-24 -left-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] transition-opacity duration-1000 ${isLit ? 'opacity-100' : 'opacity-0'}`}></div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/5 text-stone-500 hover:text-white hover:bg-white/10 transition-all z-20 border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-10 md:p-14 text-center">
          {!isLit ? (
            <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
              <div className="flex flex-col items-center">
                <div className="relative group">
                   <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full group-hover:bg-amber-500/40 transition-all"></div>
                   <div className="relative bg-stone-800 p-6 rounded-full mb-6 border border-white/10 shadow-2xl">
                    <Flame className="w-10 h-10 text-amber-500 animate-pulse" />
                  </div>
                </div>
                <h2 className="text-4xl font-serif italic text-white font-bold tracking-tight">Luz de Intercessão</h2>
                <p className="text-stone-400 text-sm mt-3 font-light max-w-[280px] mx-auto leading-relaxed">
                  Transforme sua intenção em uma luz que nunca se apaga diante do Criador.
                </p>
              </div>

              <form onSubmit={handleLightCandle} className="space-y-6 text-left">
                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase font-black tracking-[0.3em] text-amber-500/70 flex items-center gap-2 mb-3">
                    <User className="w-3 h-3" /> Em nome de quem?
                  </label>
                  <input
                    type="text"
                    required
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    className="w-full bg-stone-800/50 border border-white/10 rounded-2xl px-7 py-5 text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-500/30 focus:bg-stone-800 outline-none transition-all shadow-inner"
                    placeholder="Nome da pessoa amada..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-black tracking-[0.3em] text-amber-500/70 flex items-center gap-2 mb-3">
                    <Heart className="w-3 h-3" /> Sua Declaração ao Céu
                  </label>
                  <textarea
                    required
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    className="w-full bg-stone-800/50 border border-white/10 rounded-2xl px-7 py-5 text-white placeholder-stone-600 focus:ring-2 focus:ring-amber-500/30 focus:bg-stone-800 outline-none transition-all resize-none h-40 shadow-inner"
                    placeholder="Abra seu coração aqui..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 text-white py-6 rounded-3xl font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(245,158,11,0.2)] hover:shadow-[0_25px_50px_rgba(245,158,11,0.4)] hover:-translate-y-1 active:scale-95 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      <Flame className="w-5 h-5 fill-current" />
                      Acender no Altar
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-12 py-10 animate-in fade-in zoom-in-90 duration-1000">
              
              {/* Premium Graphic Candle Element */}
              <div className="relative flex flex-col items-center py-16">
                
                {/* Flame Container */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30">
                  <div className="relative">
                    {/* Multi-layered Flame */}
                    <div className="flame-outer"></div>
                    <div className="flame-middle"></div>
                    <div className="flame-inner"></div>
                    {/* Flame Core */}
                    <div className="w-2 h-2 bg-white rounded-full absolute bottom-2 left-1/2 -translate-x-1/2 blur-[2px] opacity-80"></div>
                  </div>
                </div>

                {/* Candle Body (Realistic SVG) */}
                <div className="relative z-20 mt-4">
                  <svg width="80" height="240" viewBox="0 0 80 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    <defs>
                      <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f5f5f5" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#d9d9d9" />
                      </linearGradient>
                      <filter id="meltBlur" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                      </filter>
                    </defs>
                    {/* Main Body */}
                    <rect x="15" y="30" width="50" height="210" rx="4" fill="url(#candleGrad)" />
                    {/* Wick */}
                    <rect x="39" y="10" width="2" height="20" fill="#222" />
                    {/* Melted Wax Top */}
                    <path d="M15 40C15 40 25 25 40 25C55 25 65 40 65 40V50H15V40Z" fill="#fff" filter="url(#meltBlur)" />
                    {/* Wax Drips */}
                    <path d="M20 45C20 45 18 65 22 75C24 80 28 75 28 75" stroke="#eee" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
                    <path d="M55 42C55 42 58 60 54 85C52 95 48 90 48 90" stroke="#f0f0f0" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
                  </svg>
                  
                  {/* Subtle Aura around candle */}
                  <div className="absolute inset-0 bg-amber-500/10 blur-[60px] rounded-full scale-150 animate-pulse-slow"></div>
                </div>

                {/* Ground Shadow */}
                <div className="w-32 h-4 bg-black/40 blur-xl rounded-full mt-[-10px]"></div>
              </div>

              <div className="space-y-8 max-w-sm mx-auto">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-amber-500/30"></div>
                    <span className="text-[10px] uppercase font-black tracking-[0.4em] text-amber-500">Intenção Registrada</span>
                    <div className="h-px w-8 bg-amber-500/30"></div>
                  </div>
                  <h3 className="text-white text-2xl font-serif italic font-bold">Luz para {personName}</h3>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md relative overflow-hidden group">
                  <Sparkles className="absolute top-4 right-4 w-4 h-4 text-amber-500/20 group-hover:text-amber-500/40 transition-colors" />
                  <p className="text-lg md:text-xl font-serif italic text-amber-50 leading-relaxed">
                    "{blessing}"
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="group flex items-center justify-center gap-3 mx-auto text-stone-500 hover:text-white transition-all text-[11px] font-black uppercase tracking-[0.3em] py-4"
                >
                  Continuar com Fé
                  <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style>{`
        .flame-outer {
          width: 40px;
          height: 60px;
          background: radial-gradient(ellipse at bottom, rgba(255, 120, 0, 0.6) 0%, rgba(255, 60, 0, 0) 70%);
          border-radius: 50% 50% 20% 20%;
          filter: blur(8px);
          animation: flame-sway 1.5s ease-in-out infinite alternate;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
        .flame-middle {
          width: 24px;
          height: 45px;
          background: radial-gradient(ellipse at bottom, #ff9d00 0%, #ff5e00 100%);
          border-radius: 50% 50% 35% 35%;
          filter: blur(2px);
          animation: flame-flicker 0.1s step-end infinite alternate;
          position: absolute;
          bottom: 2px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
        }
        .flame-inner {
          width: 10px;
          height: 25px;
          background: linear-gradient(to top, #ffffff, #fff8e1);
          border-radius: 50% 50% 35% 35%;
          filter: blur(1px);
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
          opacity: 0.9;
        }

        @keyframes flame-flicker {
          0% { transform: translateX(-50%) scale(1); opacity: 0.95; }
          50% { transform: translateX(-50%) scale(1.05, 0.98); opacity: 1; }
          100% { transform: translateX(-50%) scale(0.98, 1.05); opacity: 0.92; }
        }

        @keyframes flame-sway {
          0% { transform: translateX(-50%) rotate(-2deg) scaleY(1); }
          100% { transform: translateX(-50%) rotate(2deg) scaleY(1.1); }
        }

        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.1; transform: scale(1.5); }
          50% { opacity: 0.2; transform: scale(1.8); }
        }
      `}</style>
    </div>
  );
};
