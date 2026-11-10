export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const ACCEPTED_TYPES = 'audio/*,video/*';

export const MODELS = [
  { value: 'nova-2', label: 'AKURAT' },
];

export const LANGUAGES = [
  { value: 'auto', label: 'AUTO DETEKSI' },
  { value: 'id', label: 'INDONESIA' },
  { value: 'en', label: 'ENGLISH' },
  { value: 'ja', label: 'JEPANG' },
  { value: 'ko', label: 'KOREA' },
  { value: 'zh', label: 'MANDARIN' },
  { value: 'ar', label: 'ARAB' },
  { value: 'es', label: 'SPANYOL' },
];

export const STATUS = {
  IDLE: '',
  UPLOADING: 'MENGUNGGAH FILE...',
  TRANSCRIBING: 'MENTRANSKRIPSI...',
  SUCCESS: 'SELESAI',
  FROM_HISTORY: 'DARI RIWAYAT',
  ERROR: 'ERROR',
};
