export async function processFile(data) {
  try {
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to process file');
    }

    return await response.json();
  } catch (error) {
    console.error('Error in processFile:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    };
  }
}

export async function getVoices(language) {
  try {
    const response = await fetch(`/api/voices?language=${language}`);
    if (!response.ok) {
      throw new Error('Failed to fetch voices');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
}

export async function translateText(text, sourceLang, targetLang) {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        sourceLang,
        targetLang
      })
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
}
