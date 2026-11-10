const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;
const hits = new Map();
let lastCleanup = Date.now();

function cleanup(now) {
  if (now - lastCleanup < 5 * 60 * 1000) return;
  lastCleanup = now;
  for (const [ip, entry] of hits.entries()) {
    if (now - entry.start > WINDOW_MS) hits.delete(ip);
  }
}

export function checkRateLimit(ip) {
  const now = Date.now();
  cleanup(now);
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }
  if (entry.count >= MAX_REQUESTS) {
    const resetIn = Math.ceil((WINDOW_MS - (now - entry.start)) / 1000);
    return { allowed: false, remaining: 0, resetIn };
  }
  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

export function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}
