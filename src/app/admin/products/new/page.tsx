"use client";

import { Box, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { isAxiosErrorWithMessage } from "@/lib/utils/isAxiosErrorWithMessage";

export default function NewProductPage() {
  const toast = useToast();
  const router = useRouter();

  const handleCreate = async (data: {
    name: string;
    price: number;
    quantity: number;
    images: string[];
    description?: string;
  }) => {
    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al crear producto");

      toast({ title: "Producto creado exitosamente", status: "success" });
      router.push("/admin/products");
    } catch (err: unknown) {
      const message = isAxiosErrorWithMessage(err)
        ? err.response.data.message
        : "Error desconocido";
      toast({ title: "Error", description: message, status: "error" });
    }
  };

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>
        Crear Nuevo Producto
      </Heading>
      <ProductForm onSubmit={handleCreate} submitText="Crear Producto" />
    </Box>
  );
}
