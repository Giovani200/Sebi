import Nav from './components/Nav';
import Footer from './components/Footer';
import SebiGuide from './components/SebiGuide';
import Notification from './components/Notification';
import LanguageProvider from './components/LanguageProvider';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sebi - Jeux éducatifs pour enfants',
  description: 'Plateforme de jeux éducatifs pour enfants',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/images/apple-icon.png" />
      </head>
      <body className="min-h-screen bg-[#fdf2dd]">
        <LanguageProvider>
          <Nav />
          {children}
          <SebiGuide />
          <Footer />
          <Notification />
        </LanguageProvider>
      </body>
    </html>
  );
}