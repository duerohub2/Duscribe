'use client';

import { toSRT, toVTT, toTXT, toJSON, downloadFile } from '@/lib/formatters';

export default function DownloadButtons({ result, baseName = 'transkrip' }) {
  if (!result) return null;
  const safe = (baseName || 'transkrip').replace(/\.[^.]+$/, '') || 'transkrip';

  const handle = (format) => {
    if (format === 'srt') downloadFile(toSRT(result.segments), `${safe}.srt`, 'application/x-subrip');
    else if (format === 'vtt') downloadFile(toVTT(result.segments), `${safe}.vtt`, 'text/vtt');
    else if (format === 'txt') downloadFile(toTXT(result), `${safe}.txt`, 'text/plain');
    else if (format === 'json') downloadFile(toJSON(result), `${safe}.json`, 'application/json');
  };

  return (
    <div className="download-row">
      <button className="btn-small" onClick={() => handle('srt')}>SRT</button>
      <button className="btn-small" onClick={() => handle('vtt')}>VTT</button>
      <button className="btn-small" onClick={() => handle('txt')}>TXT</button>
      <button className="btn-small" onClick={() => handle('json')}>JSON</button>
    </div>
  );
}
