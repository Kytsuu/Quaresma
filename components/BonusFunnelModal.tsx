
import React from 'react';
import { X, Trophy, Star, ArrowRight, ShieldCheck, Zap, Heart, CheckCircle2 } from 'lucide-react';

interface BonusFunnelModalProps {
  onClose: () => void;
}

export const BonusFunnelModal: React.FC<BonusFunnelModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-[90vh] flex flex-col border-4 border-amber-400">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors z-20 text-stone-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto custom-scrollbar">
          {/* Hero Section */}
          <div className="bg-gradient-to-br from-emerald-600 via-emerald-800 to-stone-900 p-10 md:p-16 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6 animate-bounce" />
            <span className="uppercase tracking-[0.4em] text-[10px] font-black text-emerald-200 mb-4 block">Acesso Exclusivo Liberado</span>
            <h2 className="text-3xl md:text-5xl font-bold font-serif italic mb-6 leading-tight">
              A Jornada Não Para Aqui!
            </h2>
            <p className="text-emerald-50 text-sm md:text-lg font-light leading-relaxed max-w-md mx-auto">
              Você provou sua fidelidade. Agora, leve sua vida de oração para o próximo nível com o método completo.
            </p>
          </div>

          {/* Offer Content */}
          <div className="p-10 md:p-14 space-y-12">
            
            {/* Value Proposition */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex gap-4 items-start">
                <Zap className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-black text-amber-900 text-xs uppercase mb-1">Guia Pós-Páscoa</h4>
                  <p className="text-[11px] text-amber-800/70">Como manter o fogo da fé aceso após os 40 dias.</p>
                </div>
              </div>
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex gap-4 items-start">
                <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-black text-emerald-900 text-xs uppercase mb-1">Mentoria Exclusiva</h4>
                  <p className="text-[11px] text-emerald-800/70">Áudios diários de aprofundamento espiritual.</p>
                </div>
              </div>
            </div>

            {/* Testimonial / Social Proof */}
            <div className="bg-stone-50 p-8 rounded-[2.5rem] border border-stone-200 text-center relative italic">
              <Heart className="w-10 h-10 text-red-100 absolute -top-5 left-1/2 -translate-x-1/2" />
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                "Este método mudou completamente a forma como minha família encara a vida espiritual. Não é apenas um app, é um caminho de conversão real."
              </p>
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">— Maria S., +10.000 alunos</span>
            </div>

            {/* Price & CTA */}
            <div className="text-center space-y-8 pb-4">
              <div className="space-y-2">
                <span className="text-stone-400 text-xs line-through">De R$ 197,00</span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-stone-900 font-light text-xl">Por apenas</span>
                  <span className="text-4xl md:text-5xl font-black text-emerald-700 font-serif italic">R$ 47,00</span>
                </div>
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-[0.2em]">Oferta Única de Conclusão</p>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => window.open('https://seulinkdecheckout.com', '_blank')}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-black hover:to-black text-white py-6 rounded-2xl font-black transition-all shadow-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-[13px] group"
                >
                  Garantir meu Acesso Agora
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-4 text-stone-400">
                  <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-tighter">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Compra Segura
                  </div>
                  <div className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-tighter">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Acesso Imediato
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
