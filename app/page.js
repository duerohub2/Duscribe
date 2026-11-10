'use client';

import { useState, useEffect } from 'react';
import { upload } from '@vercel/blob/client';
import UploadPanel from '@/components/UploadPanel';
import ResultPanel from '@/components/ResultPanel';
import HistoryPanel from '@/components/HistoryPanel';
import { MAX_FILE_SIZE, STATUS } from '@/lib/constants';
import { getHistory, saveToHistory, removeFromHistory, clearHistory } from '@/lib/history';

export default function Home() {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const [model, setModel] = useState('nova-2');
  const [language, setLanguage] = useState('auto');
  const [status, setStatus] = useState({ text: '', type: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => { setHistory(getHistory()); }, []);

  async function handleTranscribe() {
    if (!file) { setStatus({ text: 'PILIH FILE DULU', type: 'error' }); return; }
    if (file.size > MAX_FILE_SIZE) { setStatus({ text: 'FILE MAKSIMAL 25MB', type: 'error' }); return; }

    setLoading(true); setResult(null);
    try {
      setStatus({ text: 'MENGUNGGAH FILE... 0%', type: '' });
      
      const blob = await upload(file.name, file, { 
        access: 'public', 
        handleUploadUrl: '/api/blob-upload',
        // INI KODE BARU: Buat nampilin persentase upload
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setStatus({ text: `MENGUNGGAH FILE... ${percent}%`, type: '' });
        }
      });

      setStatus({ text: STATUS.TRANSCRIBING, type: '' });
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: blob.url, model, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal Transkripsi');

      setResult(data); setFilename(file.name); setStatus({ text: STATUS.SUCCESS, type: 'success' });
      setHistory(saveToHistory({ filename: file.name, model, result: data }));
    } catch (err) {
      // INI KODE BARU: Biar error aslinya muncul di layar
      setStatus({ text: 'ERROR: ' + err.message.toUpperCase(), type: 'error' });
    } finally { setLoading(false); }
  }

  function handleSelectHistory(item) {
    setResult(item.result); setFilename(item.filename); setStatus({ text: STATUS.FROM_HISTORY, type: 'success' });
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleRemoveHistory(id) { setHistory(removeFromHistory(id)); }
  function handleClearHistory() { if (confirm('Hapus semua riwayat?')) setHistory(clearHistory()); }

  return (
    <div className="container">
      <h1>Transcribe</h1>
      <UploadPanel
        onFileChange={(e) => { const f = e.target.files?.[0] || null; setFile(f); setFilename(f?.name || ''); }}
        model={model} onModelChange={(e) => setModel(e.target.value)}
        language={language} onLanguageChange={(e) => setLanguage(e.target.value)}
        onTranscribe={handleTranscribe} loading={loading} status={status}
      />
      <ResultPanel result={result} filename={filename} />
      <HistoryPanel history={history} onSelect={handleSelectHistory} onRemove={handleRemoveHistory} onClear={handleClearHistory} />
    </div>
  );
}
