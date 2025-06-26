"use client";

import { Box, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import PromotionForm from "@/components/PromotionForm";
import { createPromotion } from "@/lib/api/promotions";

export default function NewPromotionPage() {
  const router = useRouter();
  const toast = useToast();

  const handleCreate = async ({ title, image }: { title: string; image: string }) => {
    try {
      await createPromotion({ title, image });
      toast({ title: "Promoción creada", status: "success" });
      router.push("/admin/promotions");
    } catch {
      toast({ title: "Error al crear promoción", status: "error" });
    }
  };

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>Nueva Promoción</Heading>
      <PromotionForm onSubmit={handleCreate} submitLabel="Crear promoción" />
    </Box>
  );
}
