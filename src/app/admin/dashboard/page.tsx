'use client';

import Link from 'next/link';
import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { FaBox, FaBullhorn, FaBlog } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <AdminProtectedRoute>
      <Box p={8}>
        <Heading mb={6}>Panel de Administración</Heading>

        {/* Tarjetas de resumen */}
        <SimpleGrid columns={[1, 2, 3]} spacing={6} mb={10}>
          <StatCard
            icon={FaBox}
            label="Productos"
            value="12"
            color="teal.500"
          />
          <StatCard
            icon={FaBlog}
            label="Publicaciones del Blog"
            value="5"
            color="blue.500"
          />
          <StatCard
            icon={FaBullhorn}
            label="Promociones"
            value="3"
            color="purple.500"
          />
        </SimpleGrid>

        {/* Accesos rápidos */}
        <VStack align="stretch" spacing={4}>
          <Button as={Link} href="/admin/products" colorScheme="teal" w="full">
            🛒 Gestionar Productos
          </Button>

          <Button as={Link} href="/admin/blog" colorScheme="blue" w="full">
            📝 Gestionar Blog
          </Button>

          <Button as={Link} href="/admin/promotions" colorScheme="purple" w="full">
            🎯 Gestionar Promociones
          </Button>
        </VStack>
      </Box>
    </AdminProtectedRoute>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: any;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="md"
      boxShadow="sm"
      bg="white"
      textAlign="center"
    >
      <Icon as={icon} boxSize={8} color={color} mb={2} />
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
      </Stat>
    </Box>
  );
}
