
import React, { useState } from 'react';
import { User } from '../types';
import { Cross } from 'lucide-react';

interface UserFormProps {
  onSave: (user: User) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ onSave }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({
        name,
        startDate: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 relative overflow-hidden">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-10 border border-white/50 relative z-10 text-center">
        <div className="mb-8 flex flex-col items-center">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 p-4 rounded-full shadow-lg mb-6">
            <Cross className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-stone-800 mb-3 font-serif italic">Inicie sua Jornada</h1>
          <p className="text-stone-500 font-light">"Eis que faço novas todas as coisas"</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 ml-1">
              Como podemos te chamar?
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-6 py-4 rounded-2xl border border-stone-200 focus:ring-4 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all bg-white/50"
              placeholder="Seu nome..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-800 to-purple-950 hover:from-purple-900 hover:to-black text-white font-bold py-5 rounded-2xl transition-all shadow-xl active:scale-95 duration-150 uppercase tracking-widest text-sm"
          >
            Entrar no Cenáculo
          </button>
        </form>
      </div>
    </div>
  );
};
