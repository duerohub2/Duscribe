'use client';

import DownloadButtons from './DownloadButtons';

export default function ResultPanel({ result, filename }) {
  if (!result) return null;

  return (
    <div className="panel">
      <div className="info">
        BAHASA: {result.language?.toUpperCase()} | DURASI: {result.duration?.toFixed(1)}S | SEGMEN: {result.segments?.length}
      </div>

      <label className="label">TRANSKRIP</label>
      <div className="transcript">{result.text}</div>

      <label className="label">UNDUH</label>
      <DownloadButtons result={result} baseName={filename} />

      <hr className="divider" />

      <label className="label">TIMESTAMP</label>
      <div className="timestamp">
        {result.segments?.map((s, i) => {
          const m = Math.floor(s.start / 60);
          const sec = Math.floor(s.start % 60);
          const ts = `[${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}]`;
          return (
            <div key={i} className="ts-line">
              <span className="ts-time">{ts}</span>
              {s.text.trim()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
