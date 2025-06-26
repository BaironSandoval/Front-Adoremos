"use client";

import { Box, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import BlogPostForm from "@/components/BlogPostForm";
import { createPost } from "@/lib/api/blog";

export default function NewBlogPostPage() {
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (data: { title: string; content: string; author: string; image: string }) => {
    try {
      await createPost(data);
      toast({ title: "Entrada creada", status: "success" });
      router.push("/admin/blog");
    } catch {
      toast({ title: "Error al crear entrada", status: "error" });
    }
  };

  return (
    <Box p={8}>
      <Heading size="lg" mb={6}>Nueva Entrada de Blog</Heading>
      <BlogPostForm onSubmit={handleSubmit} />
    </Box>
  );
}
