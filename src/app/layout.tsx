"use client";

import type { ReactNode } from "react";
import { Providers } from "./providers";
import { ChakraProvider, Box, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { AuthProvider } from "@/contexts/auth-context";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>
          <ChakraProvider>
            <AuthProvider>
              <Box as="header" bg="teal.500" color="white" py={4} px={8}>
                <Flex gap={6}>
                  <Link as={NextLink} href="/">
                    Inicio
                  </Link>
                  <Link as={NextLink} href="/about">
                    Quiénes Somos
                  </Link>
                  <Link as={NextLink} href="/blog">
                    Blog
                  </Link>
                  <Link as={NextLink} href="/contact">
                    Contáctanos
                  </Link>
                  <Link as={NextLink} href="/shop">
                    Tienda
                  </Link>
                  <Link as={NextLink} href="/admin">
                    Admin
                  </Link>
                </Flex>
              </Box>
              <Box as="main" p={8}>
                {children}
              </Box>
              <Box as="footer" bg="gray.100" p={4} textAlign="center">
                © {new Date().getFullYear()} Adoremos. Todos los derechos
                reservados.
              </Box>
            </AuthProvider>
          </ChakraProvider>
        </Providers>
      </body>
    </html>
  );
}
