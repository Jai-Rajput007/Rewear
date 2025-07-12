import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ReWear',
  description: 'Exchange unused clothing and promote sustainable fashion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
