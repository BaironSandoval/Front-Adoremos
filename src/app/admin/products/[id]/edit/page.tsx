"use client";

import { Box, Heading, Spinner, useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";
import { isAxiosErrorWithMessage } from "@/lib/utils/isAxiosErrorWithMessage";
import { api } from "@/lib/axios";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<{
    name: string;
    price: number;
    quantity: number;
    images: string[];
    description?: string;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        setInitialData(res.data);
      } catch {
        toast({ title: "Error al cargar el producto", status: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  const handleUpdate = async (data: {
    name: string;
    price: number;
    quantity: number;
    images: string[];
    description?: string;
  }) => {
    const token = localStorage.getItem("adminToken");

    try {
      await api.put(`/products/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast({ title: "Producto actualizado", status: "success" });
      router.push("/admin/products");
    } catch (err: unknown) {
      const message = isAxiosErrorWithMessage(err)
        ? err.response.data.message
        : "Error inesperado";

      toast({
        title: "Error",
        description: message,
        status: "error",
      });
    }
  };

  if (loading || !initialData) return <Spinner />;

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>
        Editar Producto
      </Heading>
      <ProductForm
        onSubmit={handleUpdate}
        initialData={initialData}
        submitText="Actualizar"
      />
    </Box>
  );
}
