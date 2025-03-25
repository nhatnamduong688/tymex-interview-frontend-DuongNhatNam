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
        {/* 
          Để kích hoạt Redux cho toàn bộ ứng dụng, hãy bỏ comment đoạn mã bên dưới và import ReduxProviders.
          
          import { ReduxProviders } from '@/redux/providers';
          
          Sau đó thay thế phần body như sau:
          <body className={inter.className}>
            <ReduxProviders>
              {children}
            </ReduxProviders>
          </body>
        */}
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  );
}
