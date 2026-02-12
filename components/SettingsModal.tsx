
import React from 'react';
import { X, Settings, Database, ExternalLink, Cpu, ShieldCheck, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const handleOpenKeySelector = async () => {
    try {
      if (window.aistudio && window.aistudio.openSelectKey) {
        await window.aistudio.openSelectKey();
      } else {
        alert("O seletor de chaves não está disponível neste ambiente.");
      }
    } catch (error) {
      console.error("Erro ao abrir seletor de chaves:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-purple-950/60 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-stone-100 transition-colors z-20 text-stone-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="bg-gradient-to-br from-stone-900 to-purple-950 p-10 text-white relative overflow-hidden">
          <Sparkles className="absolute -top-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
          <div className="flex items-center gap-4 mb-4 relative z-10">
            <div className="bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/20">
              <Settings className="w-6 h-6 text-purple-300" />
            </div>
            <h2 className="text-2xl font-serif italic font-bold">Arquitetura de Fé</h2>
          </div>
          <p className="text-purple-200 text-sm font-light leading-relaxed relative z-10">
            Sua jornada é processada por modelos de inteligência de última geração (GPT-4 Class), garantindo profundidade em cada palavra.
          </p>
        </div>

        <div className="p-10 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-stone-900 font-bold">
              <Cpu className="w-5 h-5 text-purple-600" />
              <h3 className="uppercase tracking-widest text-[11px] font-black">Motor Ativo</h3>
            </div>
            <div className="bg-stone-50 border border-stone-100 p-6 rounded-3xl flex items-center justify-between group hover:border-purple-200 transition-colors cursor-default">
              <div>
                <p className="font-black text-stone-800 text-sm">Gemini 3 Pro + Flash</p>
                <p className="text-[10px] text-stone-400 uppercase tracking-tighter">Motor de Geração de Alta Fidelidade</p>
              </div>
              <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-sm">
                <ShieldCheck className="w-3 h-3" />
                Ativo
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-3 text-stone-900 font-bold">
              <Database className="w-5 h-5 text-purple-600" />
              <h3 className="uppercase tracking-widest text-[11px] font-black">Chave de API do Projeto</h3>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Para máxima performance e personalização, utilize sua própria chave de API vinculada ao seu faturamento.
            </p>
            
            <button
              onClick={handleOpenKeySelector}
              className="w-full bg-stone-900 hover:bg-black text-white py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] group"
            >
              Configurar Chave de API
              <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <div className="flex justify-center">
              <a 
                href="https://ai.google.dev/gemini-api/docs/billing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[10px] text-purple-600 font-bold hover:underline py-2 uppercase tracking-widest"
              >
                Docs de Faturamento
              </a>
            </div>
          </section>

          <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100/50">
            <p className="text-[11px] text-purple-800 leading-relaxed italic text-center font-medium">
              "A tecnologia agora serve ao propósito do espírito: reflexões únicas geradas em tempo real para sua conversão."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
