import { createClient } from '@deepgram/sdk';

export async function transcribeWithDeepgram(buffer, contentType, options = {}) {
  const { language = 'auto' } = options;
  const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
    buffer,
    {
      model: 'nova-2',
      language: language !== 'auto' ? language : undefined,
      detect_language: language === 'auto',
      smart_format: true,
      utterances: true,
    }
  );

  if (error) throw new Error(error.message);

  const channel = result.results.channels[0];
  const alternative = channel.alternatives[0];
  
  const segments = result.results.utterances?.map((u) => ({
    start: u.start,
    end: u.end,
    text: u.transcript,
  })) || [
    {
      start: 0,
      end: result.metadata.duration,
      text: alternative.transcript,
    },
  ];

  return {
    text: alternative.transcript,
    language: channel.detected_language || language || 'id',
    duration: result.metadata.duration,
    segments: segments,
  };
}
