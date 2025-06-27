"use client";

import { useParams, useRouter } from "next/navigation";
import { Box, Heading, useToast, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PromotionForm from "@/components/PromotionForm";
import { getPromotionById, updatePromotion } from "@/lib/api/promotions";

type Promotion = {
  title: string;
  image: string;
};

export default function EditPromotionPage() {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [promotion, setPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPromotionById(id);
        setPromotion(data);
      } catch {
        toast({ title: "Error al cargar promoción", status: "error" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, toast]);

  const handleUpdate = async ({ title, image }: { title: string; image: string }) => {
    try {
      await updatePromotion(id, { title, image });
      toast({ title: "Promoción actualizada", status: "success" });
      router.push("/admin/promotions");
    } catch {
      toast({ title: "Error al actualizar promoción", status: "error" });
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>Editar Promoción</Heading>
      {promotion && (
        <PromotionForm
          initialTitle={promotion.title}
          initialImage={promotion.image}
          onSubmit={handleUpdate}
          submitLabel="Actualizar promoción"
        />
      )}
    </Box>
  );
}
