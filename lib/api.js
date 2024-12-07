import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyARzNw_Kh8PGb9c7lCJ2ueGeeMx6XkAB28');
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function splitTextIntoChunks(text, numChunks = 30) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunkSize = Math.ceil(sentences.length / numChunks);
  const chunks = [];
  
  for (let i = 0; i < sentences.length; i += chunkSize) {
    chunks.push(sentences.slice(i, i + chunkSize).join(' ').trim());
  }
  
  return chunks;
}

export async function processFile(data) {
  try {
    const { content, fileName, sourceLanguage, sourceVoice, translations } = data;
    const textChunks = splitTextIntoChunks(content);
    console.log(`Text split into ${textChunks.length} parts`);

    // Process each translation
    const results = await Promise.all(translations.map(async (trans) => {
      console.log(`Starting translation to ${trans.targetLang}...`);
      const targetLang = trans.targetLang.split('-')[0];
      let fullTranslation = '';

      for (let i = 0; i < textChunks.length; i++) {
        console.log(`Processing part ${i + 1} of ${textChunks.length}`);
        
        const prompt = `
          You are a professional translator specialized in cultural and literary adaptations.
          
          Translate the following text from ${sourceLanguage} to ${targetLang}.
          Maintain the original tone and style, but make necessary adaptations to sound natural in the target language.
          Don't make literal translations, adapt idiomatic expressions and cultural references when needed.
          
          Original text:
          "${textChunks[i]}"
          
          Provide only the translation, without explanations or additional notes.
        `;

        const result = await model.generateContent(prompt);
        const translatedChunk = result.response.text().trim();
        
        fullTranslation += translatedChunk + ' ';

        if (i < textChunks.length - 1) {
          await delay(1000);
        }
      }

      return {
        language: trans.targetLang,
        voice: trans.targetVoice,
        translation: fullTranslation.trim()
      };
    }));

    return { success: true, data: results };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
}
