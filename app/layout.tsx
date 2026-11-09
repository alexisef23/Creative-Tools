import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Creative Tools | Freseros de Aluminio Grado Médico con Grabado Láser',
  description:
    'Diseña tu fresero dental de aluminio anodizado 100% autoclavable (134°C). Catálogo por series y Estudio Interactivo de Grabado Láser en tiempo real.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-zinc-950 font-sans text-slate-100">
        {children}
      </body>
    </html>
  );
}
