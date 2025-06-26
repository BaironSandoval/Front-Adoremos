"use client";

import {
  Box,
  Heading,
  VStack,
  Image,
  Text,
  Flex,
  Button,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getPromotions, deletePromotion } from "@/lib/api/promotions";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const toast = useToast();

  const loadPromotions = async () => {
    try {
      const data = await getPromotions();
      setPromotions(data);
    } catch {
      toast({ title: "Error al cargar promociones", status: "error" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePromotion(id);
      setPromotions(promotions.filter((p) => p._id !== id));
      toast({ title: "Promoción eliminada", status: "success" });
    } catch {
      toast({ title: "Error al eliminar", status: "error" });
    }
  };

  useEffect(() => {
    loadPromotions();
  }, []);

  return (
    <Box p={8}>
      <AdminProtectedRoute>
        <Flex justify="space-between" mb={6}>
          <Heading size="lg">Promociones</Heading>
          <Button as={Link} href="/admin/promotions/new" colorScheme="teal">
            Nueva promoción
          </Button>
        </Flex>

        <VStack spacing={6} align="stretch">
          {promotions.map((promo) => (
            <Box key={promo._id} p={4} borderWidth={1} borderRadius="md">
              <Text fontWeight="bold">{promo.title}</Text>
              <Image src={promo.image} alt={promo.title} mt={2} borderRadius="md" maxW="250px" />
              <Flex gap={4} mt={3}>
                <Button as={Link} href={`/admin/promotions/${promo._id}/edit`} size="sm" colorScheme="blue">
                  Editar
                </Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDelete(promo._id)}>
                  Eliminar
                </Button>
              </Flex>
            </Box>
          ))}
        </VStack>
      </AdminProtectedRoute>
    </Box>
  );
}
