'use client';

import PixelSelect from './PixelSelect';
import StatusBar from './StatusBar';
import { ACCEPTED_TYPES, MODELS, LANGUAGES } from '@/lib/constants';

export default function UploadPanel({
  onFileChange,
  model,
  onModelChange,
  language,
  onLanguageChange,
  onTranscribe,
  loading,
  status,
}) {
  return (
    <div className="panel">
      <label className="label">Audio / Video</label>
      <input type="file" accept={ACCEPTED_TYPES} onChange={onFileChange} className="file-input" />
      <div className="hint">Maksimal 25MB</div>

      <PixelSelect label="Mode" value={model} onChange={onModelChange} options={MODELS} />
      <PixelSelect label="Bahasa" value={language} onChange={onLanguageChange} options={LANGUAGES} />

      <button onClick={onTranscribe} disabled={loading} className="btn">
        {loading ? 'MEMPROSES...' : 'MULAI TRANSKRIPSI'}
      </button>

      <StatusBar text={status.text} type={status.type} />
    </div>
  );
}
