
import React from 'react';
import { X, Heart, Sparkles, Star, Footprints, Crown, Gift } from 'lucide-react';

interface AboutModalProps {
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-purple-950/70 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col border border-white">
        
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 rounded-full hover:bg-stone-100 transition-colors z-20 bg-white shadow-lg border border-stone-100"
        >
          <X className="w-5 h-5 text-stone-400" />
        </button>

        <div className="bg-gradient-to-br from-purple-800 to-indigo-950 p-10 md:p-14 text-white relative overflow-hidden flex-shrink-0">
          <div className="relative z-10 text-left">
            <span className="uppercase tracking-[0.4em] text-[10px] font-black text-purple-300 mb-3 block">Pequenos Passos com Deus</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif italic mb-3">Preparando o Coração</h2>
            <p className="text-purple-100 font-light max-w-sm leading-relaxed text-sm md:text-base">
              Aprenda como deixar o seu coração brilhando para receber o nosso melhor amigo: Jesus.
            </p>
          </div>
        </div>

        <div className="p-8 md:p-14 overflow-y-auto custom-scrollbar bg-white">
          <div className="space-y-10">
            
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-purple-900 font-bold">
                <Heart className="w-6 h-6" />
                <h3 className="uppercase tracking-[0.2em] text-[11px] font-black">O que é a Quaresma?</h3>
              </div>
              <p className="text-stone-700 leading-relaxed text-base md:text-lg">
                Imagine que Jesus vai visitar a sua casa! A <span className="font-bold text-purple-700">Quaresma</span> é o tempo que usamos para arrumar o nosso coração, tirando as bagunças e as pirraças, para deixá-lo bem limpinho e cheio de luz para a grande festa da Páscoa.
              </p>
            </section>

            <section className="space-y-6">
              <div className="flex items-center gap-3 text-purple-900 font-bold">
                <Star className="w-6 h-6" />
                <h3 className="uppercase tracking-[0.2em] text-[11px] font-black">Sua Missão Diária</h3>
              </div>
              
              <div className="grid gap-5">
                <div className="flex gap-5 items-start bg-stone-50 p-6 rounded-3xl border border-stone-100">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-purple-600 shrink-0 border border-purple-50">
                    <Footprints className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-stone-800 text-sm uppercase tracking-wide">Um passo de cada vez</h4>
                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">Cada número no calendário é uma estação da sua viagem. Clique no número do dia de hoje para descobrir um segredo e uma tarefa de amor.</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start bg-amber-50/50 p-6 rounded-3xl border border-amber-100">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-amber-600 shrink-0 border border-amber-50">
                    <Crown className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-stone-800 text-sm uppercase tracking-wide">A Conquista do Dia 7</h4>
                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">O dia 7 é mágico! Ele é dourado porque mostra que você foi forte e amigo de Jesus por uma semana inteira. Você ganhará uma estrelinha especial no mapa!</p>
                  </div>
                </div>

                <div className="flex gap-5 items-start bg-stone-50 p-6 rounded-3xl border border-stone-100">
                  <div className="bg-white p-3 rounded-2xl shadow-sm text-indigo-600 shrink-0 border border-indigo-50">
                    <Gift className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-black text-stone-800 text-sm uppercase tracking-wide">Saber esperar</h4>
                    <p className="text-sm text-stone-600 mt-2 leading-relaxed">Como uma sementinha que precisa de sol e água, o próximo dia só abre quando o sol nasce de novo. Aproveite cada estação com calma.</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="bg-purple-900 rounded-3xl p-8 text-center shadow-xl">
              <p className="text-sm md:text-base text-purple-100 font-medium italic leading-relaxed">
                "Não importa se você é pequeno, o seu amor por Jesus é gigante e alegra todo o Céu."
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-stone-950 hover:bg-black text-white py-6 rounded-2xl font-black transition-all shadow-2xl uppercase tracking-[0.3em] text-[11px] hover:scale-[1.02] active:scale-95"
            >
              Começar minha Jornada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
