import { del } from '@vercel/blob';
import { transcribeWithDeepgram } from '@/lib/deepgram';
import { checkRateLimit, getClientIP } from '@/lib/rateLimit';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(request) {
  const ip = getClientIP(request);
  const limit = checkRateLimit(ip);
  if (!limit.allowed) {
    return Response.json({ error: `Terlalu banyak permintaan. Coba lagi dalam ${limit.resetIn} detik.` }, { status: 429 });
  }

  let blobUrl = null;
  try {
    const { url, model, language } = await request.json();
    if (!url) return Response.json({ error: 'URL audio tidak ditemukan' }, { status: 400 });
    blobUrl = url;

    const audioRes = await fetch(url);
    if (!audioRes.ok) throw new Error('Gagal mengambil file dari storage');

    const buffer = Buffer.from(await audioRes.arrayBuffer());
    const contentType = audioRes.headers.get('content-type') || 'audio/mpeg';

    const result = await transcribeWithDeepgram(buffer, contentType, { language });
    await del(url).catch(() => {});

    return Response.json(result, { headers: { 'X-RateLimit-Remaining': String(limit.remaining) } });
  } catch (error) {
    if (blobUrl) await del(blobUrl).catch(() => {});
    console.error(error);
    return Response.json({ error: error.message || 'Gagal transkripsi' }, { status: 500 });
  }
}
