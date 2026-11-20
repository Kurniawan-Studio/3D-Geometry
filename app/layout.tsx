import type { Metadata } from 'next';
import './globals.css'; 
import { Sidebar } from '@/components/layout/Sidebar';
import { MobileNav } from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'Geometry Explorer',
  description: 'Interactive 3D geometry platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface-secondary text-ink antialiased">
        <div className="flex min-h-screen flex-col md:flex-row">
          <Sidebar />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <MobileNav />
        </div>
      </body>
    </html>
  );
}
