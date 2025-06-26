'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { useEffect, useState, ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // evita renderizado en SSR

  return <ChakraProvider>{children}</ChakraProvider>;
}
