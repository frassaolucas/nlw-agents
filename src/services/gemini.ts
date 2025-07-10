import { GoogleGenAI } from '@google/genai';
import { env } from '../env.ts';

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(
  audioAasBase64: string,
  mimeType: string
) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o áudio para português do Brasil. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAasBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error('Não foi possível transcrever o áudio');
  }

  return response.text;
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error('Não foi possível gerar embeddings');
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(
  questions: string,
  transcriptions: string[]
) {
  const context = transcriptions.join('\n\n');

  const prompt = `
    Com base no texto fornecido abaixo como contexto, responda à pergunta de forma clara e objetiva em Português do Brasil.

    CONTEXTO:
    ${context}

    PERGUNTA:
    ${questions}

    INSTRUÇÕES:
    - Use apenas informações do contexto fornecido.
    - Se a resposta não estiver no contexto, responda que não possui informações suficientes para responder.
    - Seja claro e direto na resposta.
    - Mantenha um tom educativo e profissional.
    - Cite trechos relevantes do contexto, se necessário, para embasar sua resposta.
    - Se for citar o context, utilize o termo "conteúdo da aula".
  `.trim();

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: prompt,
      },
    ],
  });

  if (!response.text) {
    throw new Error('Falha ao gerar resposta pelo Gemini');
  }

  return response.text;
}
