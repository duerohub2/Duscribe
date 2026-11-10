function pad(n, len = 2) { return String(n).padStart(len, '0'); }

function srtTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}

function vttTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)}.${pad(ms, 3)}`;
}

export function toSRT(segments) {
  return segments.map((seg, i) => `${i + 1}\n${srtTime(seg.start)} --> ${srtTime(seg.end)}\n${seg.text.trim()}\n`).join('\n');
}

export function toVTT(segments) {
  const body = segments.map((seg) => `${vttTime(seg.start)} --> ${vttTime(seg.end)}\n${seg.text.trim()}\n`).join('\n');
  return `WEBVTT\n\n${body}`;
}

export function toTXT(result) { return result.text; }
export function toJSON(result) { return JSON.stringify(result, null, 2); }

export function downloadFile(content, filename, mime = 'text/plain') {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
