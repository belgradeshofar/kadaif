// app/layout.tsx
import './globals.css';
import React from 'react';
import ClientProviders from './components/ClientProviders';

export const metadata = {
  title: 'Ultimate Store',
  description: 'Aktivističke majice sa porukom',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
