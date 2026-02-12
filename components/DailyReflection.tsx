
import React, { useEffect, useState } from 'react';
import { Book, Quote, Sparkles } from 'lucide-react';
import { generateBibleReflection } from '../services/geminiService';
import { BibleReflection as IBibleReflection } from '../types';

export const DailyReflection: React.FC<{ day: number }> = ({ day }) => {
  const [data, setData] = useState<IBibleReflection | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await generateBibleReflection(day);
      setData(res);
      setLoading(false);
    };
    fetch();
  }, [day]);

  if (loading) return (
    <div className="animate-pulse bg-purple-50 rounded-2xl p-6 border border-purple-100 mb-8">
      <div className="h-4 bg-purple-200 w-1/4 mb-4 rounded"></div>
      <div className="h-3 bg-purple-100 w-full mb-2 rounded"></div>
      <div className="h-3 bg-purple-100 w-5/6 rounded"></div>
    </div>
  );

  return (
    <section className="bg-white rounded-2xl p-6 md:p-8 border border-stone-200 shadow-sm mb-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <Book className="w-24 h-24 rotate-12" />
      </div>
      
      <div className="flex items-center gap-2 mb-4 text-purple-800">
        <Sparkles className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-widest">Pão Diário • Meditação da Palavra</span>
      </div>

      {data && (
        <div className="relative z-10">
          <Quote className="w-8 h-8 text-purple-200 mb-2" />
          <p className="text-xl md:text-2xl font-serif text-stone-800 italic leading-snug mb-2">
            "{data.verse}"
          </p>
          <p className="text-sm font-bold text-purple-700 mb-4">— {data.reference}</p>
          <div className="h-px w-full bg-stone-100 mb-4" />
          <p className="text-stone-600 leading-relaxed">
            <span className="font-semibold text-stone-800">A História:</span> {data.history}
          </p>
        </div>
      )}
    </section>
  );
};
