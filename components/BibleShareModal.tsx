
import React, { useState, useEffect } from 'react';
import { X, Send, Share2, Sparkles, Loader2, BookOpen, Quote } from 'lucide-react';
import { generateShareableWord } from '../services/geminiService';

interface ShareableWord {
  greeting: string;
  verse: string;
  reference: string;
  incentive: string;
}

export const BibleShareModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [data, setData] = useState<ShareableWord | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchWord = async () => {
    setLoading(true);
    const res = await generateShareableWord();
    setData(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  const handleShare = async () => {
    if (!data) return;
    
    const shareText = `*${data.greeting}*\n\n"${data.verse}"\n— _${data.reference}_\n\n${data.incentive}\n\n🙏 Enviado via: A sua Abençoada Quaresma`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Palavra do Dia - Quaresma',
          text: shareText,
        });
      } catch (err) {
        console.log('User cancelled share or error');
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert('Texto copiado para a área de transferência! Cole no WhatsApp da família.');
    }
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-purple-900/30 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-[3.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
        
        {/* Header decoration */}
        <div className="h-32 bg-gradient-to-br from-indigo-900 via-purple-900 to-stone-900 p-8 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <BookOpen className="w-64 h-64 absolute -bottom-20 -right-20 rotate-12" />
           </div>
           <button 
             onClick={onClose}
             className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
           >
             <X className="w-5 h-5" />
           </button>
           <div className="text-center relative z-10">
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-purple-300 mb-1 block">Semente da Vida</span>
              <h2 className="text-3xl font-serif italic text-white font-bold">Palavra do Dia</h2>
           </div>
        </div>

        <div className="p-10 md:p-12">
          {loading ? (
            <div className="py-20 flex flex-col items-center gap-6">
              <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
              <p className="text-stone-400 font-serif italic">Preparando uma semente de esperança...</p>
            </div>
          ) : data ? (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* The Card to Share */}
              <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-200 relative group">
                <div className="absolute top-4 right-6 opacity-10">
                  <Quote className="w-10 h-10 text-stone-900" />
                </div>
                
                <p className="text-purple-800 font-bold text-sm mb-6 flex items-center gap-2">
                   <Sparkles className="w-4 h-4" />
                   {data.greeting}
                </p>
                
                <h3 className="text-2xl font-serif text-stone-800 italic leading-relaxed mb-4">
                  "{data.verse}"
                </h3>
                
                <p className="text-xs font-black uppercase tracking-widest text-stone-400 border-l-2 border-stone-200 pl-4 py-1 mb-8">
                  {data.reference}
                </p>

                <p className="text-stone-500 font-light leading-relaxed italic text-sm">
                  {data.incentive}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={handleShare}
                  className="w-full bg-gradient-to-r from-purple-700 to-indigo-900 hover:from-black hover:to-black text-white py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                >
                  <Share2 className="w-4 h-4" />
                  Compartilhar com a Família
                </button>
                
                <button
                  onClick={fetchWord}
                  className="w-full py-4 text-stone-400 hover:text-purple-600 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-3 h-3" />
                  Gerar nova Palavra
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-red-400 font-light italic">Não conseguimos sintonizar a Palavra agora.</p>
              <button onClick={fetchWord} className="mt-4 text-purple-600 font-bold underline">Tentar novamente</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
