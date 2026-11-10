import { handleUpload } from '@vercel/blob/client';

export async function POST(request) {
  const body = await request.json();
  const jsonResponse = await handleUpload({
    body,
    request,
    onBeforeGenerateToken: async () => ({
      allowedContentTypes: [
        'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav',
        'audio/mp4', 'audio/m4a', 'audio/x-m4a',
        'audio/webm', 'audio/ogg', 'audio/flac',
        'video/mp4', 'video/webm', 'video/quicktime',
      ],
      maximumSizeInBytes: 25 * 1024 * 1024,
      addRandomSuffix: true,
    }),
    onUploadCompleted: async () => {},
  });
  return Response.json(jsonResponse);
}
