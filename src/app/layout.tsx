import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Catálogo de Productos',
  description: 'Exposición de productos exclusica',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col items-center justify-center">
        {children}
      </body>
    </html>
  );
}
