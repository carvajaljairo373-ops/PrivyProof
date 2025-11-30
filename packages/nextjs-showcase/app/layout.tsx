import type { Metadata } from 'next';
import Script from 'next/script';
import { ClientProviders } from '../components/ClientProviders';
import './globals.css';

export const metadata: Metadata = {
  title: 'PrivyProof - Privacy-Preserving Capital Verification',
  description: 'Prove your capital without revealing the exact amount using FHE technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 min-h-screen">
        {/* Load FHEVM Relayer SDK */}
        <Script
          src="https://cdn.zama.org/relayer-sdk-js/0.3.0-5/relayer-sdk-js.umd.cjs"
          strategy="beforeInteractive"
        />
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
