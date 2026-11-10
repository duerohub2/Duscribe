const KEY = 'transcribe_history';
const MAX_ENTRIES = 20;

export function getHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function saveToHistory(entry) {
  if (typeof window === 'undefined') return [];
  try {
    const history = getHistory();
    const newEntry = {
      id: entry.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      timestamp: entry.timestamp || Date.now(),
      filename: entry.filename || 'audio',
      model: entry.model,
      language: entry.result?.language,
      duration: entry.result?.duration,
      result: entry.result,
    };
    const updated = [newEntry, ...history].slice(0, MAX_ENTRIES);
    localStorage.setItem(KEY, JSON.stringify(updated));
    return updated;
  } catch { return getHistory(); }
}

export function removeFromHistory(id) {
  if (typeof window === 'undefined') return [];
  const history = getHistory().filter((h) => h.id !== id);
  localStorage.setItem(KEY, JSON.stringify(history));
  return history;
}

export function clearHistory() {
  if (typeof window === 'undefined') return [];
  localStorage.removeItem(KEY);
  return [];
}
