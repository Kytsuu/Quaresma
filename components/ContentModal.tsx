
import React, { useEffect, useState } from 'react';
import { X, Heart, ScrollText, Sparkles, Loader2, CheckCircle, PenTool, ZoomIn, ZoomOut, Crown, Star, Search, Trophy, Gift, ArrowRight, Play, Music } from 'lucide-react';
import { DayContent, User, DayNote } from '../types';
import { generateDayContent } from '../services/geminiService';

interface ContentModalProps {
  day: number;
  user: User;
  onClose: () => void;
  onComplete: (day: number, notes: DayNote) => void;
  isCompleted: boolean;
  savedNotes?: DayNote;
}

export const ContentModal: React.FC<ContentModalProps> = ({ 
  day, 
  user, 
  onClose, 
  onComplete,
  isCompleted,
  savedNotes
}) => {
  const [content, setContent] = useState<DayContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1); 
  const [showZoomMenu, setShowZoomMenu] = useState(false);
  
  const [failures, setFailures] = useState(savedNotes?.failures || '');
  const [summary, setSummary] = useState(savedNotes?.summary || '');

  const isMilestone = day === 7 || day === 20;
  const isDay7 = day === 7;
  const isFinal = day === 40;

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const data = await generateDayContent(day, user.name);
      setContent(data);
      setLoading(false);
    };

    fetchContent();
  }, [day, user.name]);

  const handleFinish = () => {
    onComplete(day, { failures, summary });
    // Se for o dia 7, não fechamos imediatamente para que a pessoa veja o bônus liberado se desejar
    if (!isDay7) onClose();
  };

  const getFontSize = (baseSize: string) => {
    const sizes: Record<string, string[]> = {
      'xl': ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'],
      'lg': ['text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl'],
      'base': ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl'],
    };
    const index = Math.max(0, Math.min(Math.round((zoomLevel - 1) / 0.25) + 1, 4));
    return sizes[baseSize][index];
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 md:p-4 bg-purple-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white rounded-[2rem] md:rounded-[4rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col h-[95vh] md:max-h-[90vh] border border-white">
        
        {/* Zoom Controls */}
        <div className="absolute top-6 left-6 z-40">
          <div className={`flex items-center bg-white/95 backdrop-blur-xl border border-stone-200 shadow-xl rounded-full overflow-hidden transition-all duration-500 ${showZoomMenu ? 'px-3 py-1.5' : 'p-2.5'}`}>
            <button onClick={() => setShowZoomMenu(!showZoomMenu)} className="text-stone-500 hover:text-purple-600 p-1">
              <Search className="w-5 h-5" />
            </button>
            {showZoomMenu && (
              <div className="flex items-center gap-1">
                <div className="w-[1px] h-4 bg-stone-200 mx-2"></div>
                <button onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))} className="p-1 text-stone-500"><ZoomOut className="w-4 h-4" /></button>
                <span className="text-[10px] font-black text-stone-400 w-9 text-center tabular-nums">{Math.round(zoomLevel * 100)}%</span>
                <button onClick={() => setZoomLevel(prev => Math.min(2, prev + 0.25))} className="p-1 text-stone-500"><ZoomIn className="w-4 h-4" /></button>
              </div>
            )}
          </div>
        </div>

        {/* Close Button */}
        <div className="absolute top-6 right-6 z-30">
          <button onClick={onClose} className="p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 shadow-lg text-stone-400 hover:text-red-500 transition-all active:scale-90">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Header Content */}
        <div className={`
          p-8 md:p-16 text-center text-white shrink-0 relative overflow-hidden transition-colors duration-700
          ${isFinal ? 'bg-gradient-to-br from-cyan-700 via-emerald-600 to-stone-900' : isMilestone ? 'bg-gradient-to-br from-amber-600 via-yellow-500 to-amber-700' : 'bg-gradient-to-br from-purple-800 to-indigo-950'}
        `}>
          {(isMilestone || isFinal) && (
             <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <Star className={`w-96 h-96 animate-spin-slow ${isFinal ? 'text-cyan-200' : 'text-yellow-200'}`} />
             </div>
          )}
          <span className="uppercase tracking-[0.5em] text-[10px] md:text-[13px] font-black text-white/80 mb-3 block">
            {isFinal ? 'O GRANDE ÁPICE DA JORNADA' : isMilestone ? (day === 20 ? 'Vitória da Metade' : 'A Estação de Ouro') : 'Caminho de Fé'}
          </span>
          <h2 className="text-4xl md:text-7xl font-bold font-serif italic flex items-center justify-center gap-5 px-12 relative z-10">
            Estação {day}
            {isFinal ? <Trophy className="w-10 h-10 md:w-20 md:h-20 text-white animate-bounce" /> : isMilestone && <Crown className="w-10 h-10 md:w-20 md:h-20 text-yellow-200 animate-bounce" />}
          </h2>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 md:p-16 overflow-y-auto flex-grow bg-white custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-6" />
              <p className="text-stone-400 font-serif italic text-lg">Ouvindo a voz do Céu...</p>
            </div>
          ) : content ? (
            <div className="space-y-10 md:space-y-16 pb-12">
              
              {/* DIA 7 BONUS SECTION */}
              {isDay7 && isCompleted && (
                <div className="bg-gradient-to-br from-amber-500 to-yellow-700 p-8 md:p-12 rounded-[3rem] text-white space-y-8 shadow-2xl relative overflow-hidden group animate-in slide-in-from-top-10 duration-700">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Music className="w-24 h-24" />
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-1.5 rounded-full mb-4">
                      <Gift className="w-4 h-4 text-yellow-200" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Bônus de Perseverança</span>
                    </div>
                    <h4 className="text-3xl font-serif italic font-bold mb-4">Melodias para sua Alma</h4>
                    <p className="text-sm opacity-90 leading-relaxed max-w-md mx-auto mb-8">
                      Você completou sua primeira semana! Como recompensa, desfrute desta seleção de músicas sagradas para acompanhar suas orações.
                    </p>
                  </div>

                  {/* Video Embed */}
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/20">
                    <iframe 
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/CB_PaEi23Nc" 
                      title="Músicas para Quaresma" 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}

              {isFinal && (
                 <div className="bg-gradient-to-br from-cyan-500 to-emerald-700 p-10 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <Trophy className="w-16 h-16 text-white/50 mx-auto" />
                    <div className="text-center">
                      <h4 className="font-black text-2xl uppercase tracking-[0.2em] mb-4">Você Venceu o Deserto!</h4>
                      <p className="text-lg italic opacity-90 leading-relaxed">
                        "Parabéns, ${user.name}! Foram 40 dias de entrega, oração e amor. O seu coração agora é um santuário renovado."
                      </p>
                    </div>
                    
                    {/* BONUS CTA SECTION */}
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-[2rem] p-8 mt-8 text-center animate-in slide-in-from-bottom-5 duration-700">
                      <Gift className="w-10 h-10 mx-auto mb-4 text-yellow-300" />
                      <h5 className="font-black uppercase tracking-widest text-sm mb-3">Recompensa de Perseverança</h5>
                      <p className="text-sm opacity-80 mb-6">Como gesto de gratidão por sua jornada, preparamos um presente especial para selar sua vitória.</p>
                      <button 
                        onClick={() => {
                          onClose();
                          // Simula a abertura do modal de bônus através do app
                          window.dispatchEvent(new CustomEvent('openBonusFunnel'));
                        }}
                        className="w-full bg-white text-cyan-900 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-cyan-50 transition-all shadow-xl active:scale-95"
                      >
                        Resgatar meu Bônus
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                 </div>
              )}

              <section className="space-y-6">
                <div className="flex items-center gap-3 text-purple-900 font-bold">
                  <ScrollText className="w-6 h-6" />
                  <h3 className="uppercase tracking-[0.3em] text-[11px] font-black">Reflexão do Coração</h3>
                </div>
                <p className={`${getFontSize('xl')} text-stone-800 leading-relaxed font-serif italic border-l-[8px] border-purple-200 pl-8 transition-all duration-300 py-4 bg-stone-50/50 rounded-r-3xl`}>
                  "{content.reflection}"
                </p>
              </section>

              <section className="bg-indigo-50/50 p-10 md:p-14 rounded-[3rem] border-2 border-indigo-100 shadow-inner space-y-6">
                <div className="flex items-center gap-3 text-indigo-900 font-bold">
                  <Heart className="w-6 h-6" />
                  <h3 className="uppercase tracking-[0.3em] text-[11px] font-black">Conversando com Deus</h3>
                </div>
                <p className={`${getFontSize('lg')} text-stone-700 leading-relaxed italic`}>
                  {content.prayer}
                </p>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3 text-amber-700 font-bold">
                  <Sparkles className="w-6 h-6" />
                  <h3 className="uppercase tracking-[0.3em] text-[11px] font-black">Propósito de Vitória</h3>
                </div>
                <div className={`p-10 rounded-[2.5rem] border-4 border-dashed border-white shadow-2xl transform hover:scale-105 transition-transform ${isFinal ? 'bg-gradient-to-r from-cyan-600 to-emerald-600' : 'bg-gradient-to-br from-amber-500 to-yellow-600'}`}>
                  <p className={`${getFontSize('base')} text-white leading-relaxed font-black text-center uppercase tracking-[0.1em]`}>
                    {content.purpose}
                  </p>
                </div>
              </section>

              <div className="pt-14 border-t-2 border-stone-100 space-y-10">
                <div className="flex items-center gap-3 text-purple-900 font-bold">
                  <PenTool className="w-6 h-6" />
                  <h3 className="uppercase tracking-[0.3em] text-[11px] font-black">Exame de Consciência</h3>
                </div>
                <div className="grid gap-8">
                  <textarea
                    readOnly={isCompleted}
                    placeholder="Fale com Jesus sobre o dia de hoje..."
                    className={`w-full min-h-[160px] p-8 bg-stone-50 border-2 border-stone-100 rounded-[2rem] focus:ring-8 focus:ring-purple-50 outline-none transition-all resize-none ${getFontSize('base')}`}
                    value={failures}
                    onChange={(e) => setFailures(e.target.value)}
                  />
                </div>
              </div>

              {!isCompleted ? (
                <button
                  onClick={handleFinish}
                  className={`w-full py-8 rounded-[2.5rem] font-black transition-all shadow-2xl uppercase tracking-[0.4em] text-[14px] hover:scale-[1.02] active:scale-95 ${isFinal ? 'bg-cyan-900 text-white' : isMilestone ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white' : 'bg-stone-950 text-white'}`}
                >
                  {isFinal ? 'Concluir minha Grande Jornada' : `Concluir Estação ${day}`}
                </button>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center gap-4 py-10 bg-purple-50 rounded-[2.5rem] border-4 border-purple-200 text-purple-900 font-black uppercase tracking-[0.3em] text-[14px]">
                    <CheckCircle className="w-8 h-8" />
                    Missão Cumprida com Deus
                  </div>
                  {isDay7 && (
                    <p className="text-center text-amber-600 font-serif italic text-sm animate-pulse">
                      Role para cima para ver seu presente musical liberado! ⬆️
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-24 text-red-500">Falha ao carregar conteúdo. Tente novamente.</div>
          )}
        </div>
      </div>
    </div>
  );
};
