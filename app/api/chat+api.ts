import { vertex } from '@ai-sdk/google-vertex';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { smoothStream, streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  try {
    const result = streamText({
      model: vertex('gemini-2.5-pro'),
      messages,
      // Use smoothStream for smoother streaming as Vertex AI has a different streaming behavior
      // with larger chunks. As this is an experimental feature, if you encounter issues, you can remove this line.
      // experimental_transform: smoothStream(),
      onError: (error) => console.error('Error in AI stream:', error),
    });

    return result.toDataStreamResponse({
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'none',
      },
    });
  } catch (error) {
    console.error('Error in POST /api/chat:', error);

    return new Response('Internal Server Error', { status: 500 });
  }
}
