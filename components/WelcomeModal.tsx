
import React from 'react';
import { Sparkles, ArrowRight, Cross } from 'lucide-react';

interface WelcomeModalProps {
  userName: string;
  onOpenAbout: () => void;
  onClose: () => void;
}

export const WelcomeModal: React.FC<WelcomeModalProps> = ({ userName, onOpenAbout, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 border border-white">
        
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-50 to-transparent"></div>
        
        <div className="relative z-10 p-10 md:p-14 flex flex-col items-center text-center">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-900 p-5 rounded-full shadow-2xl mb-8 border-4 border-white transform hover:rotate-12 transition-transform">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          
          <span className="uppercase tracking-[0.4em] text-[10px] font-black text-purple-600 mb-4 bg-purple-50 px-4 py-1 rounded-full">Bem-vindo ao Deserto</span>
          
          <h2 className="text-3xl md:text-4xl font-black font-serif italic text-stone-900 mb-6 leading-tight">
            Salve Maria, <br/> {userName}!
          </h2>
          
          <p className="text-stone-600 leading-relaxed mb-10 font-light text-lg">
            Você acaba de iniciar uma caminhada de 40 estações rumo à maior vitória da história. Este tempo não é de tristeza, mas de <span className="text-purple-700 font-bold">preparação gloriosa</span>.
          </p>

          <div className="w-full space-y-4">
            <button
              onClick={onOpenAbout}
              className="w-full bg-stone-900 hover:bg-black text-white py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 group"
            >
              Entender a Importância
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={onClose}
              className="w-full bg-stone-50 hover:bg-stone-100 text-stone-400 py-4 rounded-2xl font-bold transition-all text-[11px] uppercase tracking-widest"
            >
              Começar Agora
            </button>
          </div>

          <div className="mt-8 flex items-center gap-2 opacity-20">
            <Cross className="w-4 h-4" />
            <div className="h-px w-10 bg-stone-900"></div>
            <Cross className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
