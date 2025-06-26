// src/components/Navbar.tsx
'use client';
import { Box, Flex, HStack, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function Navbar() {
  return (
    <Box bg="teal.500" px={4} py={3}>
      <Flex alignItems="center" justifyContent="space-between">
        <Text color="white" fontWeight="bold">MiTienda</Text>
        <HStack spacing={6}>
          <Link as={NextLink} href="/" color="white">Inicio</Link>
          <Link as={NextLink} href="/quienes-somos" color="white">Quiénes Somos</Link>
          <Link as={NextLink} href="/blog" color="white">Blog</Link>
          <Link as={NextLink} href="/contactanos" color="white">Contáctanos</Link>
          <Link as={NextLink} href="/ecommerce" color="white">Tienda</Link>
          <Link as={NextLink} href="/admin" color="white">Admin</Link>
        </HStack>
      </Flex>
    </Box>
  );
}
