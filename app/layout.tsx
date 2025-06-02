// app/layout.tsx
import './globals.css';
import React from 'react';
import ClientProviders from './components/ClientProviders';

export const metadata = {
  title: 'Kadaif I Svet Dubai Čokolade',
  description: 'Kadaif Shop – lider u Dubai čokoladama u Srbiji. Nabavite ekskluzivne kalupe za kadaif i premium sastojke za orijentalne poslastice. Brza isporuka i sigurno plaćanje.',

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
