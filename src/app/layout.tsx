import type { Metadata } from 'next';
import localFont from 'next/font/local';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import './globals.css';
import './animation.css';
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Tymex - Frontend eCommerce',
  description: 'Modern eCommerce platform with a great shopping experience',
  icons: {
    icon: '/icons/favicon-196.png',
    apple: '/icons/favicon-192.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
