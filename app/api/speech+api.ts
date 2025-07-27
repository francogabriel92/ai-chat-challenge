import { openai } from '@ai-sdk/openai';
import { experimental_generateSpeech as generateSpeech } from 'ai';

export async function POST(req: Request) {
  const { text } = await req.json();

  try {
    const result = await generateSpeech({
      model: openai.speech('tts-1'),
      text,
    });

    const audioBuffer = Buffer.from(result.audio.base64, 'base64');

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('Error generating speech:', error);

    return new Response('Internal Server Error', { status: 500 });
  }
}
