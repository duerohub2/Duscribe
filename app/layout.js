import './globals.css';

export const metadata = {
  title: 'TRANSCRIBE',
  description: 'Audio to text',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
