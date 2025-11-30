'use client';

import dynamic from 'next/dynamic';

// Dynamically import Providers with SSR disabled
const Providers = dynamic(
  () => import('./Providers').then((mod) => mod.Providers),
  { ssr: false }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <Providers>{children}</Providers>;
}

