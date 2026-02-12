
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gera o conteúdo principal de um dia específico da Quaresma.
 */
export const generateDayContent = async (dayNumber: number, userName: string) => {
  const ai = getAI();
  const isMilestone = dayNumber === 7 || dayNumber === 20 || dayNumber === 40;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Gere um conteúdo espiritual profundo para o dia ${dayNumber} da Quaresma para o usuário ${userName}. 
    ${dayNumber === 7 ? 'Este é o 7º dia, o marco da primeira semana completa!' : ''} 
    ${dayNumber === 20 ? 'Este é o 20º dia, a METADE exata da jornada quaresmal!' : ''} 
    ${dayNumber === 40 ? 'ESTE É O ÚLTIMO DIA (DIA 40)! A vitória total sobre o deserto!' : ''}
    ${isMilestone ? 'Como este é um marco de ouro, a parabenização deve ser triunfal e muito encorajadora.' : ''} 
    O tom deve ser solene, poético, teologicamente rico e paternal. Fale diretamente ao coração dele como um mestre amável.`,
    config: {
      systemInstruction: `Você é um mestre espiritual e teólogo católico de renome. Sua missão é guiar almas através do deserto da Quaresma com palavras que queimam no peito. Retorne os campos: 'reflection' (longo, rico), 'prayer' (intimista), 'purpose' (prático e desafiador), 'whyReflect' (o motivo teológico por trás do desafio). Retorne estritamente em JSON puro.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          reflection: { type: Type.STRING },
          prayer: { type: Type.STRING },
          purpose: { type: Type.STRING },
          whyReflect: { type: Type.STRING }
        },
        required: ["reflection", "prayer", "purpose", "whyReflect"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text || '{}');
    return { day: dayNumber, ...data };
  } catch (error) {
    console.error("Erro na geração Gemini Pro:", error);
    return null;
  }
};

/**
 * Gera uma bênção personalizada para o momento de acender a vela.
 */
export const generateCandleBlessing = async (intention: string, personName: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `O usuário quer acender uma vela por ${personName} com a seguinte intenção/declaração: "${intention}". Gere uma bênção curta, sagrada e poética para selar este momento de luz.`,
    config: {
      systemInstruction: "Você é um intercessor bondoso. Sua resposta deve ser curta (máximo 2 frases), reconfortante e elevar a alma do usuário. Não use saudações formais, apenas a bênção em si.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          blessing: { type: Type.STRING }
        },
        required: ["blessing"]
      }
    }
  });
  try {
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { blessing: "Que esta luz ilumine os caminhos e aqueça o coração com a paz de Cristo." };
  }
};

/**
 * Gera encorajamento baseado em respostas parciais do quiz.
 */
export const generateQuizEncouragement = async (partialAnswers: string[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `O usuário respondeu: "${partialAnswers.join(", ")}". Gere uma frase curta de encorajamento espiritual (1 frase) que valide a busca dele e o mantenha engajado no quiz de virtudes.`,
    config: {
      systemInstruction: "Aja como um mentor espiritual sábio. Seja breve, inspirador e poético.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          message: { type: Type.STRING }
        },
        required: ["message"]
      }
    }
  });
  try {
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return { message: "Seu coração está se abrindo para a verdade. Continue." };
  }
};

/**
 * Gera o diagnóstico final profético para o Quiz.
 */
export const generateQuizDiagnostic = async (profile: string, answers: string[]) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `O perfil dominante é: ${profile}. As respostas foram: ${answers.join(", ")}. Gere um diagnóstico espiritual profundo e profético, um versículo bíblico que se conecte a esse perfil e a referência.`,
    config: {
      systemInstruction: "Você é um guia espiritual com visão profética. O tom deve ser solene, encorajador e voltado para a conversão na Quaresma. O diagnóstico deve ter cerca de 3 frases.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diagnostic: { type: Type.STRING },
          verse: { type: Type.STRING },
          reference: { type: Type.STRING }
        },
        required: ["diagnostic", "verse", "reference"]
      }
    }
  });
  try {
    return JSON.parse(response.text || '{}');
  } catch (error) {
    return null;
  }
};

export const generateBibleReflection = async (day: number) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Gere uma exegese bíblica inspiradora para o dia ${day} da Quaresma.`,
    config: {
      systemInstruction: `Aja como um teólogo exegeta erudito mas acessível. Conecte o versículo à jornada quaresmal. Retorne JSON com 'verse', 'reference' e 'history' (contexto histórico).`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verse: { type: Type.STRING },
          reference: { type: Type.STRING },
          history: { type: Type.STRING }
        },
        required: ["verse", "reference", "history"]
      }
    }
  });
  try { return JSON.parse(response.text || '{}'); } catch (error) { return null; }
};

export const generateShareableWord = async () => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Gere uma pílula de sabedoria bíblica para compartilhar no WhatsApp sobre a Quaresma.`,
    config: {
      systemInstruction: `Retorne JSON com 'greeting', 'verse', 'reference' e 'incentive'. Mantenha curto e impactante.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          greeting: { type: Type.STRING },
          verse: { type: Type.STRING },
          reference: { type: Type.STRING },
          incentive: { type: Type.STRING }
        },
        required: ["greeting", "verse", "reference", "incentive"]
      }
    }
  });
  try { return JSON.parse(response.text || '{}'); } catch (error) { return null; }
};
