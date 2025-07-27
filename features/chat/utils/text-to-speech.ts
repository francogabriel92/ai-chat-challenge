import { Platform } from 'react-native';

import { generateAPIUrl } from '@/utils/api';
import { saveBlobAsBase64File } from '@/utils/files';

/**
 * This function fetches the audio data from the server and returns a blob URL
 * @param text The text to convert to speech.
 * @returns The URI of the audio blob.
 */
export async function getTextToSpeechData(text: string): Promise<string> {
  try {
    const response = await fetch(generateAPIUrl('/api/speech'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBlob = await response.blob();

    if (audioBlob.size === 0) {
      throw new Error('Received empty audio data');
    }

    if (Platform.OS === 'web') {
      const url = URL.createObjectURL(audioBlob);

      return url;
    }

    const audioUrl = await saveBlobAsBase64File(audioBlob, 'mp3');

    return audioUrl;
  } catch (err) {
    console.error('Error in playTextToSpeech:', err);
    throw new Error('Failed to play speech');
  }
}
