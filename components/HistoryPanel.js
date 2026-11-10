'use client';

export default function HistoryPanel({ history, onSelect, onRemove, onClear }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="panel">
      <div className="panel-header">
        <label className="label" style={{ margin: 0 }}>RIWAYAT ({history.length})</label>
        <button className="btn-tiny" onClick={onClear}>HAPUS SEMUA</button>
      </div>

      <div className="history-list">
        {history.map((h) => (
          <div key={h.id} className="history-item">
            <button className="history-main" onClick={() => onSelect(h)}>
              <div className="history-name">{h.filename}</div>
              <div className="history-meta">
                {new Date(h.timestamp).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}
                {' | '}{(h.language || '?').toUpperCase()}{' | '}{(h.duration || 0).toFixed(0)}S
              </div>
            </button>
            <button className="history-remove" onClick={() => onRemove(h.id)} aria-label="Hapus">X</button>
          </div>
        ))}
      </div>
    </div>
  );
}
