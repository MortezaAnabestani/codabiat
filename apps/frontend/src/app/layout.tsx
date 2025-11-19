import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'کدبیات - پلتفرم آموزش برنامه‌نویسی و ادبیات الکترونیک',
  description: 'آموزش برنامه‌نویسی و ادبیات الکترونیک به زبان فارسی',
  keywords: ['برنامه‌نویسی', 'آموزش', 'ادبیات الکترونیک', 'جاوااسکریپت', 'تایپ‌اسکریپت', 'ری‌اکت', 'نود'],
  authors: [{ name: 'کدبیات' }],
  openGraph: {
    title: 'کدبیات',
    description: 'پلتفرم آموزش برنامه‌نویسی و ادبیات الکترونیک',
    type: 'website',
    locale: 'fa_IR',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-vazir antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
