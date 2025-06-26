"use client";

import { Box, Heading, Spinner, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogPostForm from "@/components/BlogPostForm";
import { getPostById, updatePost } from "@/lib/api/blog";

export default function EditBlogPostPage() {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState<any>(null);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPostById(id);
        setInitialData(data);
      } catch {
        toast({ title: "Error al cargar entrada", status: "error" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, toast]);

  const handleSubmit = async (data: { title: string; content: string; author: string; image: string }) => {
    try {
      await updatePost(id, data);
      toast({ title: "Entrada actualizada", status: "success" });
      router.push("/admin/blog");
    } catch {
      toast({ title: "Error al actualizar entrada", status: "error" });
    }
  };

  if (loading) return <Spinner />;

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>Editar Entrada de Blog</Heading>
      <BlogPostForm onSubmit={handleSubmit} isEditing initialValues={initialData} />
    </Box>
  );
}
